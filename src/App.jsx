import CategoryFilter from './Components/CategoryFilter/CategoryFilter.jsx';
import SortBar from './Components/SortBar/SortBar.jsx';
import TaskList from './Components/TaskList/TaskList.jsx';
import AddTask from './Components/AddTask/AddTask.jsx';
import Cat from './Components/CatAssisant/Cat.jsx';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">TodoFlow</h1>
      </header>

      <CategoryFilter />
      <SortBar />

      <TaskList />

      <AddTask />

      <Cat />
    </div>
  );
}

export default App;

