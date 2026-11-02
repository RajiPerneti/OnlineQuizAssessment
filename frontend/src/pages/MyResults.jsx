import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

function MyResults() {
  const navigate = useNavigate();

  // =========================
  // GET LOGGED-IN USER
  // =========================

  const loggedInEmail =
    localStorage.getItem("loggedInEmail");

  const userName =
    localStorage.getItem("loggedInUser") || "User";

  // =========================
  // STATES
  // =========================

  const [mcqResults, setMcqResults] = useState([]);
  const [codingResults, setCodingResults] = useState([]);

  // =========================
  // GET MCQ RESULTS FROM MONGODB
  // =========================

  useEffect(() => {
    const fetchQuizResults = async () => {
      if (!loggedInEmail) {
        setMcqResults([]);
        return;
      }

      try {
        const response = await fetch(
          `https://online-quiz-assessment-api.onrender.com/api/quiz-results/${encodeURIComponent(
            loggedInEmail
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            "Failed to fetch quiz results:",
            data.message
          );

          setMcqResults([]);
          return;
        }

        setMcqResults(data);
      } catch (error) {
        console.error(
          "Error fetching quiz results:",
          error
        );

        setMcqResults([]);
      }
    };

    fetchQuizResults();
  }, [loggedInEmail]);

  // =========================
  // GET CODING RESULTS
  // =========================

  useEffect(() => {
    if (!loggedInEmail) {
      setCodingResults([]);
      return;
    }

    const storedCodingResults = JSON.parse(
      localStorage.getItem(
        `codingResults_${loggedInEmail}`
      ) || "[]"
    );

    setCodingResults(storedCodingResults);
  }, [loggedInEmail]);

  // =========================
  // MCQ STATISTICS
  // =========================

  const totalQuizzes = mcqResults.length;

  const averageScore =
    totalQuizzes > 0
      ? Math.round(
          mcqResults.reduce(
            (total, result) =>
              total +
              Number(result.percentage || 0),
            0
          ) / totalQuizzes
        )
      : 0;

  const bestScore =
    totalQuizzes > 0
      ? Math.max(
          ...mcqResults.map((result) =>
            Number(result.percentage || 0)
          )
        )
      : 0;

  // =========================
  // TOTAL CODING SUBMISSIONS
  // =========================

  const totalCodingSubmissions =
    codingResults.length;

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        {/* HEADER */}

        <header className="page-header">

          <h2>My Results</h2>

          <div className="user-info">

            <span>♟</span>

            <span>
              {userName}
            </span>

          </div>

        </header>

        <section className="results-content">

          {/* PAGE HEADING */}

          <div className="results-heading">

            <div>

              <h1>
                My Results
              </h1>

              <p>
                View your quiz performance and
                coding submission history.
              </p>

            </div>

            <button
              className="coding-back-button"
              onClick={() =>
                navigate("/quiz-selection")
              }
            >
              Take a Quiz
            </button>

          </div>

          {/* STATISTICS */}

          <div className="result-stats">

            <div className="result-stat-card">

              <span className="stat-label">
                Total Quizzes
              </span>

              <strong>
                {totalQuizzes}
              </strong>

            </div>

            <div className="result-stat-card">

              <span className="stat-label">
                Average Score
              </span>

              <strong>
                {averageScore}%
              </strong>

            </div>

            <div className="result-stat-card">

              <span className="stat-label">
                Best Score
              </span>

              <strong>
                {bestScore}%
              </strong>

            </div>

            <div className="result-stat-card">

              <span className="stat-label">
                Coding Submissions
              </span>

              <strong>
                {totalCodingSubmissions}
              </strong>

            </div>

          </div>

          {/* MCQ HISTORY */}

          <div className="results-table-card">

            <h2>
              Quiz History
            </h2>

            {mcqResults.length === 0 ? (

              <div className="empty-results">

                <p>
                  No quiz attempts yet.
                </p>

                <button
                  onClick={() =>
                    navigate("/quiz-selection")
                  }
                >
                  Start a Quiz
                </button>

              </div>

            ) : (

              <div className="table-container">

                <table>

                  <thead>

                    <tr>

                      <th>
                        Quiz
                      </th>

                      <th>
                        Score
                      </th>

                      <th>
                        Percentage
                      </th>

                      <th>
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {mcqResults.map(
                      (result) => (

                        <tr
                          key={result._id}
                        >

                          <td>
                            {result.quizTitle}
                          </td>

                          <td>
                            {result.score}/
                            {result.totalMarks}
                          </td>

                          <td>
                            {result.percentage}%
                          </td>

                          <td>

                            <span
                              className={
                                result.status ===
                                "Passed"
                                  ? "result-passed"
                                  : "result-improvement"
                              }
                            >
                              {result.status}
                            </span>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          {/* CODING HISTORY */}

          <div className="results-table-card">

            <h2>
              Coding Submission History
            </h2>

            {codingResults.length === 0 ? (

              <div className="empty-results">

                <p>
                  No coding submissions yet.
                </p>

                <button
                  onClick={() =>
                    navigate("/coding")
                  }
                >
                  Start Coding
                </button>

              </div>

            ) : (

              <div className="table-container">

                <table>

                  <thead>

                    <tr>

                      <th>
                        Problem
                      </th>

                      <th>
                        Language
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Date
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {codingResults
                      .slice()
                      .reverse()
                      .map(
                        (result) => (

                          <tr
                            key={result.id}
                          >

                            <td>
                              {result.problem}
                            </td>

                            <td>
                              {result.language}
                            </td>

                            <td>

                              <span
                                className={
                                  result.status ===
                                  "Correct"
                                    ? "result-passed"
                                    : "result-improvement"
                                }
                              >
                                {result.status}
                              </span>

                            </td>

                            <td>
                              {result.date}
                            </td>

                          </tr>

                        )
                      )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          {/* BOTTOM BUTTON */}

          <div className="results-bottom">

            <button
              className="results-dashboard-button"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Back to Dashboard
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default MyResults;
