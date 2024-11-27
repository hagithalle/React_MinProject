import { useState, useEffect } from "react";
import { getData } from './utils';
import './styles.css';
import UsersComp from "./Comp/UsersComp";
import TodosComp from "./Comp/TodosComp";
import PostsComp from "./Comp/PostsComp";
import NewPostComp from "./Comp/NewPostComp";
import NewUserComp from "./Comp/NewUserComp";
import NewTodosComp from "./Comp/NewTodosComp";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

function App() {
  // State to store users data
  const [users, setUsers] = useState([]);
  
  // State to store the selected user
  const [selectedUser, setSelectedUser] = useState();
  
  // State flags to control showing different components
  const [showAddUser, setShowAddUser] = useState(false);
  const [showTodos, setShowTodos] = useState(false);
  const [showPosts, setShowPosts] = useState(false);

  // Function to get and set the selected user by ID
  function getSelectedUser(id) {
    const selectedUser = users.find(user => user.id === id);
    console.log(selectedUser);  // Log the selected user for verification
    setSelectedUser(selectedUser); // Store selected user in state
    setShowTodos(true);  // Show todos component when a user is selected
    setShowPosts(true);  // Show posts component when a user is selected
  }

  // Function to update a user in the state
  function update(userUpdate) {
    const updatedUsers = users.map(user =>
      user.id === userUpdate.id ? userUpdate : user
    );
    setUsers(updatedUsers);
    alert(`User: ${userUpdate.id} was updated`);
  }

  // Function to delete a user from the state
  function deleted(userId) {
    setUsers(users.filter(user => user.id !== userId));
    alert(`User: ${userId} was deleted`);
  }

  // Function to add a new user to the state
  function addNewUser(newUser) {
    setUsers([...users, newUser]);
    setShowAddUser(false);  // Hide the "Add User" component after adding
  }

  // Function to cancel the "Add User" component
  function cancelNewUserComp() {
    setShowAddUser(false);
  }

  // Function to add a new todo for the selected user
  function addNewTodoForUser(userId, newTodo) {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          todos: [...user.todos, newTodo]  // Append the new todo to the user's todos
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSelectedUser(updatedUsers.find(user => user.id === userId));  // Update selected user with new todos
  }

  // Function to add a new post for the selected user
  function addNewPostForUser(userId, newPost) {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          posts: [...user.posts, newPost]  // Append the new post to the user's posts
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSelectedUser(updatedUsers.find(user => user.id === userId));  // Update selected user with new posts
  }

  // Function to fetch data from external APIs and set the users state
  const fetchData = async () => {
     try {
    // Fetch users, todos, and posts concurrently
    const [users, todos, posts] = await Promise.all([
      getData(USERS_URL),
      getData(TODOS_URL),
      getData(POSTS_URL)
    ]);

    // Merge todos and posts with the corresponding users
    const updatedUsers = users.map(user => {
      const userTodos = todos.filter(todo => todo.userId === user.id);
      const userPosts = posts.filter(post => post.userId === user.id);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        todos: userTodos,
        posts: userPosts
      };
    });

      // Update the state with users and their related todos/posts
      setUsers(updatedUsers);

      console.log("Fetched and updated users: ", updatedUsers);  // Log final user data for debugging
  
    } catch (error) {
      console.error("Error fetching data: ", error);  // Handle and log any potential errors
      alert("Failed to fetch data. Please try again later.");
    }
  };

  // Function to handle adding a new user (opens the "Add User" component)
  function handlerAddUser() {
    console.log("handlerAddUser");
    setShowAddUser(true);
    setSelectedUser(null);  // Clear selected user when adding a new user
  }

  function onUpdateTodos(userId, updatedTodos){
    // Logic to update the selected user's todos
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, todos: updatedTodos };
      }
      return user;
    });
    setUsers(updatedUsers);
    setSelectedUser(updatedUsers.find(user => user.id === userId)); // Update the selected user in the state
  } 


  // Fetch data when the component first mounts
  useEffect(() => {
    fetchData();
  }, []);  // Empty dependency array ensures this runs only once on mount

  // Log users state whenever it changes
  useEffect(() => {
    console.log("Users updated: ", users);
  }, [users]);

  // Render loading text if no users have been fetched yet
  if (users.length === 0) return <div>Loading...</div>;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* User list component */}
      <div className="rounded-border" style={{ width: "40%" }}>
        <UsersComp 
          users={users} 
          update={update} 
          deleted={deleted} 
          getSelectedUser={getSelectedUser} 
          selectedUser={selectedUser} 
          adduser={handlerAddUser} 
        />
      </div>

      {/* Todos and posts, plus new user component */}
      <div style={{ width: "30%", marginTop: "50px", marginRight: "150px", textAlign: "center" }}>
        {showTodos && selectedUser && (
          <TodosComp 
          user={selectedUser} 
          onAddTodo={addNewTodoForUser} 
          onUpdateTodos={onUpdateTodos} 
        />
        )}
        <br />
        <br />
        {showPosts && selectedUser && (
          <PostsComp user={selectedUser} onAddPost={addNewPostForUser} />
        )}
        {showAddUser && (
          <NewUserComp onCancel={cancelNewUserComp} onAddUser={addNewUser} />
        )}
      </div>
    </div>
  );
}

export default App;