import React, { Component } from "react";
import "./ViewPeople.css";

class ViewCategories extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      politics_data: [],
      politics_flag: 0,
      sports_data: [],
      sports_flag: 0
    };
  }
  componentDidMount() {
    const request = new Request("http://127.0.0.1:8080/question/");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }
  set_politics = () => {
    {
      if (!this.state.politics_flag) {
        this.setState({ politics_flag: 1 });
        for (var i = 0; i < this.state.data.length; i++) {
          if (this.state.data[i].genre === "Politics")
            this.state.politics_data.push(this.state.data[i]);
        }
      } else {
        window.location.reload();
      }
    }
  };
  set_sports = () => {
    {
      if (!this.state.sports_flag) {
        this.setState({ sports_flag: 1 });
        for (var i = 0; i < this.state.data.length; i++) {
          if (this.state.data[i].genre === "Sports")
            this.state.sports_data.push(this.state.data[i]);
        }
      } else {
        window.location.reload();
      }
    }
  };
  delete_row = id => {
    {
      const request = new Request("http://127.0.0.1:8080/question/" + id);
      fetch(request, { method: "DELETE" }).then(response => {
        if (response.status >= 200 && response.status < 300) {
          window.location.reload();
          console.log("response receieved");
        }
      });
    }
  };
  render() {
    let handleClick = this.delete_row;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>
        <br />
        <br />
        <button
          className="btn btn-primary btn-lg"
          onClick={this.set_politics}
          style={{ width: 1000, height: 70 }}
        >
          Politics
        </button>
        <br />
        <br />
        -----
        {this.state.politics_flag && (
          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Quiz Number</th>
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
              {this.state.politics_data.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.quiz_no}</td>
                    <td>{item.question}</td>
                    <td>
                      {item.image && (
                        <img src={require("./media/" + item.image)} alt="N/A" />
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
                    <td>
                      <button
                        className="btn btn-primary btn-lg"
                        style={{ backgroundColor: "red" }}
                        value={item.id}
                        onClick={() => handleClick(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        -----
        <br />
        <br />
        <button
          className="btn btn-primary btn-lg"
          onClick={this.set_sports}
          style={{ width: 1000, height: 70 }}
        >
          Sports
        </button>
        <br />
        <br />
        -----
        {this.state.sports_flag && (
          <table className="table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Quiz Number</th>
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
              {this.state.sports_data.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.quiz_no}</td>
                    <td>{item.question}</td>
                    <td>
                      {item.image && (
                        <img src={require("./media/" + item.image)} alt="N/A" />
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
                    <td>
                      <button
                        className="btn btn-primary btn-lg"
                        style={{ backgroundColor: "red" }}
                        value={item.id}
                        onClick={() => handleClick(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        -----
      </div>
    );
  }
}

export default ViewCategories;
