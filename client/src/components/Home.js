import React, { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

// import Profile from "./Profile";
import Post from "./Post"
import PostForm from "./PostForm"

function Home({ user, setUser }){

    const [posts, setPosts] = useState([])
    const [prompt, setPrompt] = useState({})

    // month/day/year
    const current = new Date();
    const date = `${current.getMonth()+1}${current.getDate()}${current.getFullYear()}`;

    useEffect(() => {
        //Fetching posts
        fetch("/posts")
        .then((r) => r.json())
        .then(data => setPosts(data))

        fetch(`/prompts/${date}`)
        .then((r) => r.json())
        .then(data => setPrompt(data))
    }, []);

    function logout(){
        fetch("/logout", {
            method: "DELETE",
        })
        .then(setUser(null))
    }

    const postCards = posts.map((post) => <Post key={uuid()} post={post} user={user} className="col-4"/>)

    function splitArray(arr, num){
        const x = arr.filter((element, index) => {
          return index % 3 - num === 0;
        })
        return x
      }
  
      const postList1 = splitArray(postCards, 2)
      const postList2 = splitArray(postCards, 1)
      const postList3 = splitArray(postCards, 0)


    return (
        <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Fictionarie_</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href={ user ? "/my_profile" : "/login"}>{user ? "My Profile" : "Login"}</Nav.Link>
                    {user ?
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                        :
                        <Nav.Link href="/signup">Signup</Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>
        <Container>
            <br></br>
            <Row>
                <Col><h4>"{prompt.body}"</h4></Col>
                <Col><PostForm prompt={prompt} user={user} setPosts={setPosts} posts={posts} /></Col>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Row>
                <Col>{postList3}</Col>
                <Col>{postList2}</Col>
                <Col>{postList1}</Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;