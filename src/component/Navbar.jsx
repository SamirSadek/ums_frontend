import { Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../provider/UserProvider";

export function Header() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user state
    setUser(null);
    localStorage.removeItem("user");
    // Redirect to login page
    navigate("/");
  };

  return (
    <Navbar className="px-20 bg-gray-100 shadow-md">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >
        User Management
      </Link>

      <Navbar.Toggle />
      <Navbar.Collapse>
        {user ? (
          <span>
            Welcome, {user.name}!{" "}
            <button onClick={handleLogout} className="ml-5 text-green-500">
              Logout
            </button>
          </span>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
