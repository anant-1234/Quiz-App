import React, { Component } from "react";
import "./register.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Username: "",
        Password: ""
      },
      wrong_password: false,
      invalid: false,
      data: []
    };
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const request = new Request("http://127.0.0.1:8080/people/");
    fetch(request)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data });
        if (
          this.state.formData.Username == "admin" &&
          this.state.formData.Password == "adminboss"
        ) {
          console.log("Entered");
          window.localStorage.setItem("loggedIn", 2);
          console.log("asas");
          window.localStorage.setItem("loggedInUserId", 1);
          // this.setState({ wrong_password: false, invalid: false });
          console.log("ERRROROROR");
          window.location.replace("/");
        } else {
          for (var i = 0; i < this.state.data.length; i++) {
            if (
              data[i].Username === this.state.formData.Username &&
              data[i].Password === this.state.formData.Password
            ) {
              localStorage.setItem("loggedIn", 1);
              localStorage.setItem("loggedInUserId", data[i].id);
              this.setState({ wrong_password: false, invalid: false });
              window.location.reload();
            } else if (data[i].Username === this.state.formData.Username) {
              this.setState({ wrong_password: true, invalid: false });
            } else {
              this.setState({ invalid: true });
            }
          }
        }
      });
  }

  handleFChange(event) {
    this.state.formData.Username = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.Password = event.target.value;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <br />
        <br />
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={this.state.Username}
                onChange={this.handleFChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={this.state.Password}
                onChange={this.handleLChange}
                required
              />
            </div>
            {this.state.wrong_password && (
              <ul>
                <li style={{ color: "red" }}>Wrong password entered.</li>
              </ul>
            )}
            <button type="submit" className="btn btn-default">
              login
            </button>
          </form>
        </div>
        <br />
        {this.state.invalid && (
          <ul>
            <li style={{ color: "red" }}>The user doesn't exist.</li>
          </ul>
        )}
      </div>
    );
  }
}

export default Login;
