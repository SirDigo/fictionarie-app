import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Signup from "./components/Signup"
import Login from "./components/Login"
import MyProfile from "./components/MyProfile"
import Home from "./components/Home"
import About from "./components/About"
import NoPage from "./components/NoPage"

function App() {

    const [user, setUser] = useState({})

    // useEffect(() => {
    //     //User Auth
    //     fetch("/me").then((r) => {
    //         if (r.ok) {
    //             r.json().then((user) => setUser(user));
    //         };
    //     });
    // }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes path="/">
                    <Route index element={<Home user={user}/>} />
                    <Route path="about" element={<About />} />
                    <Route path="signup" element={<Signup setUser={setUser}/>} />
                    <Route path="login" element={<Login setUser={setUser}/>} />
                    { user ? <Route path="profile" element={<MyProfile />}/> : <></>}
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default App;