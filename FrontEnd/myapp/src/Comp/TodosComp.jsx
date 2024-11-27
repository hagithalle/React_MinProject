import { useState, useEffect } from "react";
import TodoComp from "./TodoComp";
import NewTodosComp from "./NewTodosComp";

export default function TodosComp(props) {
    const { user, onAddTodo, onUpdateTodos } = props;
    // State to manage whether to show the "New Todo" component
    const [showNewTodosComp, setShowNewTodosComp] = useState(false);
    // State to manage the list of todos, defaulting to an empty array if not provided
    const [todos, setTodos] = useState(user.todos || []); // Ensure todos is an array
    // State to manage the title of the component
    const [titleComp, setTitleComp] = useState("Todos");

    // Update todos state when user.todos changes
    useEffect(() => {
        setTodos(user.todos || []); // Update todos if the user changes
    }, [user.todos]);

    // Handler to show the "New Todo" component and update the title
    function addNewTodos() {
        setShowNewTodosComp(true);
        setTitleComp("New Todo");
    }

    // Handler to hide the "New Todo" component and reset the title
    function cancelNewTodosComp() {
        setShowNewTodosComp(false);
        setTitleComp("Todos");
    }

    // Handler to add a new todo to the list and notify the parent component
    function handlerAddNewTodo(newTodo) {
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos); // Update the local state with the new todo
        onAddTodo(user.id, newTodo); // Notify the parent component of the new todo
        setShowNewTodosComp(false); // Hide the "New Todo" component
        setTitleComp("Todos"); // Reset the title
    }

    // Handler to update the todos list and notify the parent component
    function handleTodoUpdate(updatedTodos) {
        setTodos(updatedTodos); // Update the local state with the updated todos
        onUpdateTodos(user.id, updatedTodos); // Notify the parent component with updated todos
    }

    return (
        <div>
            <div
                style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                }}>
                <div style={{ float: "right" }}>
                    {/* Display the title and user ID */}
                    <label>{titleComp} - User {user.id}</label>
                </div>
                <div style={{ float: "left" }}>
                    {/* Button to show the "New Todo" component */}
                    <button className="buttonStyle" onClick={addNewTodos}>
                        Add
                    </button>
                </div>
            </div>

            {/* Conditionally render NewTodosComp or the list of todos */}
            {showNewTodosComp ? (
                <NewTodosComp onCancel={cancelNewTodosComp} onAddTodo={handlerAddNewTodo} />
            ) : (
                <div style={{ border: "1px solid black", padding: "20px" }}>
                    {/* Check if there are todos to display */}
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <TodoComp key={todo.id} todo={todo} onUpdateTodo={handleTodoUpdate} todos={todos} />
                        ))
                    ) : (
                        <p>No todos available</p> // Message displayed when no todos are present
                    )}
                </div>
            )}
        </div>
    );
}