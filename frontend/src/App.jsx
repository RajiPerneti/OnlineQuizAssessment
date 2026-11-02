import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QuizSelection from "./pages/QuizSelection";
import MCQQuiz from "./pages/MCQQuiz";
import CodingSection from "./pages/CodingSection";
import Result from "./pages/Result";
import MyResults from "./pages/MyResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quiz-selection" element={<QuizSelection />} />
      <Route path="/mcq-quiz" element={<MCQQuiz />} />
      <Route path="/coding" element={<CodingSection />} />
      <Route path="/result" element={<Result />} />
      <Route path="/my-results" element={<MyResults />} />
    </Routes>
  );
}

export default App;