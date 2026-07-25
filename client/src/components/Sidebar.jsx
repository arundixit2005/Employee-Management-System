import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Employees", path: "/employees", icon: <FaUsers /> },
    { name: "Add Employee", path: "/add-employee", icon: <FaUserPlus /> },
  ];

  return (
    <div
      className="bg-dark text-white"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h3 className="text-center py-4 border-bottom">
        EMS Admin
      </h3>

      <div className="p-3">
        {menus.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`d-flex align-items-center gap-2 text-decoration-none p-3 rounded mb-2 ${
              location.pathname === item.path
                ? "bg-primary text-white"
                : "text-light"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}

        <button
          className="btn btn-danger w-100 mt-4"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;