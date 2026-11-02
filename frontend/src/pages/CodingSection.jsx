import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../App.css";

function CodingSection() {
  const navigate = useNavigate();

  const problems = [
    {
      id: 1,
      title: "Sum of Two Numbers",
      difficulty: "Easy",
      description:
        "Write a program to read two integers and print their sum.",
      input: "5 7",
      output: "12",
    },

    {
      id: 2,
      title: "Find Largest Number",
      difficulty: "Easy",
      description:
        "Write a program to read three integers and print the largest number.",
      input: "10 25 15",
      output: "25",
    },

    {
      id: 3,
      title: "Reverse a Number",
      difficulty: "Medium",
      description:
        "Write a program to read an integer and print its reverse.",
      input: "1234",
      output: "4321",
    },

    {
      id: 4,
      title: "Second Largest Element",
      difficulty: "Medium",
      description:
        "Write a program to read an array of integers and print the second largest distinct element.",
      input: "10 25 15 30 20",
      output: "25",
    },

    {
      id: 5,
      title: "Check Anagram",
      difficulty: "Medium",
      description:
        "Write a program to read two strings and check whether they are anagrams of each other.",
      input: "listen silent",
      output: "Anagram",
    },

    {
      id: 6,
      title: "First Non-Repeating Character",
      difficulty: "Hard",
      description:
        "Write a program to find the first character in a string that does not repeat. If every character repeats, print -1.",
      input: "swiss",
      output: "w",
    },

    {
      id: 7,
      title: "Find Missing Number",
      difficulty: "Hard",
      description:
        "Write a program to find the missing number from an array containing distinct numbers from 1 to n.",
      input: "1 2 3 5 6",
      output: "4",
    },

    {
      id: 8,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Hard",
      description:
        "Write a program to find the length of the longest substring that contains no repeating characters.",
      input: "abcabcbb",
      output: "3",
    },
  ];

  // Only these 3 languages
  const languages = [
    "JavaScript",
    "Python",
    "Java",
  ];

  const [selectedProblem, setSelectedProblem] =
    useState(problems[0]);

  const [selectedLanguage, setSelectedLanguage] =
    useState("JavaScript");

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");

  const selectProblem = (problem) => {
    setSelectedProblem(problem);
    setCode("");
    setOutput("");
    setStatus("");
  };

  const changeLanguage = (event) => {
    setSelectedLanguage(event.target.value);
    setCode("");
    setOutput("");
    setStatus("");
  };

  // =========================
  // SAVE CODING SUBMISSION
  // =========================

  const saveCodingResult = (resultStatus) => {
    const loggedInEmail =
      localStorage.getItem("loggedInEmail");

    if (!loggedInEmail) {
      return;
    }

    const codingResultsKey =
      `codingResults_${loggedInEmail}`;

    const existingResults = JSON.parse(
      localStorage.getItem(codingResultsKey) || "[]"
    );

    const newResult = {
      id: Date.now(),
      problem: selectedProblem.title,
      language: selectedLanguage,
      status: resultStatus,
      date: new Date().toLocaleString(),
    };

    const updatedResults = [
      ...existingResults,
      newResult,
    ];

    localStorage.setItem(
      codingResultsKey,
      JSON.stringify(updatedResults)
    );

    localStorage.setItem(
      "codingResults",
      JSON.stringify(updatedResults)
    );
  };

  // =========================
  // RUN CODE
  // =========================

  const runCode = async () => {
    if (code.trim() === "") {
      setStatus("Please write your code first.");
      setOutput("");
      return;
    }

    setStatus("Checking your code...");
    setOutput("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/code/execute",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            language: selectedLanguage,
            code: code,
            input: selectedProblem.input,
            expectedOutput: selectedProblem.output,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setStatus("✕ Error");

        setOutput(
          data.message ||
            "Something went wrong."
        );

        return;
      }

      let resultStatus = "";

      if (data.status === "correct") {
        resultStatus = "Correct";

        setStatus("✓ Correct Answer");

      } else if (data.status === "wrong") {
        resultStatus = "Wrong";

        setStatus("✕ Wrong Answer");

      } else if (
        data.status === "syntax_error"
      ) {
        resultStatus =
          "Syntax / Compilation Error";

        setStatus(
          "✕ Syntax / Compilation Error"
        );

      } else if (
        data.status === "runtime_error"
      ) {
        resultStatus = "Runtime Error";

        setStatus("✕ Runtime Error");

      } else if (
        data.status === "not_supported"
      ) {
        resultStatus = "Not Supported";

        setStatus("⚠ Not Supported");

      } else {
        resultStatus = "Evaluation Result";

        setStatus("Code Evaluation Result");
      }

      setOutput(
        `Expected Output:
${data.expectedOutput || selectedProblem.output}

Your Output:
${data.output || "No output"}`
      );

      saveCodingResult(resultStatus);

    } catch (error) {
      setStatus("⚠ Backend not connected");

      setOutput(
        "The coding evaluation server is not running yet.\n\n" +
          "Start the Node.js backend to evaluate your code."
      );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">

        <header className="page-header">

          <h2>Coding Section</h2>

          <div className="user-info">

            <span>♟</span>

            <span>
              {localStorage.getItem(
                "loggedInUser"
              ) || "User"}
            </span>

          </div>

        </header>

        <section className="coding-content">

          <div className="coding-heading">

            <div>

              <h1>Coding Assessment</h1>

              <p>
                Select a problem, choose a programming
                language and write your solution.
              </p>

            </div>

            <button
              className="coding-back-button"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Back to Dashboard
            </button>

          </div>

          <div className="coding-layout">

            {/* Problem List */}

            <div className="problem-list">

              <h3>Problems</h3>

              {problems.map((problem) => (

                <button
                  key={problem.id}
                  className={`problem-item ${
                    selectedProblem.id ===
                    problem.id
                      ? "active-problem"
                      : ""
                  }`}
                  onClick={() =>
                    selectProblem(problem)
                  }
                >

                  <span className="problem-number">
                    {problem.id}
                  </span>

                  <span className="problem-name">
                    {problem.title}
                  </span>

                </button>

              ))}

            </div>

            {/* Coding Workspace */}

            <div className="coding-workspace">

              <div className="problem-description">

                <div className="problem-title-row">

                  <h2>
                    {selectedProblem.id}.{" "}
                    {selectedProblem.title}
                  </h2>

                  <span
                    className={`difficulty ${
                      selectedProblem.difficulty ===
                      "Easy"
                        ? "easy"
                        : selectedProblem.difficulty ===
                          "Medium"
                        ? "medium"
                        : "hard"
                    }`}
                  >
                    {selectedProblem.difficulty}
                  </span>

                </div>

                <p>
                  {selectedProblem.description}
                </p>

                <div className="sample-section">

                  <div>

                    <strong>
                      Sample Input
                    </strong>

                    <pre>
                      {selectedProblem.input}
                    </pre>

                  </div>

                  <div>

                    <strong>
                      Expected Output
                    </strong>

                    <pre>
                      {selectedProblem.output}
                    </pre>

                  </div>

                </div>

              </div>

              {/* Code Editor */}

              <div className="code-editor">

                <div className="editor-header">

                  <span>
                    Code Editor
                  </span>

                  <div className="language-select-box">

                    <label htmlFor="language">
                      Language:
                    </label>

                    <select
                      id="language"
                      value={selectedLanguage}
                      onChange={
                        changeLanguage
                      }
                    >

                      <option value="JavaScript">
                        JavaScript
                      </option>

                      <option value="Python">
                        Python
                      </option>

                      <option value="Java">
                        Java
                      </option>

                    </select>

                  </div>

                </div>

                <textarea
                  value={code}
                  onChange={(event) =>
                    setCode(
                      event.target.value
                    )
                  }
                  placeholder={`// Write your ${selectedLanguage} code here...`}
                  spellCheck="false"
                />

                <div className="editor-actions">

                  <button
                    onClick={runCode}
                  >
                    Run & Submit
                  </button>

                </div>

              </div>

              {/* Result */}

              {(status || output) && (

                <div className="coding-output">

                  <h3>
                    Result
                  </h3>

                  {status && (

                    <p
                      className={`submission-status ${
                        status.includes(
                          "Correct"
                        )
                          ? "correct-message"
                          : status.includes(
                              "Wrong"
                            ) ||
                            status.includes(
                              "Error"
                            )
                          ? "error-message"
                          : ""
                      }`}
                    >
                      {status}
                    </p>

                  )}

                  {output && (

                    <pre>
                      {output}
                    </pre>

                  )}

                </div>

              )}

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default CodingSection;
