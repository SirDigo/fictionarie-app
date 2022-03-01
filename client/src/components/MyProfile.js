import React from "react";
import ProfileImage from "../download.png"


function MyProfile({ user }){

    return (
        <div>
            <nav>
                <a href="/">Home</a>
                <a href="/edit_profile">Edit Profile</a>
            </nav>
            <p>hello {user.username}</p>
            <img src={ProfileImage} alt="User"/>
            <p>
                {user.bio ? user.bio : "404 bio not found"}
            </p>
            <div>{user.posts}</div>

        </div>
    )
}

export default MyProfile;