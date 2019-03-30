import React, { Component } from "react";
// import './App.css';

class NewComponent extends Component {
  go_to_login() {
    window.location.replace("/login");
  }
  render() {
    return (
      <div>
        <br />
        <br />
        <h2> Welcome to the Quiz App</h2>
        <br />
        <br />

        <h3>
          Test your callibre by attempting the quizzes and questions from
          different genres handpicked by our experts.
        </h3>
        <br />
        <br />
        <br />
        <img src={require("./media/logo.jpg")} alt="Loading .." />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default NewComponent;
