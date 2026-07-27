import EmployeeChart from "../components/EmployeeChart";
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

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Dashboard</h2>

          <Link to="/add-employee" className="btn btn-primary">
            + Add Employee
          </Link>
        </div>

        {/* Dashboard Cards */}

        <div className="row">

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card shadow border-0 bg-primary text-white">
              <div className="card-body text-center">
                <h5>Total Employees</h5>
                <h2>{totalEmployees}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card shadow border-0 bg-success text-white">
              <div className="card-body text-center">
                <h5>Departments</h5>
                <h2>{totalDepartments}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card shadow border-0 bg-warning">
              <div className="card-body text-center">
                <h5>Total Salary</h5>
                <h2>₹{totalSalary}</h2>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card shadow border-0 bg-danger text-white">
              <div className="card-body text-center">
                <h5>Average Salary</h5>
                <h2>₹{averageSalary}</h2>
              </div>
            </div>
          </div>

        </div>

        {/* Pie Chart */}

        <div className="card shadow mb-4">

          <div className="card-header bg-success text-white">
            <h5 className="mb-0">Employees by Department</h5>
          </div>

          <div className="card-body">

            {employees.length > 0 ? (
              <EmployeeChart employees={employees} />
            ) : (
              <p className="text-center">No Employee Data Available</p>
            )}

          </div>

        </div>

        {/* Recent Employees */}

        <div className="card shadow">

          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">Recent Employees</h5>
          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-light">

                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Salary</th>
                  </tr>

                </thead>

                <tbody>

                  {employees.length > 0 ? (
                    employees.slice(0, 5).map((emp) => (
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
                              alt="No Image"
                              width="45"
                              height="45"
                              style={{
                                borderRadius: "50%",
                              }}
                            />
                          )}
                        </td>

                        <td>{emp.name}</td>
                        <td>{emp.department}</td>
                        <td>{emp.designation}</td>
                        <td>₹{emp.salary}</td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No Employees Found
                      </td>
                    </tr>
                  )}

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