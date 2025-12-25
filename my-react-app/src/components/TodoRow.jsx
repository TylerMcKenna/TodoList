export default function TodoRow({ todo }) {
    const isComplete = todo.isComplete
                        ? true
                        : false;

    // TEMP READONLY
    return (
        <tr>
            <td>
                <input type="checkbox" checked={isComplete} readOnly/>
            </td>
            <td>{todo.name}</td>
        </tr>
    );
}