import React, { Component } from "react";
import "./ViewPeople.css";

class History extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      history_data: []
    };
  }
  componentDidMount() {
    const request = new Request("http://127.0.0.1:8080/games/leaderboard");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }
  filter_data() {
    var temp = parseInt(localStorage.getItem("loggedInUserId"));
    console.log(temp);
    for (var i = 0; i < this.state.data.length; i++) {
      console.log(this.state.data[i]);
      if (this.state.data[i].user_id == temp)
        this.state.history_data.push(this.state.data[i]);
    }
  }
  render() {
    this.filter_data();
    console.log(parseInt(localStorage.getItem("loggedInUserId")));
    console.log(this.state.history_data);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My History : </h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>Genre</th>
              <th>Quiz Number</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.state.history_data.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.genre}</td>
                  <td>{item.quiz_no}</td>
                  <td>{item.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default History;
