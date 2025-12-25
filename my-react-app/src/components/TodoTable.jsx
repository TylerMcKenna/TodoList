import TodoRow from "./TodoRow.jsx"

export default function TodoTable({ todos }) {
    const rows = [];
    todos.forEach((todo) => {
        rows.push(
            <TodoRow todo={todo}/>
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