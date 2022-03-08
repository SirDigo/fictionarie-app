import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'

function Login({ setUser }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    function handleSubmit(e){
        e.preventDefault()
        setErrors([]);
        //add setIsLoading here!
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        }).then((r) => {
            //setisloading to false here!
            if (r.ok) {
                r.json().then((user) => {
                    // console.log(user)
                    setUser(user)
                });
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="shadow-sm mb-3">
                <Form.Control 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="shadow-sm mb-3">
                <Form.Control
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            {/*Add password confirmation here!*/}
            <Button variant="secondary" type="submit">Login</Button>
            {errors.map((err) => (
                <p key={err} style={{color: "#f73528"}}>{err}</p>
            ))}
        </Form>
    )

}

export default Login;