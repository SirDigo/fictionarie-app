import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { Container, Row, Col, Image } from "react-bootstrap";

import Post from "./Post"
import PostForm from "./PostForm"
import LoadingScreen from "./LoadingScreen";

import Logo from "../assets/Fictionarie.gif"

function Home({ user, userPosts }){

    const [posts, setPosts] = useState([])
    const [prompt, setPrompt] = useState({})

    //loading screen state
    const [isLoading, setIsLoading] = useState(false)

    // month/day/year
    const current = new Date();
    //fpr fetching
    const date = `${current.getMonth()+1}${current.getDate()}${current.getFullYear()}`;

    // const promptDate = new Date(prompt.created_at)

    //current user's posts
    // const userPosts = user ? user.posts : []

    useEffect(() => {
        //fetching daily prompt
        //${date}
        setIsLoading(true)
        fetch(`/daily_prompt/${date}`)
        .then((r) => r.json())
        .then(data => {
            setPrompt(data)
            fetchPosts(data.id)
        })
    }, [date]);

    //Fetching posts after fetching daily Prompt
    function fetchPosts(promptId){
        fetch(`/prompts/${promptId}/posts`)
        .then((r) => r.json())
        .then(data => { 
            setPosts(data);
            setIsLoading(false)
        })
    }

    //makes a date out of numbers
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

    return (
        <>

        { isLoading ? <LoadingScreen /> :
            <Container>
                <Row style={{marginTop: "100px", marginBottom: "100px", alignItems: "flex-start" }}>
                    <Col>
                        {/* <h1 className="d-flex justify-content-start" style={{color: "#FFB100"}}>Fictionarie_</h1> */}
                        <Image className="d-flex left" style={{marginLeft: "-10px"}} width="350px" src={Logo} alt="logo gif"/>
                        <h5 className="d-flex left italic" >A prompt a day to fual your creativity...</h5>
                        <br></br>
                        <h4 className="d-flex left" style={{color: "#FFB100"}}>{prompt.body}</h4>
                        <h5 className="d-flex left italic" >{current.toDateString().replace(/^\S+\s/,'')}</h5>
                    </Col>
                    <Col id="textCenter">
                        <h2 style={{color: "#FFB100"}}>Write Story Below!</h2>
                        <PostForm prompt={prompt} user={user} setPosts={setPosts} posts={posts} checkIfPosted={checkIfPosted}/>
                    </Col>
                </Row>
                <Row  className="g-5">
                    {posts.map((post) => <Post key={uuid()} post={post} user={user}/>)}
                </Row>
                <br></br>
            </Container>
        }
        </>
    )
}

export default Home;