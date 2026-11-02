import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

function QuizSelection() {
  const navigate = useNavigate();

  const userName =
    localStorage.getItem("loggedInUser") || "User";

  const quizzes = [
    {
      id: 1,
      title: "MFEF",
      description:
        "Test your knowledge of MFEF concepts and fundamentals.",
    },
    {
      id: 2,
      title: "DBMS",
      description:
        "Test your understanding of database management systems.",
    },
    {
      id: 3,
      title: "Computer Networks",
      description:
        "Test your knowledge of networking concepts and protocols.",
    },
    {
      id: 4,
      title: "DSA",
      description:
        "Test your knowledge of data structures and algorithms.",
    },
  ];

  const startQuiz = (quiz) => {
    navigate("/mcq-quiz", {
      state: {
        subject: quiz.title,
      },
    });
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="page-header">
          <h2>Quiz Selection</h2>

          <div className="user-info">
            <span>♟</span>
            <span>{userName}</span>
          </div>
        </header>

        <section className="quiz-selection-content">
          <div className="selection-heading">
            <h1>Choose a Quiz</h1>
            <p>Select a subject to start your assessment.</p>
          </div>

          <div className="quiz-grid">
            {quizzes.map((quiz) => (
              <div className="quiz-card" key={quiz.id}>
                <div className="quiz-number">
                  {quiz.id}
                </div>

                <h3>{quiz.title}</h3>

                <p>{quiz.description}</p>

                <div className="quiz-info">
                  <span>10 Questions</span>
                  <span>10 Marks</span>
                </div>

                <button
                  onClick={() => startQuiz(quiz)}
                >
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default QuizSelection;
