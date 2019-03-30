import React, { Component } from "react";
import DeletePerson from "./DeletePerson";
import ViewPeople from "./ViewPeople";
import Register from "./register";
import Login from "./login";
import Logout from "./logout";
import CreateQuestion from "./createQuestion";
import ViewQuestions from "./viewQuestions";
import Home from "./Home";
import ViewCategories from "./viewCategories";
import ViewQuizzes from "./viewQuiz";
import TakeQuiz from "./takeQuiz";
import History from "./history";
import Leaderboard from "./Leaderboard";
import DeleteQuiz from "./DeleteQuiz";
import EditQuestion from "./EditQuestion";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    if (localStorage.getItem("loggedIn") == 0) {
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={"/"}>
                      Quiz App
                    </Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={"/register"}>Sign-up</Link>
                    </li>
                    <li>
                      <Link to={"/login"}>Login</Link>
                    </li>
                    <li>
                      <Link to={"/Leaderboard"}>Leaderboard</Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/Leaderboard" component={Leaderboard} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    } else if (localStorage.getItem("loggedIn") == 2) {
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={"/"}>
                      Quiz App
                    </Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={"/ViewPeople"}>View People</Link>
                    </li>
                    <li>
                      <Link to={"/DeletePerson"}>Delete Person</Link>
                    </li>
                    <li>
                      <Link to={"/createQuestion"}>Create Questions</Link>
                    </li>
                    <li>
                      <Link to={"/viewQuestions"}>View Questions</Link>
                    </li>
                    <li>
                      <Link to={"/EditQuestion"}>Edit Questions</Link>
                    </li>
                    <li>
                      <Link to={"/viewCategories"}>View/Delete Questions</Link>
                    </li>
                    <li>
                      <Link to={"/viewQuiz"}>View Quizzes</Link>
                    </li>
                    <li>
                      <Link to={"/DeleteQuiz"}>Delete Quiz</Link>
                    </li>
                    <li>
                      <Link to={"/Leaderboard"}>Leaderboard</Link>
                    </li>
                    <li>
                      <Link to={"/logout"}>Logout</Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/ViewPeople" component={ViewPeople} />
                <Route exact path="/DeletePerson" component={DeletePerson} />
                <Route
                  exact
                  path="/createQuestion"
                  component={CreateQuestion}
                />
                <Route exact path="/viewQuestions" component={ViewQuestions} />
                <Route exact path="/EditQuestion" component={EditQuestion} />
                <Route
                  exact
                  path="/viewCategories"
                  component={ViewCategories}
                />
                <Route exact path="/viewQuiz" component={ViewQuizzes} />
                <Route exact path="/DeleteQuiz" component={DeleteQuiz} />

                <Route exact path="/Leaderboard" component={Leaderboard} />
                <Route exact path="/logout" component={Logout} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    } else {
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={"/"}>
                      Quiz App
                    </Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li>
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                      <Link to={"/TakeQuiz"}>Attempt a Quiz</Link>
                    </li>
                    <li>
                      <Link to={"/History"}>My History</Link>
                    </li>
                    <li>
                      <Link to={"/Leaderboard"}>Leaderboard</Link>
                    </li>
                    <li>
                      <Link to={"/logout"}>Logout</Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/TakeQuiz" component={TakeQuiz} />
                <Route exact path="/History" component={History} />
                <Route exact path="/Leaderboard" component={Leaderboard} />
                <Route exact path="/logout" component={Logout} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
