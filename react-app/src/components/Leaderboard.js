import React, { Component } from "react";
import "./ViewPeople.css";

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      game_data: [],
      person_data: [],
      politics_data: [],
      sports_data: [],
      complete_data: [],
      viewed: false
    };
  }
  componentDidMount() {
    const request = new Request("http://127.0.0.1:8080/games/leaderboard");
    fetch(request)
      .then(response => response.json())
      .then(game_data => this.setState({ game_data: game_data }));
    const request2 = new Request("http://127.0.0.1:8080/people/");
    fetch(request2)
      .then(response => response.json())
      .then(person_data => this.setState({ person_data: person_data }));
  }
  set_politics() {
    this.state.politics_data = [];
    for (var i = 0; i < this.state.game_data.length; i++) {
      if (this.state.game_data[i].genre == "Politics") {
        var dict = [];
        dict["quiz_no"] = this.state.game_data[i].quiz_no;
        dict["score"] = this.state.game_data[i].score;
        for (var j = 0; j < this.state.person_data.length; j++) {
          if (this.state.person_data[j].id == this.state.game_data[i].user_id) {
            dict["username"] = this.state.person_data[j].Username;
          }
        }
        if (dict["username"]) this.state.politics_data.push(dict);
      }
    }
  }
  set_sports() {
    this.state.sports_data = [];
    for (var i = 0; i < this.state.game_data.length; i++) {
      if (this.state.game_data[i].genre == "Sports") {
        var dict = [];
        dict["quiz_no"] = this.state.game_data[i].quiz_no;
        dict["score"] = this.state.game_data[i].score;
        for (var j = 0; j < this.state.person_data.length; j++) {
          if (this.state.person_data[j].id == this.state.game_data[i].user_id) {
            dict["username"] = this.state.person_data[j].Username;
          }
        }
        if (dict["username"]) this.state.sports_data.push(dict);
      }
    }
  }

  set_complete() {
    this.state.complete_data = [];
    for (var i = 0; i < this.state.game_data.length; i++) {
      var dict = [];
      dict["quiz_no"] = this.state.game_data[i].quiz_no;
      dict["score"] = this.state.game_data[i].score;
      for (var j = 0; j < this.state.person_data.length; j++) {
        if (this.state.person_data[j].id == this.state.game_data[i].user_id) {
          dict["username"] = this.state.person_data[j].Username;
        }
      }
      if (dict["username"]) this.state.complete_data.push(dict);
    }
  }
  render() {
    let i = 0;
    this.set_politics();
    this.set_sports();
    this.set_complete();
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LeaderBoard</h1>
        </header>

        <div>
          ---- {(i = 0)} ----
          <h1> Politics </h1>
          <br />
          <br />
          <div>
            <table className="table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th> User </th>
                  <th> Quiz Number </th>
                  <th> Score </th>
                </tr>
              </thead>

              <tbody>
                {this.state.politics_data.map(function(item, key) {
                  {
                    i += 1;
                  }
                  return (
                    <tr key={key}>
                      <td>{i}</td>
                      <td>{item.username}</td>
                      <td>{item.quiz_no}</td>
                      <td>{item.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <br />
          <br />
          <div>
            ---- {(i = 0)} ----
            <h1> Sports </h1>
            <br />
            <br />
            <table className="table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th> User </th>
                  <th> Quiz Number </th>
                  <th> Score </th>
                </tr>
              </thead>
              <tbody>
                {this.state.sports_data.map(function(item, key) {
                  {
                    i += 1;
                  }
                  return (
                    <tr key={key}>
                      <td>{i}</td>

                      <td>{item.username}</td>
                      <td>{item.quiz_no}</td>
                      <td>{item.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <br />
          <br />
          <div>
            ---- {(i = 0)} ----
            <h1> Overall </h1>
            <br />
            <br />
            <table className="table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th> User </th>
                  <th> Quiz Number </th>
                  <th> Score </th>
                </tr>
              </thead>
              <tbody>
                {this.state.complete_data.map(function(item, key) {
                  {
                    i += 1;
                  }
                  return (
                    <tr key={key}>
                      <td>{i}</td>
                      <td>{item.username}</td>
                      <td>{item.quiz_no}</td>
                      <td>{item.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {(this.state.viewed = true)}
        </div>
      </div>
    );
  }
}

export default Leaderboard;
