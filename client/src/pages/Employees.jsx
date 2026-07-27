import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import API from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await API.delete(`/employees/${id}`);
      alert("Employee Deleted Successfully");
      getEmployees();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const searchText = search.toLowerCase();

    return (
      emp.name.toLowerCase().includes(searchText) ||
      emp.email.toLowerCase().includes(searchText) ||
      emp.department.toLowerCase().includes(searchText) ||
      emp.designation.toLowerCase().includes(searchText) ||
      emp.employeeId.toLowerCase().includes(searchText)
    );
  });

  return (
    <AdminLayout>
      <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Employees</h2>

          <Link to="/add-employee" className="btn btn-primary">
            + Add Employee
          </Link>
        </div>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by ID, Name, Email, Department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="card shadow">
          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">
                  <tr>
                    <th>Photo</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Phone</th>
                    <th width="180">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <tr key={emp._id}>

                        <td>
                          {emp.image ? (
                            <img
                              src={`${API.defaults.baseURL.replace(
                                "/api",
                                ""
                              )}/uploads/${emp.image}`}
                              alt={emp.name}
                              width="50"
                              height="50"
                              style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <img
                              src="https://via.placeholder.com/50"
                              alt="No Image"
                              width="50"
                              height="50"
                              style={{
                                borderRadius: "50%",
                              }}
                            />
                          )}
                        </td>

                        <td>{emp.employeeId}</td>
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.department}</td>
                        <td>{emp.designation}</td>
                        <td>₹{emp.salary}</td>
                        <td>{emp.phone}</td>

                        <td>
                          <Link
                            to={`/edit-employee/${emp._id}`}
                            className="btn btn-warning btn-sm"
                          >
                            Edit
                          </Link>

                          <button
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() => deleteEmployee(emp._id)}
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No Employee Found
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

export default Employees;