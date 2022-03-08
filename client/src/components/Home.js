import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { Container, Row, Col } from "react-bootstrap";

// import Profile from "./Profile";
import Post from "./Post"
import PostForm from "./PostForm"

function Home({ user, userPosts }){

    const [posts, setPosts] = useState([])
    const [prompt, setPrompt] = useState({})

    // month/day/year
    const current = new Date();
    //fpr fetching
    const date = `${current.getMonth()+1}${current.getDate()}${current.getFullYear()}`;

    // const promptDate = new Date(prompt.created_at)

    //current user's posts
    // const userPosts = user ? user.posts : []

    useEffect(() => {
        //fetching daily prompt
        fetch(`/daily_prompt/${date}`)
        .then((r) => r.json())
        .then(data => {
            setPrompt(data)
            fetchPosts(data.id)
        })
    }, []);

    function makeDate(date){
        const newDate = new Date( date )
        return newDate.toDateString()
    }


    //Checks if user has posted today(Actually checks last post.).
    function checkIfPosted(){
        if (user && userPosts.length > 0 && makeDate(userPosts[0] === current.toDateString())){
            return true;
        } else { 
            return false; 
        }
    }

    //Fetching posts after fetching daily Prompt
    function fetchPosts(promptId){
        fetch(`/prompts/${promptId}/posts`)
        .then((r) => r.json())
        .then(data => setPosts(data))
    }

    return (
        <>
        {/* <Navigationbar user={user} logout={logout} setUser={setUser}/> */}
        <Container>
            <Row style={{marginTop: "125px", marginBottom: "150px"}}>
                <Col>
                    <h1 className="d-flex justify-content-start" style={{color: "#FFB100"}}>Fictionarie_</h1>
                    <h5 className="d-flex justify-content-start">A prompt a day to fual your creativity...</h5>
                    <br></br>
                    <h4 className="d-flex justify-content-start" style={{color: "#B9B9B9"}}>{current.toDateString()}</h4>
                    <h4 className="d-flex justify-content-start" style={{color: "#B9B9B9"}}>{prompt.body}</h4>
                </Col>
                <Col><PostForm prompt={prompt} user={user} setPosts={setPosts} posts={posts} checkIfPosted={checkIfPosted}/></Col>
            </Row>
            <Row md={3} className="g-4">
                {posts.map((post) => <Post key={uuid()} post={post} user={user}/>)}
            </Row>
            <br></br>
        </Container>
        </>
    )
}

export default Home;