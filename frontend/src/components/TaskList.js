import React from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = ({ tasks, onDelete, onUpdate, onToggleComplete }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          handleDelete={onDelete}
          handleUpdate={onUpdate}
          handleToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;
