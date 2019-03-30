import React, { Component } from "react";
import "./register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Username: "",
        Password: "",
        Email: ""
      },
      submitted: false,
      username_exists: false,
      email_exists: false,
      invalid_uname: false,
      invalid_pass: false,
      invalid_email: false
    };
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let f = 0;
    if (this.state.formData.Password.length <= 8) {
      f = 1;
      this.setState({ submitted: false, invalid_pass: true });
    }
    if (f === 0) {
      fetch("http://localhost:8080/people", {
        method: "POST",
        body: JSON.stringify(this.state.formData)
      }).then(response => {
        if (response.status >= 200 && response.status < 300)
          this.setState({
            submitted: true,
            username_exists: false,
            email_exists: false
          });
        else if (response.status <= 400)
          this.setState({ submitted: false, username_exists: true });
        else this.setState({ submitted: false, email_exists: true });
      });
    }
  }

  handleFChange(event) {
    this.state.formData.Username = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.Password = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.Email = event.target.value;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sign Up</h1>
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
            {this.state.invalid_uname && (
              <ul>
                <li style={{ color: "red" }}>Username cannot be empty.</li>
              </ul>
            )}
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
            {this.state.invalid_pass && (
              <ul>
                <li style={{ color: "red" }}>
                  Password must be of minimum 8 characters.
                </li>
              </ul>
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                value={this.state.Email}
                onChange={this.handleCChange}
                required
              />
              {this.state.invalid_email && (
                <ul>
                  <li style={{ color: "red" }}>Email cannot be empty.</li>
                </ul>
              )}
            </div>
            <button type="submit" className="btn btn-default">
              Submit
            </button>
          </form>
        </div>

        {this.state.submitted && (
          <div>
            <h2>New person successfully added.</h2>
            {window.localStorage.setItem("loggedIn", 1)}
            {window.location.reload()}
          </div>
        )}
        {this.state.username_exists && (
          <div>
            <h2>Username already exists.</h2>
          </div>
        )}
        {this.state.email_exists && (
          <div>
            <h2>Email - ID already in use.</h2>
          </div>
        )}
      </div>
    );
  }
}

export default Register;
