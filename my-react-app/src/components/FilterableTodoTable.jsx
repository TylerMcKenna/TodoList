import SearchBar from "./SearchBar.jsx";
import TodoTable from "./TodoTable.jsx";
import { useState, useEffect } from "react";

export default function FilterableTodoTable() {
    const [filterText, setFilterText] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function loadTodos() {
            try {
                const response = await fetch("http://127.0.0.1:5105/todoitems");
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error(error.message);
            }
        }

        loadTodos();
    }, [])

    return (
        <div>
            <SearchBar 
                filterText={filterText} 
                onFilterTextChange={setFilterText} 
            />
            <TodoTable 
                todos={todos} 
                setTodos={setTodos}
                filterText={filterText} 
            />
        </div>
    );
}