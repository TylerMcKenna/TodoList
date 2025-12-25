import SearchBar from "./SearchBar.jsx";
import TodoTable from "./TodoTable.jsx";
import { useState } from "react";

export default function FilterableTodoTable({ todos }) {
    const [filterText, setFilterText] = useState("");

    return (
        <div>
            <SearchBar 
                filterText={filterText} 
                onFilterTextChange={setFilterText} 
            />
            <TodoTable 
                todos={todos} 
                filterText={filterText} 
            />
        </div>
    );
}