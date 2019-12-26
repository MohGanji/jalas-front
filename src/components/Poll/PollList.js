import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'
import PollListItem from './PollListItem'

import { getPollsList } from '../utils/fetcher'

export default class PollList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: [],
    }
  }

  componentWillMount() {
    getPollsList()
      .then((res) => {
        console.log('TCL: PollList -> componentWillMount -> getPollsList -> res', res)
        this.setState({
          polls: res.data.polls,
        })
      })
      .catch((err) => {
        console.error('TCL: PollList -> componentWillMount -> err', err)
        this.setState({
          polls: [
            {
              id: '1',
              title: 'Planning session',
              startDate: Date.now(),
              endDate: Date.now(),
              likes: 4,
            },
            {
              id: '2',
              title: 'Planning session',
              startDate: Date.now(),
              endDate: Date.now(),
              likes: 1,
            },
          ],
        })
      })
  }

  render() {
    const { polls } = this.state
    return (
      <Container className="polls-list-container">
        <Header as="h3">My Polls</Header>
        {polls.map((poll, ind) => (
          <PollListItem
            key={poll.id}
            id={poll.id}
            title={poll.title}
            startDate={poll.startDate}
            endDate={poll.endDate}
            likes={poll.likes} // TODO:
          />
        ))}
      </Container>
    )
  }
}
