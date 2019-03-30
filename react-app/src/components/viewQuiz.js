import React, { Component } from "react";
import "./ViewPeople.css";
import "./register.css";

class ViewQuizzes extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        genre: "",
        quiz_no: 0
      },
      data: [],
      quiz_data: [],
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Quizzes.</h1>
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
            <table className="table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Question</th>
                  <th>Image</th>
                  <th>Audio</th>
                  <th>Option-A</th>
                  <th>Option-B</th>
                  <th>Option-C</th>
                  <th>Option-D</th>
                  <th>A</th>
                  <th>B</th>
                  <th>C</th>
                  <th>D</th>
                </tr>
              </thead>
              <tbody>
                {this.state.quiz_data.map(function(item, key) {
                  return (
                    <tr key={key}>
                      <td>{item.id}</td>
                      <td>{item.question}</td>
                      <td>
                        {item.image && (
                          <img
                            src={require("./media/" + item.image)}
                            alt="N/A"
                          />
                        )}
                        {!item.image && <p>N/A</p>}
                      </td>
                      <td>
                        {item.audio && (
                          <audio controls>
                            <source
                              src={require("./media/" + item.audio)}
                              type="audio/mp3"
                            />
                          </audio>
                        )}
                        {!item.audio && <p>N/A</p>}
                      </td>
                      <td>{item.option_1}</td>
                      <td>{item.option_2}</td>
                      <td>{item.option_3}</td>
                      <td>{item.option_4}</td>
                      <td>{item.val_1}</td>
                      <td>{item.val_2}</td>
                      <td>{item.val_3}</td>
                      <td>{item.val_4}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br />
            <br />
            <button className="btn btn-primary btn-lg" onClick={this.go_back}>
              Back
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default ViewQuizzes;
