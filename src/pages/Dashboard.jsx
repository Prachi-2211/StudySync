import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    tasks: 0,
    completed: 0,
    notes: 0,
    ai: 0,
  });


const [todayGoals, setTodayGoals] = useState([]);
useEffect(() => {
  if (user) {
    fetchStats();
  }
}, [user]);

useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}, []);

  async function fetchStats() {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id);
const pendingTasks =
  tasks?.filter((task) => !task.completed).slice(0, 4) || [];

setTodayGoals(pendingTasks);

    const { data: notes } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user.id);

    const { data: ai } = await supabase
      .from("ai_history")
      .select("*")
      .eq("user_id", user.id);

    setStats({
      tasks: tasks?.length || 0,
      completed: tasks?.filter((t) => t.completed).length || 0,
      notes: notes?.length || 0,
      ai: ai?.length || 0,
    });
  }

  const progress =
    stats.tasks === 0
      ? 0
      : Math.round((stats.completed / stats.tasks) * 100);

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning "
      : hour < 18
      ? "Good Afternoon "
      : "Good Evening ";

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "#eef4ff",
          padding: "30px",
        }}
      >
        {/* Hero */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",
            borderRadius: "28px",
            padding: "40px",
            color: "white",
            boxShadow: "0 20px 45px rgba(37,99,235,.3)",
          }}
        >
          <h1 style={{ fontSize: 38 }}>
            {greeting}
          </h1>

          <h2 style={{ marginTop: 8 }}>
            Welcome back!
          </h2>

          <p
            style={{
              opacity: 0.9,
              marginTop: 10,
            }}
          >
            {user?.email}
          </p>

          <div
            style={{
              marginTop: 30,
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `conic-gradient(#22c55e ${progress * 3.6}deg,#ffffff40 0deg)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "#fff",
                  color: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >
                {progress}%
              </div>
            </div>

            <div>
              <h2>Today's Progress</h2>
              <p>
                Keep studying and complete your goals.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 20,
            marginTop: 30,
          }}
        >
          <Card
            color="#2563eb"
            title=" Tasks"
            value={stats.tasks}
          />

          <Card
            color="#22c55e"
            title=" Completed"
            value={stats.completed}
          />

          <Card
            color="#f59e0b"
            title=" Notes"
            value={stats.notes}
          />

          <Card
            color="#7c3aed"
            title=" AI Chats"
            value={stats.ai}
          />
        </div>

    {/* Bottom Section */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          {/* Today's Goal */}

          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2 style={{ marginBottom: 20 }}>Today's Goals</h2>

            {todayGoals.length > 0 ? (
  todayGoals.map((goal) => (
    <div
      key={goal.id}
      style={{
        background: "#f8fafc",
        padding: "12px",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
       {goal.title}
    </div>
  ))
) : (
  <p>No pending tasks for today </p>
)}

           
            <div
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 15,
                background: "#eff6ff",
                color: "#2563eb",
                fontWeight: "bold",
              }}
            >
             Estimated Study Time: {todayGoals.length} Hour{todayGoals.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Quick Actions */}

          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            }}
          >
            <h2 style={{ marginBottom: 20 }}>⚡ Quick Actions</h2>

            <ActionCard
              title=" Manage Tasks"
              link="/tasks"
              color="#2563eb"
            />

            <ActionCard
              title=" Open Notes"
              link="/notes"
              color="#22c55e"
            />

            <ActionCard
              title=" AI Assistant"
              link="/ai"
              color="#7c3aed"
            />
          </div>
        </div>

        {/* Learning Insights */}

        <div
          style={{
            marginTop: 30,
            background: "#fff",
            borderRadius: "24px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <h2>📈 Learning Insights</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 20,
              marginTop: 20,
            }}
          >
            <Insight
              title=" Study Streak"
              value="7 Days"
            />

            <Insight
              title=" Productivity"
              value={`${progress}%`}
            />

            <Insight
              title=" Notes Created"
              value={stats.notes}
            />

            <Insight
              title=" Completed Tasks"
              value={stats.completed}
            />
          </div>

          <div
            style={{
              marginTop: 25,
              background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              color: "#fff",
              borderRadius: 18,
              padding: 20,
            }}
          >
            <h3> Motivation</h3>

            <p style={{ marginTop: 10 }}>
              Small progress every day leads to big success.
              Stay consistent and keep learning!
            </p>
          </div>
        </div>

      </div>
    </>
  );
}

/* ---------- Components ---------- */

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 22,
        padding: 25,
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
        borderTop: `6px solid ${color}`,
        transition: ".3s",
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          color,
          fontSize: 42,
          marginTop: 15,
        }}
      >
        {value}
      </h1>
    </div>
  );
}

function ActionCard({ title, link, color }) {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div
        style={{
          marginTop: 15,
          background: color,
          color: "#fff",
          padding: 18,
          borderRadius: 16,
          fontWeight: "bold",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        {title}
      </div>
    </Link>
  );
}

function Insight({ title, value }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        borderRadius: 18,
        padding: 20,
        textAlign: "center",
      }}
    >
      <p style={{ color: "#64748b" }}>{title}</p>

      <h2
        style={{
          color: "#2563eb",
          marginTop: 10,
        }}
      >
        {value}
      </h2>
    </div>
  );
}