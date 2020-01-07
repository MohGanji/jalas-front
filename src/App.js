import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Meeting from './components/Meeting/Meeting'
import MeetingList from './components/MeetingList/MeetingList'
import CreateOrEditPoll from './components/Poll/CreateOrEditPoll'
import ViewPoll from './components/Poll/ViewPoll'
import CommentsList from './components/Comments/CommentsList'
import PollList from './components/Poll/PollList'
import ViewPollList from './components/Poll/ViewPollList'
import MyMeetingList from './components/Meeting/MyMeetingList'
import Login from './components/Login/Login'
import Header from './components/Header/Header'
import { Container } from 'semantic-ui-react'
import NotificationSetting from './components/Notification/NotificationSetting'

function isAuthenticated() {
  return !!localStorage.getItem('session')
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect push to="/login" />)} />
)

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <Container>
          <Router>
            <div>
              <Switch>
                {/* auth */}
                <Route path="/login" component={Login} />

                {/* meetings */}
                <ProtectedRoute path="/meetings" component={MyMeetingList} />
                {/* notifs */}
                <ProtectedRoute path="/notif" component={NotificationSetting} />
                {/* polls */}
                <ProtectedRoute path="/polls/manage/:id" component={Meeting} />
                <ProtectedRoute path="/polls/invited" component={ViewPollList} />
                <ProtectedRoute path="/polls/" component={PollList} />
                {/* poll */}
                <ProtectedRoute path="/poll/:poll_id/view" component={ViewPoll} />
                <ProtectedRoute path="/poll/:poll_id/edit" component={CreateOrEditPoll} />
                <ProtectedRoute path="/poll/:poll_id/comments" component={CommentsList} />
                <ProtectedRoute path="/poll/:poll_id" component={CreateOrEditPoll} />
                <ProtectedRoute path="/poll/" component={CreateOrEditPoll} />
                {/* root */}
                <ProtectedRoute path="/" component={MeetingList} />
              </Switch>
            </div>
          </Router>
        </Container>
      </div>
    )
  }
}

export default App
