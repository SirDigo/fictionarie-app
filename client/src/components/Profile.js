import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import { Container, Row, Col, Image } from "react-bootstrap";

import ProfileImage from "../download.png"
import Post from "./Post";

function Profile(){
    const { id } = useParams()
    const [thisUser, setThisUser] = useState({})
    const [thisUsersPosts, setThisUsersPosts] = useState([])

    // console.log(id)

    useEffect(() => {
        fetch(`/users/${id}`)
        .then((res) => res.json())
        .then((userData) => {
            setThisUser(userData)
            fetchPosts(userData.id)
        })
    }, [id])

    //Fetching after user is fetched
    function fetchPosts(userId){
        fetch(`/users/${userId}/posts`)
        .then((r) => r.json())
        .then(data => setThisUsersPosts(data))
    }

    // thisUser.posts.map(post => console.log(post))
    console.log(thisUsersPosts)
    return (
        <Container>
            <Row style={{marginTop: "100px", marginBottom: "150px"}}>
                <Col >
                    <h2>{thisUser.username}</h2>
                    <Image roundedCircle src={ProfileImage} alt="User" /> 
                </Col> 
                <Col style={{marginTop: "100px"}}>
                    <h2>{thisUser.bio ? thisUser.bio : "404 bio not found"}</h2>
                </Col>
            </Row>
            <Row md={3} className="g-4">
                {thisUsersPosts.map((post) => <Post key={uuid()} post={post} user={thisUser}/>)}
            </Row>

        </Container>
    )
}

export default Profile;