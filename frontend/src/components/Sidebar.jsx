import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">QuizApp</div>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard" className="sidebar-link">
          <span>⌂</span>
          Dashboard
        </NavLink>

        <NavLink to="/quiz-selection" className="sidebar-link">
          <span>▣</span>
          MCQ Quiz
        </NavLink>

        <NavLink to="/coding" className="sidebar-link">
          <span>&lt;/&gt;</span>
          Coding Section
        </NavLink>

        <NavLink to="/my-results" className="sidebar-link">
          <span>▤</span>
          My Results
        </NavLink>
      </nav>

      <button className="logout-button" onClick={handleLogout}>
        <span>↪</span>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;