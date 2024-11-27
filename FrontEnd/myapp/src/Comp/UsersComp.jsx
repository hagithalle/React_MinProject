import UserComp from "./UserComp";
import { useState, useEffect } from "react";

export default function UsersComp(props) {
  const { users, update, deleted, getSelectedUser ,selectedUser, adduser} = props;
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
 


  //Filter users based on search query
  const filteredUsers = users.filter(user => {
    return searchQuery === "" || 
           user.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
           user.email.toLowerCase().startsWith(searchQuery.toLowerCase());
  });
return(
  <div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <label>Search:</label>
          <input
            type="text"
            style={{ width: "200px", marginLeft: "10px" }}
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value) /* Update search query */}
          />
        </div>
        <div style={{ flexGrow: 0 }}>
          <button className="buttonStyle" onClick={adduser}> Add</button>
        </div>
      </div>
      <div>
        {filteredUsers.map((user) => (
          <UserComp
            key={user.id}
            user={user}
            update={update}
            deleted={deleted}
            getSelectedUser={getSelectedUser}
            selectedUser={selectedUser}
          />
        ))}
      </div>
    </div>
  );
}