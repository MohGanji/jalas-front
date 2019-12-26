import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Meeting from './components/Meeting/Meeting'
import MeetingList from './components/MeetingList/MeetingList'
import CreateOrEditPoll from './components/Poll/CreateOrEditPoll'
import ViewPoll from './components/Poll/ViewPoll'
import CommentsList from './components/Comments/CommentsList'
import PollList from './components/Poll/PollList'
import MyMeetingList from './components/Meeting/MyMeetingList'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-container">
          <Switch>
            {/* meetings */}
            <Route path="/meetings" component={MyMeetingList} />

            {/* meeting */}
            <Route path="/meeting/:id" component={Meeting} />
            {/* polls */}
            <Route path="/polls/" component={PollList} />
            {/* poll */}
            <Route path="/poll/:poll_id/view" component={ViewPoll} />
            <Route path="/poll/:poll_id/comments" component={CommentsList} />
            <Route path="/poll/:poll_id" component={CreateOrEditPoll} />
            <Route path="/poll/" component={CreateOrEditPoll} />
            {/* root */}
            <Route path="/">
              <MeetingList />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
