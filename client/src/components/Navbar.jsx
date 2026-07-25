function Navbar() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <nav className="navbar bg-white shadow-sm px-4">
      <h3>Employee Management System</h3>

      <div>
        <strong>👤 {admin?.name}</strong>
      </div>
    </nav>
  );
}

export default Navbar;