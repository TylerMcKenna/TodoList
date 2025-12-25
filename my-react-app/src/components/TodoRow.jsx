export default function TodoRow({ todo }) {
    //❌
    const isComplete = todo.isComplete
                        ? "✅"
                        : "❌";

    return (
        <tr>
            <td>{isComplete}</td>
            <td>{todo.name}</td>
        </tr>
    );
}