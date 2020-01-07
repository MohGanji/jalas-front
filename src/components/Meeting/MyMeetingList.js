import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import MeetingListItem from './MeetingListItem'

import { getMyMeetingsList } from '../utils/fetcher'

export default class MyMeetingList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetings: [],
    }
  }

  componentWillMount() {
    getMyMeetingsList()
      .then((res) => {
        this.setState({
          meetings: res.data,
        })
      })
      .catch((err) => {
        this.setState({
          meetings: [
            // {
            //   id: '1',
            //   title: 'Planning session',
            //   startDate: Date.now(),
            //   endDate: Date.now(),
            //   room: '404',
            // },
            // {
            //   id: '2',
            //   title: 'Planning session',
            //   startDate: Date.now(),
            //   endDate: Date.now(),
            //   room: '401',
            // },
          ],
        })
      })
  }

  render() {
    const { meetings } = this.state
    return (
      <Container className="meetings-list-container">
        <Header as="h3">My Meetings</Header>
        {meetings.map((meeting, ind) => (
          <MeetingListItem
            key={meeting.id}
            id={meeting.id}
            title={meeting.title}
            startDate={meeting.startDate}
            endDate={meeting.endDate}
            room={meeting.room} // TODO:
          />
        ))}
      </Container>
    )
  }
}
