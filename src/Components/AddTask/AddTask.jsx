import { useState } from "react";
import { useTasks } from "../../Context/TasksContext";
import "./AddTask.css";

const defaultForm = {
  title: "",
  description: "",
  category: "work",
  priority: "medium",
  deadline: "",
};

function AddTask({ onSuccess }) {
  const { addTask } = useTasks();
  const [form, setForm] = useState({ ...defaultForm });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const title = form.title.trim();
    if (!title) return;

    addTask({
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title,
      description: form.description.trim(),
      category: form.category,
      priority: form.priority,
      deadline: form.deadline || null,
      createdAt: new Date().toISOString(),
      completed: false,
    });

    setForm({ ...defaultForm });
    if (typeof onSuccess === "function") {
      onSuccess();
    }
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <div className="add-task__row">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="输入新的任务..."
          className="task-input"
          required
        />

        <button type="submit" className="add-btn">
          添加任务
        </button>
      </div>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="描述（可选）"
        className="task-textarea"
        rows={2}
      />

      <div className="add-task__meta">
        <label>
          分类
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="work">工作</option>
            <option value="study">学习</option>
            <option value="life">生活</option>
          </select>
        </label>

        <label>
          优先级
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
        </label>

        <label>
          截止时间
          <input
            type="datetime-local"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
          />
        </label>
      </div>
    </form>
  );
}

export default AddTask;
