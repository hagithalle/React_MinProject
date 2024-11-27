import { useState } from "react";

export default function NewPostComp(props) {
  const {onCancel, onAddPost } = props; // props for handling cancel and add actions
  const [post, setPost] = useState({ id: "", title: "",body: ""});

  // Handle adding a new ToDo
  function handleAddPost() {
    // Assuming an id is automatically generated or handled externally
    onAddPost({ ...post, id: Date.now() }); // Simulate a unique id with Date.now()
  }

  return (
      <div style={{ padding: "10px", 
                  marginBottom: "10px", 
                border: "1px solid purple" }}>
        <label>Title:</label>&nbsp;&nbsp;
        <input
          style={{color:"purple", marginBottom:"10px"}}
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
        /><br />
        <label>Body:</label>&nbsp;&nbsp;
        <input
          style={{color:"purple", marginBottom:"10px"}}
          type="text"
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        /><br />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", margin: "10px" }}>
          <button className="buttonStyle" onClick={onCancel}>Cancel</button>
          <button className="buttonStyle" onClick={handleAddPost}>Add</button>
        </div>
      </div>
  );
}