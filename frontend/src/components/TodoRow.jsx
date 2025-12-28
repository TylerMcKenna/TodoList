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

        setTodos(todos => 
            todos.map(currTodo =>
                currTodo.id === todo.id 
                    ? updatedTodo
                    : currTodo
            )
        );

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
            
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);    
            }
        } catch(error) {
            setTodos(todos => 
                todos.map(currTodo => 
                    currTodo.id === todo.id
                        ? todo
                        : currTodo
                )
            );
            console.error(error.message);
        }

    }

    async function deleteTodo() {
        try{
            const response = await fetch(`http://127.0.0.1:5105/todoitems/${todo.id}`, {
                method: "DELETE"
            });
            
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            
            setTodos(todos => 
                todos.filter(currTodo => currTodo.id !== todo.id)
            );
        } catch(error) {
            console.error(error.message);
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
            <td>
                <input
                    type="button"
                    value="Delete"
                    onClick={deleteTodo}
                />
            </td>
        </tr>
    );
}