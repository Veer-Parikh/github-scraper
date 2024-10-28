import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Output from "./pages/Output";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            {/* <Navbar />
            <Home /> */}
            <Router>
                <Routes>
                    <Route 
                        path = "/"
                        element = {
                            <>
                                <Navbar />
                                <Home />
                            </>
                        }  
                    />
                    <Route 
                        path = "/:username"
                        element = {
                            <Output />
                        }  
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
