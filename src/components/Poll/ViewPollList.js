import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getMeetingList } from '../utils/fetcher'
import MeetingPreview from '../Meeting/MeetingPreview'
import { Header } from 'semantic-ui-react'
import PollListItem from './PollListItem'

export default class ViewPollList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: [],
    }
  }

  componentDidMount() {
    getMeetingList().then((res) => {
      console.log('getMeetingList: ', res.data)
      this.setState({ polls: res.data })
    })
  }

  render() {
    const { polls } = this.state

    return (
      <div>
        <Header as="h3">Active Polls</Header>
        {polls.map((poll, ind) => (
          <Link key={ind} to={`/poll/${poll.id}/view/`}>
            <PollListItem title={poll.title} />
          </Link>
        ))}
      </div>
    )
  }
}
