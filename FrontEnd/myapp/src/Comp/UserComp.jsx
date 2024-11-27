import { useEffect, useState } from "react";
import OtherDataComp from "./OtherDataComp";

export default function UserComp(props) {
  const { user, update, deleted, getSelectedUser, selectedUser } = props;
  const [showOtherData, setShowOtherData] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address || {}); // Store the address state
  const [isAllTaskCompleted, setIsAllTestCompleted] = useState(false);

  useEffect(() => {
    const allTaskCompleted = user.todos?.every((todo) => todo.completed === true);
    setIsAllTestCompleted(allTaskCompleted);
    console.log("isAllCompleted:", allTaskCompleted);
  }, [user.todos]); // Now watching for changes in user.todos

  function openData() {
    setShowOtherData(!showOtherData);
  }

  function handleUpdate() {
    const updatedUser = { ...user, name, email, address }; // Include updated address in the user object
    update(updatedUser);
  }

  function handleDelete() {
    deleted(user.id);
  }

  // Callback function to receive updated address from OtherDataComp
  function handleAddressUpdate(newAddress) {
    setAddress(newAddress);
  }

  function updateSelectedUser() {
    getSelectedUser(user.id); // Call parent function with user ID
  }

  const borderColor = isAllTaskCompleted ? "black" : "red";
  const backgroundColor = (selectedUser?.id === user.id) ? "orange" : "white"; // Change background to orange if selected

  return (
    <div style={{
      border: `1px solid ${borderColor}`,
      padding: "10px",
      marginBottom: "10px",
      backgroundColor: backgroundColor
    }}>
      <label onClick={updateSelectedUser} style={{ cursor: "pointer" }}>ID: {user.id}</label>
      <br />
      Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <br />

        
       {/* Flex container for buttons */}
       <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: showOtherData ? "0" : "10px"
      }}>
        {/* Left-aligned "Other Data" button */}
        <button onClick={openData}>
          Other Data
        </button>

        {/* Right-aligned "Update" and "Delete" buttons, only if OtherDataComp is not open */}
        {!showOtherData && (
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="buttonStyle" onClick={handleUpdate}>
              Update
            </button>
            <button className="buttonStyle" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Conditionally render OtherDataComp and buttons */}
      {showOtherData && (
        <div style={{ marginBottom: "20px" , marginTop: "20px"}}>
          {/* Render OtherDataComp */}
          <OtherDataComp user={user} updateAddress={handleAddressUpdate} />
          {/* Buttons after OtherDataComp, aligned to the right */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <button className="buttonStyle" onClick={handleUpdate}>
              Update
            </button>
            <button className="buttonStyle" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}