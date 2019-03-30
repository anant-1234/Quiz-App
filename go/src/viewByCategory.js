import React, { Component } from "react";
import "./ViewPeople.css";

class ViewQuestions extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    const request = new Request("http://127.0.0.1:8080/question/");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
      for(var i=0;i<this.state.data.length;i++) {
          if(data[i].genre===)
      }  
    }

 
  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Questions</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
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
            {this.state.data.map(function(item, key) {
              return (
                <tr key={key}>
                  <td>{item.id}</td>
                  <td>{item.question}</td>
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
      </div>
    );
  }
}

export default ViewQuestions;
