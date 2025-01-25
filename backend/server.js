const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Dummy data (Replace with database later if needed)
let tasks = [
  { id: 1, name: "Task 1", description: "Description 1", completed: false },
  { id: 2, name: "Task 2", description: "Description 2", completed: true },
];

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Task Management Backend Server!");
});

// Get All Tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Create a New Task
app.post("/api/tasks", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  const newTask = { id: tasks.length + 1, name, description, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update an Existing Task
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const taskIndex = tasks.findIndex((t) => t.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  if (!name || !description) {
    return res.status(400).json({ error: "Name and description are required." });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], name, description };
  res.status(200).json(tasks[taskIndex]);
});

// Delete a Task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  tasks = tasks.filter((t) => t.id != id);
  res.status(204).send();
});

// Toggle Task Completion Status
app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  res.status(200).json(tasks[taskIndex]);
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
