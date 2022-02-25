import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

// import Profile from "./Profile";
import Post from "./Post"

function Home(){

    const [posts, setPosts] = useState([])

    useEffect(() => {
        //Fetching posts
        fetch("/posts")
        .then((r) => r.json())
        .then(data => setPosts(data))
    }, []);

    return (
        <div>
            {posts.map((post) => <Post key={uuid()} post={post}/>)}
        </div>
    )
}

export default Home;