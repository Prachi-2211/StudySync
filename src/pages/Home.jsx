import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { useAuth } from "../Context/AuthContext";

export function Home() {

  const { user, loading } = useAuth();

  // Scroll to top when Home opens
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>StudySync</h2>
        <p>Loading your learning workspace...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >

        {/* Hero Section */}

        <section
          style={{
            padding: "90px 40px",
            textAlign: "center",
            background:
              "linear-gradient(180deg,#eff6ff,#f8fafc)",
          }}
        >

          <span
            style={{
              display: "inline-block",
              padding: "10px 20px",
              borderRadius: "30px",
              background: "#dbeafe",
              color: "#2563eb",
              fontWeight: "600",
              marginBottom: "25px",
            }}
          >
            AI Powered Student Productivity Platform
          </span>

          <h1
            style={{
              fontSize: "58px",
              lineHeight: "1.2",
              color: "#0f172a",
              maxWidth: "900px",
              margin: "auto",
            }}
          >
            Manage Your Learning.
            <br />
            Improve Your Productivity.
          </h1>

          <p
            style={{
              maxWidth: "720px",
              margin: "30px auto",
              fontSize: "20px",
              color: "#64748b",
              lineHeight: "1.8",
            }}
          >
            StudySync is your all-in-one student productivity
            platform that helps you organize tasks, create
            notes, and learn smarter with AI assistance.
            Stay focused, stay productive, and achieve your
            academic goals.
          </p>

          <div
            style={{
              marginTop: "40px",
            }}
          >
            {!user && (
              <>
                <Link to="/register">
                  <button className="btn-primary">
                    Start For Free
                  </button>
                </Link>

                <Link to="/login">
                  <button
                    className="btn-secondary"
                    style={{ marginLeft: "18px" }}
                  >
                    Sign In
                  </button>
                </Link>
              </>
            )}

            {user && (
              <Link to="/dashboard">
                <button className="btn-primary">
                  Go To Dashboard
                </button>
              </Link>
            )}
          </div>
        </section>

        {/* Features */}

        <section
          style={{
            padding: "50px 40px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "auto",
              background: "white",
              borderRadius: "30px",
              padding: "45px",
              boxShadow:
                "0 20px 60px rgba(0,0,0,.08)",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                fontSize: "38px",
                color: "#0f172a",
              }}
            >
              Everything You Need In One Workspace
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(250px,1fr))",
                gap: "30px",
                marginTop: "45px",
              }}
            >
              <Feature
                title="Task Management"
                text="Plan assignments, organize schedules, and track your study goals effortlessly."
              />

              <Feature
                title="Smart Notes"
                text="Store all your important notes and study material securely in one place."
              />

              <Feature
                title="AI Learning Assistant"
                text="Ask questions, get instant explanations, summaries, and learning support."
              />
            </div>
          </div>
        </section>

            {/* AI Section */}

        <section
          style={{
            padding: "70px 40px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "auto",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(320px,1fr))",
              gap: "30px",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#7c3aed)",
                color: "white",
                padding: "45px",
                borderRadius: "25px",
              }}
            >
              <h2
                style={{
                  fontSize: "34px",
                  marginBottom: "20px",
                }}
              >
                AI Powered Learning
              </h2>

              <p
                style={{
                  lineHeight: "1.8",
                }}
              >
                Ask questions, understand concepts,
                summarize notes, generate study material,
                and accelerate your learning journey with
                StudySync AI.
              </p>

              <Link to="/ai">
                <button
                  style={{
                    marginTop: "25px",
                    padding: "14px 30px",
                    background: "white",
                    color: "#2563eb",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Explore AI
                </button>
              </Link>
            </div>

            <div
              style={{
                background: "white",
                padding: "45px",
                borderRadius: "25px",
                boxShadow:
                  "0 10px 35px rgba(0,0,0,.08)",
              }}
            >
              <h2
                style={{
                  marginBottom: "20px",
                }}
              >
                Built For Students
              </h2>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.8",
                }}
              >
                Designed specifically for students who
                want a clean, modern, and productive
                workspace for managing academic life.
              </p>

              <p
                style={{
                  color: "#2563eb",
                  fontWeight: "600",
                  marginTop: "20px",
                }}
              >
                Tasks • Notes • AI • Productivity
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section
          style={{
            textAlign: "center",
            padding: "80px 40px",
          }}
        >
          <h2
            style={{
              fontSize: "40px",
              color: "#0f172a",
            }}
          >
            Start Building Better Study Habits Today
          </h2>

          <p
            style={{
              color: "#64748b",
              marginTop: "15px",
              marginBottom: "30px",
              fontSize: "18px",
            }}
          >
            Join thousands of students using StudySync
            to stay organized and productive.
          </p>

          {!user && (
            <Link to="/register">
              <button className="btn-primary">
                Create Free Account
              </button>
            </Link>
          )}

          {user && (
            <Link to="/dashboard">
              <button className="btn-primary">
                Open Dashboard
              </button>
            </Link>
          )}
        </section>

      </div>
    </>
  );
}

function Feature({ title, text }) {
  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        borderRadius: "20px",
        transition: ".3s",
        boxShadow: "0 8px 20px rgba(0,0,0,.05)",
      }}
    >
      <h3
        style={{
          color: "#0f172a",
          marginBottom: "15px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#64748b",
          lineHeight: "1.8",
        }}
      >
        {text}
      </p>
    </div>
  );
}

export default Home;
