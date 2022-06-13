import React from "react";
import "./App.css";
import  {Route, Routes,BrowserRouter} from 'react-router-dom'
import Home from "./components/Home";
import SignUpPage from "./components/SignUpPage";
import SignInPage from './components/SignInPage'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={ <Home/> }/>
    <Route exact path="/SignUpPage" element={ <SignUpPage/> }/>
    <Route exact path="/SignInPage" element={ <SignInPage/> }/>
    
    </Routes>
    </BrowserRouter>
  );
  
};

export default App;
