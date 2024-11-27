import { useState } from "react"

export default function TodoComp(props) {
    const {todo, onUpdateTodo, todos} = props
    const [isCompleted, setCompleted] = useState(todo.completed)

      // Handler to mark as completed
  const markAsCompleted = () => {
    setCompleted(true);
   // todo.completed = true
   const updatedTodos = todos.map(t => t.id === todo.id ? { ...t, completed: true } : t);
    onUpdateTodo(updatedTodos); // Notify the parent with the updated todos
  };

    return(
        <div style={{ border: `1px solid purple`, marginTop:"10px", display: "flex", flexDirection: "column", textAlign:"left" ,  padding: "10px", 
            marginBottom: "10px"}}>
            <div style={{marginBottom:"10px"}}>
              <label style={{color:"purple"}}>Title: </label> {todo.title}<br/>
            </div>
            <div>
                <label style={{color:"purple"}}>Completed: </label> {isCompleted ? "true": "false"}
                {!isCompleted && (<button  className="buttonStyle" onClick={markAsCompleted} style={{float:"right"}}>
                    Mark Completed
                </button>
            )}
            </div>
        </div>
    )

}