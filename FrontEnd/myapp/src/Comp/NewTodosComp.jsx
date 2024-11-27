import { useState } from "react";

export default function NewTodosComp(props) {
  const {onCancel, onAddTodo } = props; // props for handling cancel and add actions
  const [todo, setTodo] = useState({ id: "", title: "", completed: false });

  // Handle adding a new ToDo
  function handleAddTodo() {
    // Assuming an id is automatically generated or handled externally
    onAddTodo({ ...todo, id: Date.now() }); // Simulate a unique id with Date.now()
  }

  return (
      <div style={{ padding: "10px", 
                  marginBottom: "10px", 
                border: "1px solid purple" }}>
        <label>Title:</label>&nbsp;&nbsp;
        <input
          type="text"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        /><br />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", margin: "10px" }}>
          <button className="buttonStyle" onClick={onCancel}>Cancel</button>
          <button className="buttonStyle" onClick={handleAddTodo}>Add</button>
        </div>
      </div>
  );
}