import { Link } from "react-router-dom";
import CategoryFilter from "../Components/CategoryFilter/CategoryFilter.jsx";
import SortBar from "../Components/SortBar/SortBar.jsx";
import TaskList from "../Components/TaskList/TaskList.jsx";
import Cat from "../Components/CatAssisant/Cat.jsx";

function HomePage() {
  return (
    <>
      <section className="control-bar">
        <CategoryFilter />
        <SortBar />
      </section>

      <div className="page-actions">
        <Link to="/create" className="primary-link-btn">
          + 添加任务
        </Link>
      </div>

      <TaskList />

      <Cat />
    </>
  );
}

export default HomePage;
