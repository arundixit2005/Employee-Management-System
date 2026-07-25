import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

      alert("Employee Added Successfully");

      navigate("/employees");
    } catch (error) {
      console.log(error);
      alert("Failed to Add Employee");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Add Employee</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "15px",
          maxWidth: "500px",
        }}
      >
        <input
          name="employeeId"
          placeholder="Employee ID"
          onChange={handleChange}
          required
        />

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
          required
        />

        <input
          name="designation"
          placeholder="Designation"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="submit"
          style={{
            padding: "12px",
            cursor: "pointer",
          }}
        >
          Add Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;