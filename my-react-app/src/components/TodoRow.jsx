import { useEffect } from "react";

export default function TodoRow({ todo, setTodos }) {
    const isComplete = todo.isComplete
                        ? true
                        : false;


    async function switchStatus() {
        const updatedTodo = {
            ...todo, 
            isComplete: !todo.isComplete
        };

        // Optimistically update frontend
        setTodos(todos => 
            todos.map(currTodo =>
                currTodo.id === todo.id 
                    ? updatedTodo
                    : currTodo
            )
        );
        // Attempt persist
        try {
            const response = await fetch(`http://127.0.0.1:5105/todoitems/${todo.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(updatedTodo)
                }
            );
        } 
        // Roll back on failture
        catch {
            setTodos(todos => 
                todos.map(currTodo => 
                    currTodo.id === todo.id
                        ? todo
                        : currTodo
                )
            );
        }

    }

    return (
        <tr>
            <td>
                <input 
                    type="checkbox" 
                    checked={isComplete} 
                    onChange={switchStatus}
                />
            </td>
            <td>{todo.name}</td>
        </tr>
    );
}