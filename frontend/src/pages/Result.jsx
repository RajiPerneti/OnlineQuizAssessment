import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const { quizTitle, answers, questions } =
    location.state || {};

  const saveAttempted = useRef(false);

  // Calculate result
  const correct = questions
    ? questions.reduce((total, question, index) => {
        return (
          total +
          (answers?.[index] === question.answer ? 1 : 0)
        );
      }, 0)
    : 0;

  const total = questions?.length || 0;

  const skipped = questions
    ? answers?.filter((answer) => answer === null).length || 0
    : 0;

  const wrong = total - correct - skipped;

  const percentage =
    total > 0
      ? Math.round((correct / total) * 100)
      : 0;

  const status =
    percentage >= 50
      ? "Passed"
      : "Needs Improvement";

  // Save completed quiz result to MongoDB
  useEffect(() => {
    if (
      !quizTitle ||
      !questions ||
      saveAttempted.current
    ) {
      return;
    }

    saveAttempted.current = true;

    const loggedInEmail =
      localStorage.getItem("loggedInEmail");

    if (!loggedInEmail) {
      return;
    }

    const saveResult = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/quiz-results",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: loggedInEmail,
              quizTitle: quizTitle,
              score: correct,
              totalMarks: total,
              correct: correct,
              wrong: wrong,
              skipped: skipped,
              percentage: percentage,
              status: status,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            "Failed to save quiz result:",
            data.message
          );
          return;
        }

        console.log(
          "Quiz result saved:",
          data.message
        );
      } catch (error) {
        console.error(
          "Error saving quiz result:",
          error
        );
      }
    };

    saveResult();
  }, [
    quizTitle,
    questions,
    correct,
    total,
    wrong,
    skipped,
    percentage,
    status,
  ]);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">

        <header className="page-header">
          <h2>Quiz Result</h2>

          <div className="user-info">
            <span>♟</span>

            <span>
              {localStorage.getItem("loggedInUser") ||
                "User"}
            </span>
          </div>
        </header>

        <section className="result-content">

          <div className="result-card">

            <h1>
              {quizTitle || "Quiz"} Result
            </h1>

            <div className="result-score">
              <strong>
                {correct}/{total}
              </strong>

              <span>
                {percentage}%
              </span>
            </div>

            <p
              className={
                percentage >= 50
                  ? "result-success"
                  : "result-warning"
              }
            >
              {status}
            </p>

            <div className="result-summary">

              <div>
                <span>Correct</span>
                <strong>{correct}</strong>
              </div>

              <div>
                <span>Wrong</span>
                <strong>{wrong}</strong>
              </div>

              <div>
                <span>Skipped</span>
                <strong>{skipped}</strong>
              </div>

            </div>

            <div className="result-actions">

              <button
                onClick={() =>
                  navigate("/quiz-selection")
                }
              >
                Take Another Quiz
              </button>

              <button
                onClick={() =>
                  navigate("/my-results")
                }
              >
                View My Results
              </button>

              <button
                onClick={() =>
                  navigate("/coding")
                }
              >
                Continue to Coding
              </button>

            </div>

          </div>

        </section>
      </main>
    </div>
  );
}

export default Result;
