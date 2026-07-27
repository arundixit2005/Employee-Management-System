import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "../layouts/AdminLayout";
import API from "../services/api";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    employeeId: "",
    name: "",
    email: "",
    department: "",
    designation: "",
    salary: "",
    phone: "",
    address: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    try {
      const res = await API.get(`/employees/${id}`);
      setEmployee(res.data.employee);
    } catch (err) {
      console.log(err);
      toast.error("Employee not found");
    }
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(employee).forEach((key) => {
      data.append(key, employee[key]);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      await API.put(`/employees/${id}`, data);

      toast.success("Employee Updated Successfully");

      navigate("/employees");
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message || "Update Failed"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="container">

        <div className="card shadow">

          <div className="card-header bg-warning">
            <h3 className="mb-0">Edit Employee</h3>
          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label>Employee ID</label>
                  <input
                    className="form-control"
                    name="employeeId"
                    value={employee.employeeId}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Department</label>
                  <input
                    className="form-control"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Designation</label>
                  <input
                    className="form-control"
                    name="designation"
                    value={employee.designation}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Salary</label>
                  <input
                    type="number"
                    className="form-control"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Phone</label>
                  <input
                    className="form-control"
                    name="phone"
                    value={employee.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Address</label>
                  <input
                    className="form-control"
                    name="address"
                    value={employee.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <label>Update Image (Optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

              </div>

              <button className="btn btn-success">
                Update Employee
              </button>

            </form>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default EditEmployee;