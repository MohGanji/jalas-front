import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getMeetingList } from '../utils/fetcher'
import Footer from '../Footer/Footer'
import MeetingPreview from '../Meeting/MeetingPreview'

export default class MeetingList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      meetings: [],
    }
  }

  componentDidMount() {
    getMeetingList().then((res) => {
      console.log('getMeetingList: ', res.data)
      this.setState({ meetings: res.data })
    })
  }

  render() {
    const { meetings } = this.state

    return (
      <div>
        {meetings.map((meeting, ind) => (
          <Link key={ind} to={`/polls/manage/1`}>
            <MeetingPreview title={meeting.title} />
          </Link>
        ))}
        <Footer />
      </div>
    )
  }
}
