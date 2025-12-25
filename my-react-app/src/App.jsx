import './App.css'
import FilterableTodoTable from "./components/FilterableTodoTable.jsx";

const TODOS = [
    {"id": 0, "name": "Go to the store to get gifts", "isComplete": true},
    {"id": 1, "name": "Feel the Christmas vibes", "isComplete": true},
    {"id": 2, "name": "Open gifts on Christmas day", "isComplete": false}
];

export default function App() {
  return <FilterableTodoTable todos={TODOS} />
}
