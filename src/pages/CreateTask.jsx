import { Link, useNavigate } from "react-router-dom";
import AddTask from "../Components/AddTask/AddTask.jsx";

function CreateTaskPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/app");
  };

  return (
    <div className="create-page">
      <div className="create-header">
        <Link to="/app" className="back-link">
          ← 返回任务列表
        </Link>
        <h2>创建新的待办事项</h2>
      </div>

      <AddTask onSuccess={handleSuccess} />
    </div>
  );
}

export default CreateTaskPage;
