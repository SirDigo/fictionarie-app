import React, { useState } from "react";
import { Container, Navbar, Nav, Modal} from "react-bootstrap";

import Login from "./Login";
import Signup from "./Signup";

function Navigationbar({ user, logout, setUser }){

    //for login and signup bootstrap modals
    const [showLogin, setShowLogin] = useState(false)
    const [showSignUp, setShowSignUp] = useState(false)

    return(
        <>
        <Navbar sticky="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/" style={{color: "#FFB100"}}>Fictionarie_</Navbar.Brand>
                <Nav className="me-auto">
                    {/* <Nav.Link onClick={ user ? "/my_profile" : setShowLogin(true)}>{user ? "My Profile" : "Login"}</Nav.Link> */}
                    {user ?
                        <Nav.Link href="/my_profile">My Profile</Nav.Link>
                        :
                        <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
                    }
                    {user ?
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                        :
                        <Nav.Link onClick={() => setShowSignUp(true)}>Signup</Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>

        {/*Modals*/}
        <Modal show={showLogin} onHide={() => setShowLogin(false)}>
            <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Login setUser={setUser}/>
            </Modal.Body>
        </Modal>

        <Modal show={showSignUp} onHide={() => setShowSignUp(false)}>
            <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Signup setUser={setUser}/>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default Navigationbar;