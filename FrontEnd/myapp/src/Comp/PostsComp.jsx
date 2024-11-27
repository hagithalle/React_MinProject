import { useState } from "react";
import NewPostComp from "./NewPostComp";
import PostComp from "./PostComp";

export default function PostsComp(props) {
    const { user, onAddPost } = props;
    console.log("posts:", user);
    const [showNewPostComp, setShowNewPostComp] = useState(false);
    const [posts, setPosts] = useState(user.posts);
    const [titleComp, setTitleComp] = useState("Posts");

    function addNewPost() {
        setShowNewPostComp(true);
        setTitleComp("New Post");
    }

    function cancelNewPostComp() {
        setShowNewPostComp(false); // Switch back to the list view
        setTitleComp("Posts");
    }

    function handlerAddNewPost(newPost) {
        setPosts([...posts, newPost]); // Add the new Post to the list
        onAddPost(user.id, newPost); // Call the function to update the user in the parent
        setShowNewPostComp(false); // Switch back to the list view
        setTitleComp("Posts");
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
                    <label>{titleComp} - User {user.id}</label>
                </div>
                <div style={{ float: "left" }}>
                    <button className="buttonStyle" onClick={addNewPost}>
                        Add
                    </button>
                </div>
            </div>

            {/* Conditionally render NewPostComp or the list of posts */}
            {showNewPostComp ? (
                <NewPostComp onCancel={cancelNewPostComp} onAddPost={handlerAddNewPost} />
            ) : (
                <div style={{ border: "1px solid black", padding: "20px" }}>
                    {posts.map((post) => (
                        <PostComp key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}