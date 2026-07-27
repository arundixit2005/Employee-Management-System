import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
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

  const totalEmployees = employees.length;

  const totalDepartments = new Set(
    employees.map((emp) => emp.department)
  ).size;

  const totalSalary = employees.reduce(
    (sum, emp) => sum + Number(emp.salary),
    0
  );

  const averageSalary =
    totalEmployees > 0
      ? Math.round(totalSalary / totalEmployees)
      : 0;

  return (
    <AdminLayout>
      <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Dashboard</h2>

          <Link to="/add-employee" className="btn btn-primary">
            + Add Employee
          </Link>
        </div>

        <div className="row">

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0 bg-primary text-white">
              <div className="card-body">
                <h5>Total Employees</h5>
                <h2>{totalEmployees}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0 bg-success text-white">
              <div className="card-body">
                <h5>Departments</h5>
                <h2>{totalDepartments}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0 bg-warning text-dark">
              <div className="card-body">
                <h5>Total Salary</h5>
                <h2>₹{totalSalary}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow border-0 bg-danger text-white">
              <div className="card-body">
                <h5>Average Salary</h5>
                <h2>₹{averageSalary}</h2>
              </div>
            </div>
          </div>

        </div>

        <div className="card shadow mt-4">
          <div className="card-header bg-dark text-white">
            Recent Employees
          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover">

                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Salary</th>
                  </tr>
                </thead>

                <tbody>

                  {employees.slice(0, 5).map((emp) => (
                    <tr key={emp._id}>

                      <td>
                        {emp.image ? (
                          <img
                            src={`${API.defaults.baseURL.replace(
                              "/api",
                              ""
                            )}/uploads/${emp.image}`}
                            alt={emp.name}
                            width="45"
                            height="45"
                            style={{
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <img
                            src="https://via.placeholder.com/45"
                            alt="No"
                            width="45"
                            height="45"
                            style={{ borderRadius: "50%" }}
                          />
                        )}
                      </td>

                      <td>{emp.name}</td>
                      <td>{emp.department}</td>
                      <td>{emp.designation}</td>
                      <td>₹{emp.salary}</td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default Dashboard;