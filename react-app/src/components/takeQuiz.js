import React, { Component } from "react";
import "./ViewPeople.css";
import "./register.css";
import "./takeQuiz.css";

class TakeQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        genre: "",
        quiz_no: 0
      },
      game_data: {
        genre: "",
        quiz_no: 0,
        user_id: 0,
        score: 0
      },
      data: [],
      quiz_data: [],
      submitted: false,
      partial_score: 0,
      completed: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.add_score = this.add_score.bind(this);
  }
  componentDidMount() {
    const request = new Request("http://127.0.0.1:8080/question/");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  handleSubmit(event) {
    event.preventDefault();
    var temp = document.getElementById("quiz_no");
    this.state.formData.quiz_no = parseInt(
      temp.options[temp.selectedIndex].value
    );
    var temp2 = document.getElementById("genre");
    this.state.formData.genre = temp2.options[temp2.selectedIndex].value;
    const request = new Request("http://127.0.0.1:8080/question/");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
    this.filterData();
    this.setState({ submitted: true });
  }
  filterData() {
    for (var i = 0; i < this.state.data.length; i++) {
      if (
        this.state.data[i].quiz_no == this.state.formData.quiz_no &&
        this.state.data[i].genre == this.state.formData.genre
      ) {
        this.state.quiz_data.push(this.state.data[i]);
      }
    }
  }
  go_back() {
    window.location.reload();
  }
  add_score() {
    for (var i = 0; i < this.state.quiz_data.length; i++) {
      var correct_1 = 0,
        correct_2 = 0,
        correct_3 = 0,
        correct_4 = 0;
      var marked_1 = document.getElementById((i * 4 + 1).toString(10)).checked
        ? 1
        : 0;
      var marked_2 = document.getElementById((i * 4 + 2).toString(10)).checked
        ? 1
        : 0;
      var marked_3 = document.getElementById((i * 4 + 3).toString(10)).checked
        ? 1
        : 0;
      var marked_4 = document.getElementById((i * 4 + 4).toString(10)).checked
        ? 1
        : 0;
      if (marked_1 == this.state.quiz_data[i].val_1) {
        correct_1 = 1;
      }
      if (marked_2 == this.state.quiz_data[i].val_2) {
        correct_2 = 1;
      }
      if (marked_3 == this.state.quiz_data[i].val_3) {
        correct_3 = 1;
      }
      if (marked_4 == this.state.quiz_data[i].val_4) {
        correct_4 = 1;
      }
      if (correct_1 && correct_2 && correct_3 && correct_4) {
        this.state.partial_score += 10;
        console.log("+");
      } else if (!marked_1 && !marked_2 && !marked_3 && !marked_4) {
        this.state.partial_score += 0;
        console.log("/");
      } else {
        this.state.partial_score -= 5;
        console.log("-");
      }
    }
    console.log("Final Score " + this.state.partial_score);
    this.state.game_data.genre = this.state.formData.genre;
    this.state.game_data.quiz_no = parseInt(this.state.formData.quiz_no);
    this.state.game_data.user_id = parseInt(
      localStorage.getItem("loggedInUserId")
    );
    var temp = this.state.game_data.user_id;
    console.log("id = " + temp);
    this.state.game_data.score = this.state.partial_score;
    console.log(localStorage.getItem("loggedInUserId"));
    console.log(this.state.game_data);
    fetch("http://localhost:8080/games/" + temp, {
      method: "POST",
      body: JSON.stringify(this.state.game_data)
    }).then(response => {
      if (response.status >= 200 && response.status < 300)
        this.setState({ completed: true });
    });
  }
  render() {
    let handleClick = this.add_score;
    let i;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quiz Portal</h1>
        </header>
        <br />
        <br />
        ----
        {!this.state.submitted &&
          !this.state.completed && (
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
                  Begin
                </button>
              </form>
            </div>
          )}
        ----
        {this.state.submitted &&
          !this.state.completed && (
            <div>
              {(i = 0)}
              {this.state.quiz_data.map(function(item, key) {
                {
                  i += 1;
                }
                return (
                  <div value={i}>
                    <p style={{ fontSize: 35 }}> Question {i} </p>
                    <br />
                    <br />
                    <p style={{ fontSize: 25 }}>{item.question}</p>
                    <br />
                    <p>Image:</p>
                    {item.image && (
                      <img src={require("./media/" + item.image)} />
                    )}
                    {!item.image && <p>N/A</p>}
                    <br />
                    <br />
                    <p>Audio:</p>
                    {item.audio && (
                      <audio controls>
                        <source
                          src={require("./media/" + item.audio)}
                          type="audio/mp3"
                        />
                      </audio>
                    )}
                    {!item.audio && <p>N/A</p>}
                    <br />
                    <br />
                    {item.type ? (
                      <div>
                        <label className="container">
                          <input
                            type="checkbox"
                            id={((i - 1) * 4 + 1).toString(10)}
                          />
                          {item.option_1}
                          <span className="checkmark" />
                        </label>
                      </div>
                    ) : (
                      <div>
                        <label className="container">
                          <input
                            type="radio"
                            name={"action" + i}
                            id={((i - 1) * 4 + 1).toString(10)}
                          />
                          {item.option_1}
                          <span className="checkmark" />
                        </label>
                      </div>
                    )}
                    {item.type ? (
                      <div>
                        <label className="container">
                          <input
                            type="checkbox"
                            id={((i - 1) * 4 + 2).toString(10)}
                          />
                          {item.option_2}
                          <span className="checkmark" />
                        </label>
                      </div>
                    ) : (
                      <div>
                        <label className="container">
                          <input
                            type="radio"
                            name={"action" + i}
                            id={((i - 1) * 4 + 2).toString(10)}
                          />
                          {item.option_2}
                          <span className="checkmark" />
                        </label>
                      </div>
                    )}
                    {item.type ? (
                      <div>
                        <label className="container">
                          <input
                            type="checkbox"
                            id={((i - 1) * 4 + 3).toString(10)}
                          />
                          {item.option_3}
                          <span className="checkmark" />
                        </label>
                      </div>
                    ) : (
                      <div>
                        <label className="container">
                          <input
                            type="radio"
                            name={"action" + i}
                            id={((i - 1) * 4 + 3).toString(10)}
                          />
                          {item.option_3}
                          <span className="checkmark" />
                        </label>
                      </div>
                    )}
                    {item.type ? (
                      <div>
                        <label className="container">
                          <input
                            type="checkbox"
                            id={((i - 1) * 4 + 4).toString(10)}
                          />
                          {item.option_4}
                          <span className="checkmark" />
                        </label>
                      </div>
                    ) : (
                      <div>
                        <label className="container">
                          <input
                            type="radio"
                            name={"action" + i}
                            id={((i - 1) * 4 + 4).toString(10)}
                          />
                          {item.option_4}
                          <span className="checkmark" />
                        </label>
                      </div>
                    )}
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                );
              })}
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                onClick={this.add_score}
              >
                Submit Quiz
              </button>
            </div>
          )}
        {this.state.completed && (
          <div>
            <h2> Congrats, You have completed the quiz. </h2>
            <br />
            <br />
            <h3> Your Score : {this.state.partial_score} </h3>
            {/* <ul class="list-group">
              {this.state.quiz_data.map(function(item, key) {
                {
                  count += 1;
                }
                return (
                  <li class="list-group-item">Question {i}
                  <span class="badge">{this.state.}</span>
                </li>
                );
              })}
             
            </ul> */}
            <br />
            <br />
            <br />
            <button onClick={this.go_back} className="btn btn-primary btn-lg">
              {" "}
              Take another Attempt{" "}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default TakeQuiz;
