import { createContext, useContext, useReducer, useEffect } from "react";

// ----------------------
// Initial State
// ----------------------
const initialState = {
  tasks: [],
  filterCategory: "all",     // all / work / study / life
  sortBy: "createdAt",       // createdAt / deadline / priority
};

// ----------------------
// Reducer
// ----------------------
function tasksReducer(state, action) {
  switch (action.type) {
    case "LOAD_TASKS":
      return { ...state, tasks: action.payload };

    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "DELETE_TASK":
      return { 
        ...state, 
        tasks: state.tasks.filter(t => t.id !== action.payload) 
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case "SET_CATEGORY":
      return { ...state, filterCategory: action.payload };

    case "SET_SORT":
      return { ...state, sortBy: action.payload };

    default:
      return state;
  }
}


// Context
const TasksContext = createContext();


export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(tasksReducer, initialState);


  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      dispatch({ type: "LOAD_TASKS", payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);


  const addTask = (task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const deleteTask = (id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const toggleTask = (id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  };

  const setCategory = (category) => {
    dispatch({ type: "SET_CATEGORY", payload: category });
  };

  const setSort = (sortBy) => {
    dispatch({ type: "SET_SORT", payload: sortBy });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: state.tasks,
        filterCategory: state.filterCategory,
        sortBy: state.sortBy,
        addTask,
        deleteTask,
        toggleTask,
        setCategory,
        setSort,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}


export function useTasks() {
  return useContext(TasksContext);
}
