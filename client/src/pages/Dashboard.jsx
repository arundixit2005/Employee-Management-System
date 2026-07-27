import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data.employees);
    } catch (err) {
      console.log(err);
    }
  };

  const departments = [
    ...new Set(employees.map((emp) => emp.department)),
  ];

  const cardStyle = {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "220px",
    textAlign: "center",
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Employee Management Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div style={cardStyle}>
          <h2>{employees.length}</h2>
          <p>Total Employees</p>
        </div>

        <div style={cardStyle}>
          <h2>{departments.length}</h2>
          <p>Departments</p>
        </div>
      </div>

      <Link to="/employees">
        <button>Manage Employees</button>
      </Link>
    </div>
  );
}

export default Dashboard;