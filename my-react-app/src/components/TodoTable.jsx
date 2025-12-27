import TodoRow from "./TodoRow.jsx"

export default function TodoTable({ todos, setTodos, filterText }) {
    const rows = [];
    todos.forEach((todo) => {
        if (
            todo.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) { return; }

        rows.push(
            <TodoRow 
                key={todo.id}
                todo={todo} 
                setTodos={setTodos}
            />
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Completed</th>
                    <th>Task Name</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}