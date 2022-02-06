import "./App.css";

import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";

function App() {

    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            message: message, 
            type: type
        });
        setTimeout(() => {
            setAlert(null);
        }, 1500)
    }

    return (
        <div className="App">
            <NoteState showAlert = {showAlert}>
                <NavBar />
                <Alert alert = {alert} />
                <div className="container">
                    <Routes>
                        <Route exact path="/" element={<Home showAlert = {showAlert} />} />
                        <Route exact path="/about" element={<About />} />
                        <Route exact path="/login" element={<Login showAlert = {showAlert}/>} />
                        <Route exact path="/signup" element={<SignUp showAlert = {showAlert}/>} />
                    </Routes>
                </div>
            </NoteState>
        </div>
    );
}

export default App;
