import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Signup from "./components/Signup"
import Login from "./components/Login"
import MyProfile from "./components/MyProfile"
import Profile from "./components/Profile"
import Home from "./components/Home"
import About from "./components/About"
import NoPage from "./components/NoPage"
import EditProfile from "./components/EditProfile"

function App() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        //User Auth
        fetch("/me").then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user));
            };
        });

        

    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes path="/">
                    <Route index element={<Home setUser={setUser} user={user} />} />
                    <Route path="about" element={<About />} />
                    <Route path="signup" element={<Signup setUser={setUser}/>} />
                    <Route path="login" element={<Login setUser={setUser}/>} />
                    <Route path="profile/:id" element={<Profile user={user}/>} />
                    { user ? 
                    <>
                        <Route path="my_profile" element={<MyProfile user={user} />}/>
                        <Route path="edit_profile" element={<EditProfile user={user}/>}/> 
                    </>
                    : <></>}
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default App;