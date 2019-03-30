import React, { Component } from "react";
import "./register.css";

class CreateQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        type: 0,
        question: "",
        image: "",
        audio: "",
        genre: "",
        option_1: "",
        option_2: "",
        option_3: "",
        option_4: "",
        val_1: 0,
        val_2: 0,
        val_3: 0,
        val_4: 0,
        quiz_no: 0
      },
      no_option_selected: false,
      submitted: false
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleOption_1Change = this.handleOption_1Change.bind(this);
    this.handleOption_2Change = this.handleOption_2Change.bind(this);
    this.handleOption_3Change = this.handleOption_3Change.bind(this);
    this.handleOption_4Change = this.handleOption_4Change.bind(this);
    this.handleQuiz_noChange = this.handleQuiz_noChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // console.log(document.getElementById("pic").files[0]);
    // console.log(document.getElementById("music").files[0].name);
    // console.log("Done");
    if (document.getElementById("pic").files[0])
      this.state.formData.image = document.getElementById("pic").files[0].name;
    else this.state.formData.image = "";
    if (document.getElementById("music").files[0])
      this.state.formData.audio = document.getElementById(
        "music"
      ).files[0].name;
    else this.state.formData.audio = "";
    var temp = document.getElementById("quiz_no");
    this.state.formData.quiz_no = parseInt(
      temp.options[temp.selectedIndex].value
    );
    var temp2 = document.getElementById("genre");
    this.state.formData.genre = temp2.options[temp2.selectedIndex].value;
    // console.log(this.state.submitted);
    // console.log(this.state.formData.quiz_no);
    // console.log(this.state.formData.genre);
    if (document.getElementById("1").checked) {
      this.state.formData.val_1 = 1;
    }
    if (document.getElementById("2").checked) {
      this.state.formData.val_2 = 1;
    }
    if (document.getElementById("3").checked) {
      this.state.formData.val_3 = 1;
    }
    if (document.getElementById("4").checked) {
      this.state.formData.val_4 = 1;
    }
    if (
      this.state.formData.val_1 +
        this.state.formData.val_2 +
        this.state.formData.val_3 +
        this.state.formData.val_4 ===
      0
    ) {
      this.setState({ no_option_selected: true });
    } else {
      if (
        this.state.formData.val_1 +
          this.state.formData.val_2 +
          this.state.formData.val_3 +
          this.state.formData.val_4 ===
        1
      )
        this.state.formData.type = 0;
      else this.state.formData.type = 1;
      console.log(this.state.formData.type + " = type");
      fetch("http://localhost:8080/question", {
        method: "POST",
        body: JSON.stringify(this.state.formData)
      }).then(response => {
        if (response.status >= 200 && response.status < 300) {
          this.setState({ submitted: true });
          console.log("hello");
          console.log(this.state.submitted);
        }
        // window.location.reload();
      });
      console.log(this.state.submitted);
      console.log(this.state.formData.question);
    }
  }

  handleQuestionChange(event) {
    this.state.formData.question = event.target.value;
  }
  handleImageChange(event) {
    this.state.formData.image = event.target.value;
  }
  handleGenreChange(event) {
    this.state.formData.genre = event.target.value;
  }
  handleOption_1Change(event) {
    this.state.formData.option_1 = event.target.value;
  }
  handleOption_2Change(event) {
    this.state.formData.option_2 = event.target.value;
  }
  handleOption_3Change(event) {
    this.state.formData.option_3 = event.target.value;
  }
  handleOption_4Change(event) {
    this.state.formData.option_4 = event.target.value;
  }
  handleQuiz_noChange(event) {
    this.state.formData.quiz_no = event.target.value;
  }
  add_more = () => {
    {
      console.log("hello");
      this.setState({ no_option_selected: false });
      window.location.reload();
    }
  };
  render() {
    if (!this.state.submitted) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Add question</h1>
          </header>
          <br />
          <br />
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Question</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.question}
                  onChange={this.handleQuestionChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Genre</label>
                <br />
                <select className="form-control" id="genre">
                  <option value="Politics">Politics</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
              <div className="form-group">
                <label>Quiz Number</label>
                <br />
                <select className="form-control" id="quiz_no">
                  <option value="1">Quiz-1</option>
                  <option value="2">Quiz-2</option>
                </select>
              </div>
              <div className="form-group">
                <label>Image:</label>
                <br />
                <input
                  type="file"
                  value={this.state.image}
                  onChange={this.handleImageChange}
                  id="pic"
                  accept="image/*"
                />
              </div>
              <div className="form-group">
                <label>Audio:</label>
                <input
                  type="file"
                  value={this.state.image}
                  onChange={this.handleImageChange}
                  id="music"
                  accept="audio/*"
                />
              </div>
              <div className="form-group">
                <label>Option 1</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.option_1}
                  onChange={this.handleOption_1Change}
                  required
                />
              </div>
              <div className="form-group">
                <label>Option 2</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.option_2}
                  onChange={this.handleOption_2Change}
                  required
                />
              </div>
              <div className="form-group">
                <label>Option 3</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.option_3}
                  onChange={this.handleOption_3Change}
                  required
                />
              </div>
              <div className="form-group">
                <label>Option 4</label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.option_4}
                  onChange={this.handleOption_4Change}
                  required
                />
              </div>
              <h3>Answers:</h3>
              <br />

              <div className="form-group">
                <input className="form-control" type="checkbox" id="1" />
                Option A<br />
                <input className="form-control" type="checkbox" id="2" />
                Option B<br />
                <input className="form-control" type="checkbox" id="3" />
                Option C<br />
                <input className="form-control" type="checkbox" id="4" />
                Option D<br />
              </div>
              {this.state.no_option_selected && (
                <ul>
                  <li style={{ color: "red" }}>
                    Atleast one option should be selected.
                  </li>
                </ul>
              )}
              <button type="submit" className="btn btn-default">
                Submit
              </button>
            </form>
          </div>
          <br />
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h1> Add more questions.</h1>
          </header>
          <h2> Question successfully Added.</h2>
          <br />
          <br />
          <button
            className="btn btn-primary btn-lg"
            onClick={this.add_more}
            value="Add more questions."
          >
            Add more questions.
          </button>
        </div>
      );
    }
  }
}

export default CreateQuestion;
