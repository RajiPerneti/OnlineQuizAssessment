
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    const enteredEmail = email.trim().toLowerCase();

    if (isRegister && name.trim() === "") {
      setError("Please enter your name.");
      return;
    }

    if (!emailPattern.test(enteredEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!passwordPattern.test(password)) {
      setError(
        "Password must contain at least 6 characters, 1 letter, 1 number and 1 special character."
      );
      return;
    }

    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      if (isRegister) {
        const response = await fetch(
          "https://online-quiz-assessment-api.onrender.com/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name.trim(),
              email: enteredEmail,
              password: password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Registration failed.");
          return;
        }

        alert("Registration successful! You can now login.");

        setIsRegister(false);
        setName("");
        setEmail(enteredEmail);
        setPassword("");
        setConfirmPassword("");

        return;
      }

      const response = await fetch(
        "https://online-quiz-assessment-api.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: enteredEmail,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      localStorage.setItem("loggedInUser", data.user.name);
      localStorage.setItem("loggedInEmail", data.user.email);

      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication error:", error);

      setError(
        "Unable to connect to the server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegister(!isRegister);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="auth-page">

      {/* Header */}
      <header className="auth-header">
        <div className="auth-brand">
          <span className="brand-icon">✦</span>
          QuizApp
        </div>

        <div className="auth-nav">
          <span
            className={!isRegister ? "auth-active" : ""}
            onClick={() => {
              setIsRegister(false);
              setError("");
            }}
          >
            Login
          </span>

          <span
            className={isRegister ? "auth-active" : ""}
            onClick={() => {
              setIsRegister(true);
              setError("");
            }}
          >
            Register
          </span>
        </div>
      </header>

      {/* Main Section */}
      <main className="auth-main">

        {/* Left Side */}
        <section className="auth-left">

          <p className="auth-tagline">
            LEARN <span>•</span> PRACTICE <span>•</span> EXCEL
          </p>

          <h1>
            Quiz<span>App</span>
          </h1>

          <div className="auth-underline"></div>

          <p className="auth-description">
            Take quizzes, solve coding problems
            and track your progress!
          </p>

          <div className="auth-features">

            <div className="auth-feature">
              <span className="feature-icon">✦</span>
              <span>Multiple Subject Quizzes</span>
            </div>

            <div className="auth-feature">
              <span className="feature-icon">&lt;/&gt;</span>
              <span>Coding Challenges</span>
            </div>

            <div className="auth-feature">
              <span className="feature-icon">↗</span>
              <span>Track Your Performance</span>
            </div>

          </div>

          <div className="auth-quote">
            Challenge Yourself!
          </div>

        </section>

        {/* Right Side - Login/Register Card */}
        <section className="auth-right">

          <div className="auth-card">

            <h2>
              {isRegister ? "Create Account" : "Welcome Back!"}
            </h2>

            <p className="auth-card-subtitle">
              {isRegister
                ? "Register to start your assessment"
                : "Login to your account"}
            </p>

            <form onSubmit={handleSubmit}>

              {isRegister && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                />
              )}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                minLength="6"
                required
              />

              {isRegister && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  minLength="6"
                  required
                />
              )}

              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}>
                {loading
                  ? "Please wait..."
                  : isRegister
                  ? "Register"
                  : "Login"}
              </button>

            </form>

            <div className="auth-switch">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}

              <span onClick={switchMode}>
                {isRegister ? "Login" : "Register"}
              </span>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Login;
