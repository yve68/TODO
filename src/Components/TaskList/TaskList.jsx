import { useMemo } from "react";
import { useTasks } from "../../Context/TasksContext";
import { getDeadlineTimestamp } from "../../utils/dateHelpers";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";

const priorityToScore = {
  high: 3,
  medium: 2,
  low: 1,
};

function TaskList() {
  const {
    tasks,
    filterCategory,
    sortBy,
    toggleTask,
    deleteTask,
  } = useTasks();

  const visibleTasks = useMemo(() => {
    const filtered =
      filterCategory === "all"
        ? tasks
        : tasks.filter((task) => task.category === filterCategory);

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "createdAt") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === "deadline") {
        const aDeadline = getDeadlineTimestamp(a.deadline) ?? Infinity;
        const bDeadline = getDeadlineTimestamp(b.deadline) ?? Infinity;
        return aDeadline - bDeadline;
      }
      return (priorityToScore[b.priority] || 0) - (priorityToScore[a.priority] || 0);
    });

    return sorted;
  }, [tasks, filterCategory, sortBy]);

  if (!visibleTasks.length) {
    return <p className="empty-state">暂时没有任务，点击上方添加一个吧s</p>;
  }

  return (
    <div className="task-list">
      {visibleTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => toggleTask(task.id)}
          onDelete={() => deleteTask(task.id)}
        />
      ))}
    </div>
  );
}

export default TaskList;
