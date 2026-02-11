import express from "express";
import Todo from "../models/Todo.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// All /api/todo routes require a valid JWT
router.use(auth);

// GET /api/todo
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    return res.json(todos);
  } catch (err) {
    console.error("Get todos error:", err);
    return res.status(500).json({ message: "Failed to load todos" });
  }
});

// POST /api/todo
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }

    const todo = await Todo.create({
      text: text.trim(),
      userId: req.userId,
    });

    return res.status(201).json(todo);
  } catch (err) {
    console.error("Create todo error:", err);
    return res.status(500).json({ message: "Failed to create todo" });
  }
});

// PATCH /api/todo/:id/complete  -> mark a todo as completed
router.patch("/:id/complete", async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { completed: true },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.json(todo);
  } catch (err) {
    console.error("Complete todo error:", err);
    return res.status(500).json({ message: "Failed to complete todo" });
  }
});

// DELETE /api/todo/:id -> delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Todo.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Delete todo error:", err);
    return res.status(500).json({ message: "Failed to delete todo" });
  }
});

export default router;
