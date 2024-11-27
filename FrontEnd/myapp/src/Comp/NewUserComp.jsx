import { useState } from "react";

export default function NewUserComp(props) {
  const { onCancel, onAddUser } = props; // props for handling cancel and add actions
  const [user, setUser] = useState({ id: "", name: "", email: "" });

  // Handle adding a new user
  function handleAddUser() {
    console.log("handleAddUser");
    // Assuming an id is automatically generated or handled externally
    onAddUser({ ...user, id: Date.now() }); // Simulate a unique id with Date.now()
  }

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column", // Align content vertically
      marginBottom: "10px",
    }}
  >
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <label>Add new User</label>
      </div>
        {/* Container for the inputs and buttons */}
      <div
        style={{
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid purple",
        }}
      >
        <div>
          <label>Name:</label>&nbsp;&nbsp;
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <br />
        </div>
        <div>
          <label>Email:</label>&nbsp;&nbsp;
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <br />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            margin: "10px",
          }}
        >
          <button className="buttonStyle" onClick={onCancel}>
            Cancel
          </button>
          <button className="buttonStyle" onClick={handleAddUser}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}