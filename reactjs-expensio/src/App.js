import './App.css';
import { Container } from "react-bootstrap";
import React, { Suspense, useEffect } from "react";
//import { Signup } from './APIs';
//Hooks lets you use local state without writing a function for it
import { useDispatch, useSelector } from 'react-redux';
//
import { Routes, Route, Navigate } from "react-router-dom"; 

import GlobalSpinner from "./components/ui/GlobalSpinner";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAuth } from "./states/auth.state";
import Header from "./components/ui/Header";
import Nomatch from './components/ui/Nomatch';

const Signup = React.lazy(() => import("./components/pages/Signup"));
const Login = React.lazy(() => import("./components/pages/Login"));

function WithAuth(page, auth) {
  return (
    <Suspense fallback={<GlobalSpinner />}>
      {/* If user is authenticated, and wants to access the login page, we redirected him to dashboard */}
      {auth ? page : <Navigate replace to="/login" />}
    </Suspense>
  );
}

function NoAuth(page, auth) {
  return (
    <Suspense fallback={<GlobalSpinner />}>
      {/* If user is authenticated, and wants to access the login page, we redirected him to dashboard */}
      {auth ? page : <Navigate replace to="/dashboard" />}
    </Suspense>
  );
}


function App(){

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      // Initializing our global token
      dispatch(setAuth({ token })); //handling side effects in react
    }
    return () => {};
  }, []);

  return(
    <React.Fragment>
      <Header />
      <Container fluid>
        <Routes>
        <Route
          // Getting the token from session storage
          // If token is present, redirect to dashboard, else redirected to login
          // The navigate component is used for redirecting
            path="/"
            element={
              token ? (
                <Navigate replace to="/dashboard" />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route path="/login" element={NoAuth(<Login />, !token)} />
          <Route path="/signup" element={NoAuth(<Signup />, !token)} />
          
        </Routes>
      </Container>
      <ToastContainer theme="colored" />
    </React.Fragment>
  );
}

export default App;
