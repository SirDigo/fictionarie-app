import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

// import Profile from "./Profile";
import Post from "./Post"
import PostForm from "./PostForm"

function Home({ user, setUser }){

    const [posts, setPosts] = useState([])
    const [prompt, setPrompt] = useState({})


    useEffect(() => {
        //Fetching posts
        fetch("/posts")
        .then((r) => r.json())
        .then(data => setPosts(data))

        fetch("/last_promt")
        .then((r) => r.json())
        .then(data => setPrompt(data))
    }, []);

    function logout(){
        fetch("/logout", {
            method: "DELETE",
        })
        .then(setUser(null))
    }

    return (
        <div>
            {
                user ?
                <nav>
                    <a href="/My_profile">My Profile</a>
                    <button onClick={logout}>Logout</button>
                    <a href="/write_story">Write Story</a>
                </nav>
                :
                <nav>
                    <a href="/login">Login</a>
                    <a href="/signup">Signup</a>
                </nav>
            }
            <h1>{prompt.body}</h1>
            <PostForm prompt={prompt} user={user}/>
            {posts.map((post) => <Post key={uuid()} post={post}/>)}
        </div>
    )
}

export default Home;