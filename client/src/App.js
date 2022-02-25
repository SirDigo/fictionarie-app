import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Signup from "./components/Signup"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Home from "./components/Home"
import About from "./components/About"
import NoPage from "./components/NoPage"

function App() {

    const [user, setUser] = useState({})

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
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="signup" element={<Signup setUser={setUser}/>} />
                    <Route path="login" element={<Login />} />
                    { user ? <></> : <Route path="profile" element={<Profile />} />}
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default App;