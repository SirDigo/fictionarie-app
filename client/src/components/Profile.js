import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from 'uuid';

import ProfileImage from "../download.png"
import Post from "./Post";

function Profile(){
    const { id } = useParams()
    const [thisUser, setThisUser] = useState({})

    // console.log(id)

    useEffect(() => {
        fetch(`/users/${id}`)
        .then((res) => res.json())
        .then((userData) => setThisUser(userData))
    }, [id])

    // thisUser.posts.map(post => console.log(post))

    return (
        <div>
            <nav>
                <a href="/">Home</a>
            </nav>
            <p>{thisUser.username}</p>
            <img src={ProfileImage} alt="User"/>
            <p>
                {thisUser.bio ? thisUser.bio : "404 bio not found"}
            </p>
            {thisUser.posts?.map((post) => 
                <div key={uuid()}>
                    <h1>{post.title}</h1>
                    <h4>{post.body}</h4>
                </div>
                )}

        </div>
    )
}

export default Profile;