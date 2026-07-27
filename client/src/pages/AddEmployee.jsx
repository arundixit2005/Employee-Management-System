import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "../layouts/AdminLayout";
import API from "../services/api";

function AddEmployee() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeeId: "",
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    salary: "",
    phone: "",
    address: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      await API.post("/employees/add", data);

      toast.success("Employee Added Successfully");

      navigate("/employees");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to Add Employee"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="container">

        <div className="card shadow">

          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Add Employee</h3>
          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Designation</label>
                  <input
                    type="text"
                    name="designation"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Salary</label>
                  <input
                    type="number"
                    name="salary"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12 mb-3">
                  <label>Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="col-12 mb-4">
                  <label>Employee Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

              </div>

              <button
                type="submit"
                className="btn btn-success"
              >
                Add Employee
              </button>

            </form>

          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

export default AddEmployee;