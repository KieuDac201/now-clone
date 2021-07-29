import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
      </Switch>
    </>
  );
}

export default App;
