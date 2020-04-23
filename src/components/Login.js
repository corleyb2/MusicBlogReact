import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { FormHelperText } from "@material-ui/core";
// axios.defaults.headers.common["Authorization"] = `Bearer ${
//   document.cookie.split("=")[1]
// }`;

function Login({
  userName,
  setUserName,
  setPassword,
  isLoggedIn,
  setIsLoggedIn,
  password,
  setCreateBlog,
}) {
  // const [tryLogin, setTryLogin] = useState(false);

  async function authUser() {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/users/login",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: userName,
          password: password,
        },
      });
      console.log("Access Granted");
      return true;
    } catch (err) {
      console.log("Not So Fast!");
      return false;
    }
  }

  async function logoutUser() {
    const response = await axios({
      method: "post",
      url: "http://localhost:4000/logout",
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoggedIn(false);
  }

  async function loginAttempt() {
    if (!isLoggedIn) {
      const allowed = await authUser();
      setPassword("");
      if (allowed) {
        console.log("Logging In Meow...");
        setIsLoggedIn(true);
      } else {
        console.log("Do the log out");
        setIsLoggedIn(false);
        setUserName("");
      }
    } else {
      setIsLoggedIn(false);
      console.log("Broke it!");
    }
  }

  // useEffect(() => {
  //   console.log("Fixin' to attempt a login");
  //   loginAttempt();
  // }, [tryLogin]);

  // console.log("welp", isLoggedIn);
  if (!isLoggedIn) {
    return (
      <div style={inputWrap}>
        <input
          id="user-name"
          type="text"
          required
          placeholder="Username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
        <input
          id="password"
          type="password"
          required
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <Button onClick={() => loginAttempt()} color="inherit">
          Login
        </Button>
      </div>
    );
  } else {
    return (
      <div style={navbarSetup}>
        <div style={welcome}>{`Welcome, ${userName}!`}</div>
        <div style={loggedInButtons}>
          <Button onClick={() => setCreateBlog(true)} color="inherit">
            Write a Blog
          </Button>
          <Button onClick={() => logoutUser()} color="inherit">
            LogOut
          </Button>
        </div>
      </div>
    );
  }
}

const inputWrap = {
  display: "flex",
  width: "30vw",
  height: 20,
  justifyContent: "space-between",
  alignItems: "center",
};

// const inputs = {
//   display: "flex",
// };

const navbarSetup = {
  display: "flex",
  width: "90vw",
  margin: "auto",
};

const welcome = {
  display: "flex",
  width: "70vw",
  fontSize: 20,
  paddingTop: 10,
};

const loggedInButtons = {
  display: "flex",
  width: "20vw",
  justifyContent: "space-between",
};

export default Login;
