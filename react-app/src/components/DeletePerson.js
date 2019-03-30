import React, { Component } from "react";
import "./DeletePerson.css";

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const request = new Request("http://127.0.0.1:8080/people/");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }

  temp = () => {
    {
      this.state.data.map(function(item, key) {
        if (document.getElementById(item.id).checked) {
          const request = new Request(
            "http://127.0.0.1:8080/people/" + item.id
          );
          fetch(request, { method: "DELETE" }).then(response => {
            window.location.reload();
          });
        }
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Person</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.Username}</td>
                  <td>{item.Email}</td>
                  {item.id != 1 && (
                    <td>
                      <input type="radio" id={item.id} />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <button
          type="submit"
          onClick={this.temp}
          className="btn btn-primary btn-lg"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default DeletePerson;
