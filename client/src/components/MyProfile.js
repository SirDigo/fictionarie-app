import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import ProfileImage from "../download.png"
import Post from "./Post";


function MyProfile({ user }){

    const [editor, setEditor] = useState(false)

    return (
        <div>
            <nav>
                <a href="/">Home</a>
                <a href="/edit_profile">Edit Profile</a>
            </nav>
            <p>Hello {user.username}</p>
            <img src={ProfileImage} alt="User"/>
            <p>
                {user.bio ? user.bio : "404 bio not found"}
            </p>
            {user.posts.map((post) => 
                <div key={uuid()}>
                    <h1>{post.title}</h1>
                    <h4>{post.body}</h4>
                </div>
            )}

        </div>
    )
}

export default MyProfile;