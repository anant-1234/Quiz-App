import React, { Component } from "react";
import "./register.css";

class EditQuestion extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      submitted: false,
      quiz_data: [],
      reqd_genre: "",
      reqd_no: 0,
      formData: {
        question: "",
        quiz_no: 0,
        genre: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
        val_1: 0,
        val_2: 0,
        val_3: 0,
        val_4: 0
      }
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleQuiz_noChange = this.handleQuiz_noChange.bind(this);
    this.handleOption_1Change = this.handleOption_1Change.bind(this);
    this.handleOption_2Change = this.handleOption_2Change.bind(this);
    this.handleOption_3Change = this.handleOption_3Change.bind(this);
    this.handleOption_4Change = this.handleOption_4Change.bind(this);
    this.handleVal_1Change = this.handleVal_1Change.bind(this);
    this.handleVal_2Change = this.handleVal_2Change.bind(this);
    this.handleVal_3Change = this.handleVal_3Change.bind(this);
    this.handleVal_4Change = this.handleVal_4Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }
  componentDidMount() {
    const request = new Request("http://127.0.0.1:8080/question/");
    fetch(request)
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  }
  handleSubmit(event) {
    event.preventDefault();
    this.state.formData = this.state.quiz_data[parseInt(event.target.value)];
    fetch("http://localhost:8080/updtquestion/" + event.target.id, {
      method: "PUT",
      body: JSON.stringify(this.state.formData)
    }).then(response => {
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
      }
    });
  }

  handleSubmit2(event) {
    event.preventDefault();
    var temp = document.getElementById("quiz_no");
    this.state.reqd_no = parseInt(temp.options[temp.selectedIndex].value);
    var temp2 = document.getElementById("genre");
    this.state.reqd_genre = temp2.options[temp2.selectedIndex].value;
    this.filterData();
    this.setState({ submitted: true });
  }

  filterData() {
    for (var i = 0; i < this.state.data.length; i++) {
      if (
        this.state.data[i].quiz_no == this.state.reqd_no &&
        this.state.data[i].genre == this.state.reqd_genre
      ) {
        this.state.quiz_data.push(this.state.data[i]);
      }
    }
  }
  handleQuestionChange(event) {
    var newthis = this;
    this.state.quiz_data[parseInt(event.target.id)].question =
      event.target.value;
    this.state.formData.question = event.target.value;
    this.setState({ quiz_data: newthis.state.quiz_data });
  }

  handleQuiz_noChange(event) {
    var newthis = this;
    this.state.quiz_data[parseInt(event.target.id)].quiz_no =
      event.target.value;
    this.state.formData.quiz_no = event.target.value;
    this.setState({ quiz_data: newthis.state.quiz_data });
  }
  handleOption_1Change(event) {
    var newthis = this;
    this.state.quiz_data[parseInt(event.target.id)].option_1 =
      event.target.value;
    this.state.formData.option_1 = event.target.value;
    this.setState({ quiz_data: newthis.state.quiz_data });
  }
  handleOption_2Change(event) {
    var newthis = this;
    this.state.quiz_data[parseInt(event.target.id)].option_2 =
      event.target.value;
    this.state.formData.option_2 = event.target.value;
    this.setState({ quiz_data: newthis.state.quiz_data });
  }
  handleOption_3Change(event) {
    var newthis = this;
    this.state.quiz_data[parseInt(event.target.id)].option_3 =
      event.target.value;
    this.state.formData.option_3 = event.target.value;
    this.setState({ quiz_data: newthis.state.quiz_data });
  }
  handleOption_4Change(event) {
    var newthis = this;
    this.state.quiz_data[parseInt(event.target.id)].option_4 =
      event.target.value;
    this.state.formData.option_4 = event.target.value;
    this.setState({ quiz_data: newthis.state.quiz_data });
  }
  handleVal_1Change(event) {
    var newthis = this;
    this.state.quiz_data[parseInt(event.target.id)].val_1 = event.target.value;
    this.state.formData.val_1 = event.target.value;
    this.setState({ quiz_data: newthis.state.quiz_data });
  }
  handleVal_2Change(event) {
    var newthis = this;
    this.state.quiz_data[parseInt(event.target.id)].val_2 = event.target.value;
    this.state.formData.val_2 = event.target.value;
    this.setState({ quiz_data: newthis.state.quiz_data });
  }
  handleVal_3Change(event) {
    var newthis = this;
    this.state.quiz_data[parseInt(event.target.id)].val_3 = event.target.value;
    this.state.formData.val_3 = event.target.value;
    this.setState({ quiz_data: newthis.state.quiz_data });
  }
  handleVal_4Change(event) {
    var newthis = this;
    this.state.quiz_data[parseInt(event.target.id)].val_4 = event.target.value;
    this.state.formData.val_4 = event.target.value;
    this.setState({ quiz_data: newthis.state.quiz_data });
  }
  go_back() {
    window.location.reload();
  }
  render() {
    var newthis = this;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Edit Questions</h1>
        </header>
        {!this.state.submitted && (
          <div className="formContainer">
            <form onSubmit={this.handleSubmit2}>
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
        <br />
        <br />
        {this.state.submitted && (
          <div>
            {this.state.quiz_data.map(function(item, key) {
              return (
                <div className="formContainer">
                  <div className="form-group">
                    Quiz Number{" "}
                    <input
                      type="number"
                      min="1"
                      max="2"
                      className="form-control"
                      id={key}
                      value={item.quiz_no}
                      onChange={newthis.handleQuiz_noChange}
                    />
                    <br />
                  </div>
                  <div className="form-group">
                    Q.
                    {key + 1}
                    <p />
                    <input
                      type="text"
                      className="form-control"
                      id={key}
                      value={item.question}
                      onChange={newthis.handleQuestionChange}
                    />
                  </div>
                  <br />
                  <br />
                  <div className="form-group">
                    Option-1
                    <input
                      type="text"
                      className="form-control"
                      id={key}
                      value={item.option_1}
                      onChange={newthis.handleOption_1Change}
                    />
                    <br />
                  </div>
                  <div className="form-group">
                    Option-2
                    <input
                      type="text"
                      className="form-control"
                      id={key}
                      value={item.option_2}
                      onChange={newthis.handleOption_2Change}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    Option-3
                    <input
                      type="text"
                      id={key}
                      className="form-control"
                      value={item.option_3}
                      onChange={newthis.handleOption_3Change}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    Option-4
                    <input
                      type="text"
                      id={key}
                      className="form-control"
                      value={item.option_4}
                      onChange={newthis.handleOption_4Change}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    Val_1 (1 if true / 0 if false)
                    <input
                      type="number"
                      id={key}
                      min="0"
                      max="1"
                      className="form-control"
                      value={item.val_1}
                      onChange={newthis.handleVal_1Change}
                    />
                    <br />
                  </div>
                  <div className="form-group">
                    Val_2 (1 if true / 0 if false)
                    <input
                      type="number"
                      id={key}
                      className="form-control"
                      min="0"
                      max="1"
                      value={item.val_2}
                      onChange={newthis.handleVal_2Change}
                    />
                    <br />
                  </div>
                  <div className="form-group">
                    Val_3 (1 if true / 0 if false)
                    <input
                      type="number"
                      id={key}
                      className="form-control"
                      min="0"
                      max="1"
                      value={item.val_3}
                      onChange={newthis.handleVal_3Change}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    Val_4 (1 if true / 0 if false)
                    <input
                      type="number"
                      id={key}
                      className="form-control"
                      min="0"
                      max="1"
                      value={item.val_4}
                      onChange={newthis.handleVal_4Change}
                    />
                  </div>
                  <br />
                  <button
                    id={item.id}
                    className="btn btn-success"
                    value={key}
                    type="submit"
                    onClick={newthis.handleSubmit}
                  >
                    Edit
                  </button>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              );
            })}
            <button className="btn btn-primary btn-lg" onClick={this.go_back}>
              Back
            </button>
            <br />
            <br />
            <br />
          </div>
        )}
      </div>
    );
  }
}

export default EditQuestion;
