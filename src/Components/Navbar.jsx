import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
const { user, signOut } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        background: "white",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          fontSize: "26px",
          fontWeight: "700",
          color: "#2563eb",
        }}
      >
        Study<span style={{ color: "#7c3aed" }}>Sync</span>
      </Link>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
        }}
      >
        {/* Show these links only after login */}
        {user && (
          <>
            <NavItem text="Dashboard" link="/dashboard" />
            <NavItem text="Tasks" link="/tasks" />
            <NavItem text="Notes" link="/notes" />
            <NavItem text="AI Assistant" link="/ai" />
            <NavItem text="Profile" link="/profile" />
            <NavItem text="Contact" link="/contact" />
          </>
        )}

        {/* Before Login */}
        {!user ? (
          <>
            <Link to="/login">
              <button
                style={{
                  padding: "10px 22px",
                  borderRadius: "20px",
                  border: "1px solid #2563eb",
                  background: "white",
                  color: "#2563eb",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: ".3s",
                }}
              >
                Login
              </button>
            </Link>

            <Link to="/register">
              <button
                style={{
                  padding: "10px 22px",
                  borderRadius: "20px",
                  border: "none",
                  background: "#2563eb",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: ".3s",
                }}
              >
                Get Started
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={signOut}
            style={{
              padding: "10px 22px",
              borderRadius: "20px",
              border: "none",
              background: "#ef4444",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

function NavItem({ text, link }) {
  return (
    <Link
      to={link}
      style={{
        textDecoration: "none",
        color: "#334155",
        fontWeight: "600",
        transition: ".3s",
      }}
    >
      {text}
    </Link>
  );
}

export default Navbar;