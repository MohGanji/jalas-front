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
          polls: res.data,
        })
      })
      .catch((err) => {
        console.error('TCL: PollList -> componentWillMount -> err', err)
        // alert('Error in fetching polls:', err)
      })
  }

  render() {
    const { polls } = this.state
    return (
      <Container className="polls-list-container">
        <Header as="h3">My Polls</Header>
        {polls.map((poll, ind) => (
          <PollListItem // TO option
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
