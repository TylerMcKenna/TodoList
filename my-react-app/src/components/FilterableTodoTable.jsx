import SearchBar from "./SearchBar.jsx";
import TodoTable from "./TodoTable.jsx";

export default function FilterableTodoTable({ todos }) {
    return (
        <div>
            <SearchBar />
            <TodoTable todos={todos}/>
        </div>
    );
}