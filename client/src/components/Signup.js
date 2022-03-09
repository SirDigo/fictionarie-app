import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap'


function Signup({ setUser, setShowSignUp }){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState([]);

    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e){
        e.preventDefault()
        setErrors([]);
        setIsLoading(true)
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                email,
            }),
        }).then((r) => {
            setIsLoading(false)
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                    setShowSignUp(false)
                });
            } else {
                r.json().then((err) => {
                    setErrors(err.errors)
                });
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
                    placeholder="Username..."
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="shadow-sm mb-3">
                <Form.Control
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password..."
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            {/*Add password confirmation here!*/}
            <Form.Group className="shadow-sm mb-3">
                <Form.Control 
                    type="text"
                    id="email"
                    value={email}
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Button variant="secondary" type="submit">{isLoading ? "Loading..." : "Signup"}</Button>
            {errors.map((err) => (
                <p key={err} style={{color: "#f73528"}}>{err}.</p>
            ))}
        </Form>
    )

}

export default Signup;