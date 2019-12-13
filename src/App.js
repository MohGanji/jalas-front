import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Meeting from "./components/Meeting/Meeting";
import MeetingList from "./components/MeetingList/MeetingList";
import CreatePoll from "./components/Poll/CreatePoll";
import Poll from "./components/Poll/Poll";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <Switch>
            <Route path="/meeting/:id" component={Meeting} />
            <Route path="/createPoll" component={CreatePoll} />
            <Route path="/editPoll/:poll_id" component={CreatePoll} />
            <Route path="/poll/:poll_id" component={Poll} />
            <Route path="/">
              <MeetingList />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
