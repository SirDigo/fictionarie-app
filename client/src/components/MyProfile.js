import React, { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { Button, Container, Row, Col, Image } from "react-bootstrap";

import ProfileImage from "../download.png"
import Post from "./Post";
import EditProfile from "./EditProfile";
import LoadingScreen from "./LoadingScreen";

function MyProfile({ user }){

    const [editor, setEditor] = useState(false)
    const [posts, setPosts] = useState([])

    //loading screen state
    const [isLoading, setIsLoading] = useState(false)

    //Fetching after user is fetched
    useEffect(() => {
        setIsLoading(true)
        fetch(`/users/${user.id}/posts`)
        .then((r) => r.json())
        .then(data => {
            setPosts(data)
            setIsLoading(false)
        })
    }, [user.id])

    return (
        <>
        { isLoading ? <LoadingScreen /> :
            <Container>
                <Row style={{marginTop: "100px", marginBottom: "150px"}}>
                    <Col>
                        <h2 style={{color: "#FFB100"}}>Hello {user.username}</h2>
                        <Image roundedCircle src={user.image_link ? user.image_link : ProfileImage} alt="User"/>
                    </Col>
                    <Col style={{marginTop: "100px"}}>
                        <Button variant="secondary" onClick={() => setEditor(true)}>Edit Profile</Button>
                        <h3>{user.bio ? user.bio : "404 bio not found"}</h3>
                    </Col>
                </Row>
                <Row md={3} className="g-4">
                    {posts.map((post) => <Post key={uuid()} post={post} user={user}/>)}
                </Row>
                <EditProfile user={user} show={editor} onHide={() => setEditor(false)} />
            </Container>
        }
        </>
    )
}

export default MyProfile;