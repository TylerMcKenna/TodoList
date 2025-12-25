import TodoRow from "./TodoRow.jsx"

export default function TodoTable({ todos, filterText }) {
    const rows = [];
    todos.forEach((todo) => {
        if (
            todo.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) { return; }

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