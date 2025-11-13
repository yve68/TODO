import { useTasks } from "../../Context/TasksContext";
import "./SortBar.css";

const SORT_OPTIONS = [
  { value: "createdAt", label: "按创建时间" },
  { value: "deadline", label: "按截止日期" },
  { value: "priority", label: "按优先级" },
];

function SortBar() {
  const { sortBy, setSort } = useTasks();

  return (
    <select
      className="sort-select"
      value={sortBy}
      onChange={(event) => setSort(event.target.value)}
    >
      {SORT_OPTIONS.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortBar;
