import { useState } from "react";

export default function PostComp(props) {
    const { post } = props;

    return (
        <div className="todo-container">
            <div className="todo-item">
                <label className="todo-label">Title:</label>
                <span>{post.title}</span>
            </div>
            <div className="todo-item">
                <label className="todo-label">Body:</label>
                <span>{post.body}</span>
            </div>
        </div>
    );
}