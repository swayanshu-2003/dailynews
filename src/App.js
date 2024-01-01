import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News key="general1" country="us" category="general" />}></Route>
          <Route xact path="/business" element={<News key="business" country="us" category="business" />}></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" country="in" category="entertainment" />}></Route>
          <Route exact path="/general" element={<News key="general" country="us" category="general" />}></Route>
          <Route exact path="/health" element={<News key="health" country="us" category="health" />}></Route>
          <Route exact path="/science" element={<News key="science" country="us" category="science" />}></Route>
          <Route exact path="/sports" element={<News key="sports" country="us" category="sports" />}></Route>
          <Route exact path="/technology" element={<News key="technology" country="us" category="technology" />}></Route>
          
        </Routes>
        
        </Router>
      </div>
    );
  }
}
