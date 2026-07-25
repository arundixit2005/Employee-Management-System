import AdminLayout from "../layouts/AdminLayout";
import { useEffect, useState } from "react";
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
    } catch (error) {
      console.log(error);
    }
  };

  const totalSalary = employees.reduce(
    (sum, emp) => sum + Number(emp.salary || 0),
    0
  );

  const totalDepartments = new Set(
    employees.map((emp) => emp.department)
  ).size;

  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <AdminLayout>
      <h2 className="mb-4">Dashboard</h2>

      {/* Cards */}
      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Total Employees</h6>
              <h2>{employees.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Departments</h6>
              <h2>{totalDepartments}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Total Salary</h6>
              <h5>₹{totalSalary}</h5>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h6>Admin</h6>
              <h5>{admin?.name}</h5>
            </div>
          </div>
        </div>

      </div>

      {/* Employee Table */}
      <div className="card shadow mt-5">
        <div className="card-header bg-primary text-white">
          Employee List
        </div>

        <div className="card-body">

          <table className="table table-hover table-striped align-middle">

            <thead className="table-dark">
              <tr>
                <th>Photo</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>

                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${emp.image}`}
                      alt={emp.name}
                      width="50"
                      height="50"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </td>

                  <td>{emp.employeeId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>₹{emp.salary}</td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;