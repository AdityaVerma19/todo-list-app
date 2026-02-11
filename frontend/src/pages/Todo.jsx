import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Todo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const token = localStorage.getItem("token");

  const loadTodos = async () => {
    if (!token) {
      setTodos([]);
      return;
    }

    const res = await axios.get(`${API_BASE}/api/todo`, {
      headers: { Authorization: token },
    });
    setTodos(res.data ?? []);
  };

  const addTodo = async () => {
    const trimmed = text.trim();

    if (!trimmed) return;
    if (!token) {
      alert("Please login first (token missing).");
      return;
    }

    try {
      setIsAdding(true);
      const res = await axios.post(
        `${API_BASE}/api/todo`,
        { text: trimmed },
        { headers: { Authorization: token } }
      );

      // Update UI immediately (no need to refetch)
      if (res?.data?._id) {
        setTodos(prev => [res.data, ...prev]);
      } else {
        await loadTodos();
      }
      setText("");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add todo");
    } finally {
      setIsAdding(false);
    }
  };

  const finishTodo = async (id) => {
    if (!token) {
      alert("Please login first (token missing).");
      return;
    }

    try {
      const res = await axios.patch(
        `${API_BASE}/api/todo/${id}/complete`,
        {},
        { headers: { Authorization: token } }
      );

      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...res.data } : t))
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to mark todo as finished");
    }
  };

  const deleteTodo = async (id) => {
    if (!token) {
      alert("Please login first (token missing).");
      return;
    }

    try {
      await axios.delete(`${API_BASE}/api/todo/${id}`, {
        headers: { Authorization: token },
      });

      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete todo");
    }
  };

  useEffect(() => {
    loadTodos().catch(() => {
      // keep UI stable on initial load error
      setTodos([]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <h1>My Todos</h1>

      <input
        value={text}
        placeholder="Add a new task..."
        onChange={e => setText(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") addTodo();
        }}
      />
      <button 
      style={{ marginTop: "10px" }}
      onClick={addTodo} disabled={isAdding || !text.trim()}>
        {isAdding ? "Adding..." : "Add"}
      </button>

      <ul>
        {todos.map(t => (
          <li
            key={t._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                opacity: t.completed ? 0.6 : 1,
                flex: 1,
              }}
            >
              {t.text}
            </span>
            <button
              onClick={() => finishTodo(t._id)}
              disabled={t.completed}
              style={{
                width: "auto",
                minWidth: "80px",
                marginTop: 0,
                marginLeft: 8,
              }}
            >
              {t.completed ? "Done" : "Finish"}
            </button>
            <button
              onClick={() => deleteTodo(t._id)}
              style={{
                width: "auto",
                minWidth: "80px",
                marginTop: 0,
                marginLeft: 8,
                background: "linear-gradient(90deg, #ff4d6d, #ff6b81)",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
