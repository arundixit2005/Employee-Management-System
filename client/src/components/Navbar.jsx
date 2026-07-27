import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      <h3 className="fw-bold m-0">
        Employee Management System
      </h3>

      <div className="ms-auto d-flex align-items-center gap-3">

        <span className="fw-semibold">
          👤 {admin?.name}
        </span>

        <button
          className="btn btn-danger btn-sm"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;