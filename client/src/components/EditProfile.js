import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function EditProfile(props){
    const user = props.user

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const [bio, setBio] = useState("")
    const [errors, setErrors] = useState([])
    
    function handleSubmit(e){
        e.preventDefault()
        setErrors([]);
        //add setIsLoading here!
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                username: username,
                bio: bio,
                image_link: profilePic,
                email: email,
            }),
        }).then((r) => {
            //setisloading to false here!
            if (r.ok) {
                r.json()
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
    }

    return(
<Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {user.username}'s Profile Editor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder={user.username}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder={user.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Pic</Form.Label>
                <Form.Control 
                    type="file" 
                    value={profilePic}
                    name="myImage"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                />
            </Form.Group> 
            <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder={user.bio ? user.bio : "404 bio not found"}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Save Changes
            </Button>
            {errors.map((err) => (
                <p key={err}>{err}</p>
            ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default EditProfile;