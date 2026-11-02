import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

function Dashboard() {
  const navigate = useNavigate();

  const userName =
    localStorage.getItem("loggedInUser") || "User";

  const loggedInEmail =
    localStorage.getItem("loggedInEmail");

  const [results, setResults] = useState([]);

  // Get quiz results for the currently logged-in user
  useEffect(() => {
    const fetchResults = async () => {
      if (!loggedInEmail) {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/quiz-results/${encodeURIComponent(
            loggedInEmail
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            "Failed to fetch quiz results:",
            data.message
          );
          setResults([]);
          return;
        }

        setResults(data);
      } catch (error) {
        console.error(
          "Error fetching quiz results:",
          error
        );
        setResults([]);
      }
    };

    fetchResults();
  }, [loggedInEmail]);

  // Number of quizzes attempted
  const totalQuizzes = results.length;

  // Total marks obtained
  const totalMarks = results.reduce(
    (total, result) =>
      total + Number(result.score || 0),
    0
  );

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">

        {/* Header */}
        <header className="page-header">
          <h2>Dashboard</h2>

          <div className="user-info">
            <span>♟</span>
            <span>{userName}</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="dashboard-content">

          {/* Welcome */}
          <div className="welcome-section">
            <h1>Hello, {userName}!</h1>

            <p>
              Welcome to your Online Quiz & Coding
              Assessment System.
            </p>
          </div>

          {/* Statistics */}
          <div className="stats-grid">

            {/* Available Quizzes */}
            <div className="stat-card blue-card">
              <div className="stat-icon">📝</div>

              <p>Available Quizzes</p>

              <h2>4</h2>
            </div>

            {/* Coding Problems */}
            <div className="stat-card green-card">
              <div className="stat-icon">{"</>"}</div>

              <p>Coding Problems</p>

              <h2>8</h2>
            </div>

            {/* Your Results */}
            <div className="stat-card purple-card">
              <div className="stat-icon">📊</div>

              <p>Your Results</p>

              <h2>{totalQuizzes}</h2>
            </div>

            {/* Total Marks */}
            <div className="stat-card yellow-card">
              <div className="stat-icon">🏆</div>

              <p>Total Marks</p>

              <h2>{totalMarks}</h2>
            </div>

          </div>

          {/* Quick Start */}
          <h2 className="section-title">
            Quick Start
          </h2>

          <div className="quick-start-grid">

            {/* MCQ */}
            <div className="quick-card">

              <div className="quick-icon">
                📝
              </div>

              <h3>MCQ Quiz</h3>

              <p>
                Test your knowledge in MFEF, DBMS,
                Computer Networks and DSA.
              </p>

              <button
                onClick={() =>
                  navigate("/quiz-selection")
                }
              >
                Start Quiz
              </button>

            </div>

            {/* Coding */}
            <div className="quick-card">

              <div className="quick-icon">
                {"</>"}
              </div>

              <h3>Coding Assessment</h3>

              <p>
                Solve programming problems using
                JavaScript, Python or Java.
              </p>

              <button
                onClick={() =>
                  navigate("/coding")
                }
              >
                Start Coding
              </button>

            </div>

          </div>

        </section>
      </main>
    </div>
  );
}

export default Dashboard;
