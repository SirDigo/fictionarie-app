import React, { useState } from "react";
import { v4 as uuid } from 'uuid';
import { Button } from "react-bootstrap";

import ProfileImage from "../download.png"
import Post from "./Post";
import EditProfile from "./EditProfile";

function MyProfile({ user }){

    const [editor, setEditor] = useState(false)

    return (
        <div>
            <p>Hello {user.username}</p>
            <img src={user.image_link ? user.image_link : ProfileImage} alt="User"/>
            <Button varient="primary" onClick={() => setEditor(true)}>Edit Profile</Button>
            <EditProfile user={user} show={editor} onHide={() => setEditor(false)} />
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