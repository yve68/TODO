import { useTasks } from "../../Context/TasksContext";
import "./CategoryFilter.css";

const CATEGORY_OPTIONS = [
  { value: "all", label: "全部分类" },
  { value: "work", label: "工作" },
  { value: "study", label: "学习" },
  { value: "life", label: "生活" },
];

function CategoryFilter() {
  const { filterCategory, setCategory } = useTasks();

  return (
    <select
      className="filter-select"
      value={filterCategory}
      onChange={(event) => setCategory(event.target.value)}
    >
      {CATEGORY_OPTIONS.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
