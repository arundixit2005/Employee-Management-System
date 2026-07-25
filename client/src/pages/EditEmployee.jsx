import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
      alert("Employee not found");
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

      alert("Employee Updated Successfully");
      navigate("/employees");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <AdminLayout>
      <div className="card shadow">
        <div className="card-body">

          <h2 className="mb-4">Edit Employee</h2>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label>Employee ID</label>
                <input
                  className="form-control"
                  name="employeeId"
                  value={employee.employeeId}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Name</label>
                <input
                  className="form-control"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Department</label>
                <input
                  className="form-control"
                  name="department"
                  value={employee.department}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Designation</label>
                <input
                  className="form-control"
                  name="designation"
                  value={employee.designation}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Salary</label>
                <input
                  className="form-control"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Address</label>
                <input
                  className="form-control"
                  name="address"
                  value={employee.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label>New Image</label>
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
    </AdminLayout>
  );
}

export default EditEmployee;