import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

// import Profile from "./Profile";
import Post from "./Post"

function Home({ user }){

    const [posts, setPosts] = useState([])

    useEffect(() => {
        //Fetching posts
        fetch("/posts")
        .then((r) => r.json())
        .then(data => setPosts(data))
    }, []);

    function logout(){
        fetch("/logout", {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => console.log(data))
    }

    return (
        <div>
            {
                user ?
                <nav>
                    <a href="/profile">Profile</a>
                    <button onClick={logout}>logout</button>
                </nav>
                :
                <nav>
                    <a href="/login">Login</a>
                    <a href="/signup">Signup</a>
                </nav>
            }
            {posts.map((post) => <Post key={uuid()} post={post}/>)}
        </div>
    )
}

export default Home;