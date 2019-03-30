import React, { Component } from "react";
import "./ViewPeople.css";
import "./register.css";

class DeleteQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        genre: "",
        quiz_no: 0
      },
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var temp = document.getElementById("quiz_no");
    this.state.formData.quiz_no = parseInt(
      temp.options[temp.selectedIndex].value
    );
    var temp2 = document.getElementById("genre");
    this.state.formData.genre = temp2.options[temp2.selectedIndex].value;
    const request = new Request(
      "http://127.0.0.1:8080/quiz/" +
        this.state.formData.genre +
        "/" +
        this.state.formData.quiz_no
    );
    fetch(request, { method: "DELETE" }).then(response => {
      this.setState({ submitted: true }); //   window.location.reload();
    });
  }
  go_back() {
    window.location.reload();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select a quiz to be deleted.</h1>
        </header>
        <br />
        <br />
        {!this.state.submitted && (
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Genre</label>
                <br />
                <br />
                <select className="form-control" id="genre">
                  <option value="Politics">Politics</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
              <br />
              <div className="form-group">
                <label>Quiz</label>
                <br />
                <br />
                <select className="form-control" id="quiz_no">
                  <option value="1">Quiz-1</option>
                  <option value="2">Quiz-2</option>
                </select>
              </div>
              <br />
              <button type="submit" className="btn btn-default">
                Submit
              </button>
            </form>
          </div>
        )}
        {this.state.submitted && (
          <div>
            <h2>The quiz was successfully deleted.</h2>
            <br />
            <br />
            <br />
            <button className="btn btn-primary btn-lg" onClick={this.go_back}>
              Delete more quizzes
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default DeleteQuiz;
