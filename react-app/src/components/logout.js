import React, { Component } from "react";
import "./register.css";

class Logout extends Component {
  render() {
    localStorage.setItem("loggedIn", 0);
    window.location.reload();
    console.log("problem");
    return <div />;
  }
}

export default Logout;
