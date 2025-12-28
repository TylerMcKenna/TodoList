export default function CreateTodo({ todos, setTodos }) {
    async function handleSubmit(event) {
        event.preventDefault(); 

        const newTodo = {
            "name": event.target.elements.taskName.value,
            "isComplete": false,
        }

        
        try {
            const response = await fetch("http://localhost:5105/todoitems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTodo)
            });
            
            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const createdTodo = await response.json();

            console.log(createdTodo)

            setTodos(todos => [...todos, createdTodo]);
            event.target.reset;
        } catch(error) {
            console.error(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="textbox" 
                placeholder="Task Name..." 
                name="taskName"
                required
            />
            <button type="submit">Submit</button>
        </form>
    )
}