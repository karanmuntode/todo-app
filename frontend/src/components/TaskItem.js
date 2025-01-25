import React, { useState } from "react";
import "./TaskItem.css";

const TaskItem = ({ task, handleDelete, handleUpdate, handleToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    name: task.name,
    description: task.description,
  });

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    if (updatedTask.name.trim() && updatedTask.description.trim()) {
      handleUpdate(task.id, updatedTask);
      setIsEditing(false);
    } else {
      alert("Task name and description cannot be empty!");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUpdatedTask({ name: task.name, description: task.description });
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={updatedTask.name}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, name: e.target.value })
            }
          />
          <textarea
            value={updatedTask.description}
            onChange={(e) =>
              setUpdatedTask({ ...updatedTask, description: e.target.value })
            }
          ></textarea>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
        </div>
      )}
      <button onClick={() => handleToggleComplete(task.id)}>
        {task.completed ? "Mark as Pending" : "Mark as Complete"}
      </button>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
