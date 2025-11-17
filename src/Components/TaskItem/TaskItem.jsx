import "./TaskItem.css";
import { formatDeadline } from "../../utils/dateHelpers";

const CATEGORY_LABEL = {
  work: "工作",
  study: "学习",
  life: "生活",
};

const PRIORITY_LABEL = {
  high: "高",
  medium: "中",
  low: "低",
};

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? "complete" : "incomplete"}`}>
      <div className="task-item__content">
        <div className="task-item__header">
          <span className="task-category">{CATEGORY_LABEL[task.category]}</span>
          <span className={`task-title ${task.completed ? "done" : ""}`}>
            {task.title}
          </span>
        </div>
        {task.description && (
          <p className="task-desc">{task.description}</p>
        )}
        <div className="task-meta">
          {task.deadline && (
            <span className="task-deadline">📅 {formatDeadline(task.deadline)}</span>
          )}
          <span className={`task-priority priority-${task.priority}`}>
            优先级：{PRIORITY_LABEL[task.priority]}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button type="button" onClick={onToggle}>
          {task.completed ? "↩ 未完成" : "✅ 完成"}
        </button>
        <button type="button" onClick={onDelete}>
          🗑 删除
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
