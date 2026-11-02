import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";
import { questions } from "../data/questions";

function MCQQuiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedSubject =
    location.state?.subject || "MFEF";

  const quizQuestions = questions[selectedSubject] || [];

  const quizTitle = selectedSubject;

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState(
    Array(quizQuestions.length).fill(null)
  );

  const selectedAnswer = answers[currentQuestion];

  // Select an answer
  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];

    updatedAnswers[currentQuestion] = answer;

    setAnswers(updatedAnswers);
  };

  // Go to next question
  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuiz();
    }
  };

  // Go to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit quiz
  const submitQuiz = () => {
    navigate("/result", {
      state: {
        quizTitle,
        answers,
        questions: quizQuestions,
      },
    });
  };

  // Jump directly to a question
  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  // Check whether question was answered
  const isAnswered = (index) => {
    return answers[index] !== null;
  };

  if (quizQuestions.length === 0) {
    return (
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <header className="page-header">
            <h2>MCQ Quiz</h2>

            <div className="user-info">
              <span>♟</span>
              <span>
                {localStorage.getItem("loggedInUser") || "User"}
              </span>
            </div>
          </header>

          <section className="mcq-content">
            <div className="question-card">
              <h2>No questions available.</h2>

              <button
                className="next-button"
                onClick={() => navigate("/quiz-selection")}
              >
                Back to Quiz Selection
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">

        {/* Header */}
        <header className="page-header">
          <h2>MCQ Quiz</h2>

          <div className="user-info">
            <span>♟</span>

            <span>
              {localStorage.getItem("loggedInUser") ||
                "User"}
            </span>
          </div>
        </header>

        {/* Quiz Content */}
        <section className="mcq-content">

          {/* Quiz Heading */}
          <div className="mcq-top">
            <div>
              <h1>{quizTitle} Quiz</h1>

              <p>
                Answer the questions and complete the
                assessment.
              </p>
            </div>

            <div className="question-count">
              Question {currentQuestion + 1} of{" "}
              {quizQuestions.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>
          </div>

          {/* Question Navigator */}
          <div className="question-navigator">

            <div className="navigator-title">
              <strong>Questions</strong>

              <span>
                {answers.filter(
                  (answer) => answer !== null
                ).length}{" "}
                / {quizQuestions.length} answered
              </span>
            </div>

            <div className="question-numbers">
              {quizQuestions.map((_, index) => (
                <button
                  key={index}
                  className={`
                    question-number
                    ${
                      currentQuestion === index
                        ? "current-question"
                        : ""
                    }
                    ${
                      isAnswered(index)
                        ? "answered-question"
                        : ""
                    }
                  `}
                  onClick={() =>
                    goToQuestion(index)
                  }
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="navigator-legend">
              <span>
                <i className="legend-current"></i>
                Current
              </span>

              <span>
                <i className="legend-answered"></i>
                Answered
              </span>

              <span>
                <i className="legend-unanswered"></i>
                Not Answered
              </span>
            </div>

          </div>

          {/* Question */}
          <div className="question-card">

            <h2>
              {currentQuestion + 1}.{" "}
              {question.question}
            </h2>

            <div className="options-list">

              {question.options.map(
                (option, index) => (
                  <label
                    key={index}
                    className={`option-item ${
                      selectedAnswer === option
                        ? "selected-option"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={
                        selectedAnswer === option
                      }
                      onChange={() =>
                        handleAnswer(option)
                      }
                    />

                    <span>{option}</span>
                  </label>
                )
              )}

            </div>

            {/* Actions */}
            <div className="mcq-actions">

              <button
                className="previous-button"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>

              <button
                className="next-button"
                onClick={handleNext}
              >
                {currentQuestion ===
                quizQuestions.length - 1
                  ? "Submit Quiz"
                  : "Next"}
              </button>

            </div>

          </div>

        </section>
      </main>
    </div>
  );
}

export default MCQQuiz;
