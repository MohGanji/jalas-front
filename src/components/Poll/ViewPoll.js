import React, { Component } from 'react'
import { Container, Header, Segment, Card, Button, Icon } from 'semantic-ui-react'
import { createVote, getPoll } from '../utils/fetcher'
import CommentsList from '../Comments/CommentsList'

export default class ViewPoll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poll_id: props.match.params.poll_id,
      title: '',
      options: [
        // {
        //   id: "1234",
        //   start_date: "2019-12-13T11:32",
        //   end_date: "2019-12-13T14:32",
        //   vote: 0
        // },
        // {
        //   id: "1235",
        //   start_date: "2019-12-14T11:32",
        //   end_date: "2019-12-14T14:32",
        //   vote: 0
        // },
        // {
        //   id: "1236",
        //   start_date: "2019-12-15T11:32",
        //   end_date: "2019-12-15T14:32",
        //   vote: 0
        // }
      ],
    }
  }

  componentWillMount() {
    getPoll(this.state.poll_id)
      .then((res) => {
        this.setState({
          title: res.data.title,
          options: res.data.options_set.map((option) => {
            const userVotes = option.votes_set.filter((vote) => vote.person.email === this.state.user_email)
            return {
              ...option,
              vote: userVotes.length ? 1 : 0,
            }
          }),
        })
      })
      .catch((err) => console.error)
  }

  voteOption(optionId, vote) {
    createVote(optionId, vote)
      .then((data) => {
        this.setState((prev) => ({
          options: prev.options.map((op) => {
            return op.id === optionId ? { ...op, vote: vote } : op
          }),
        }))
      })
      .catch((error) => {
        alert('Server Error: ', error)
      })
  }

  render() {
    let { poll_id, title, options } = this.state
    console.log('ssss: ', this.state)
    return (
      <Container>
        <Header size="large">Poll Info</Header>
        <Segment>
          <Header size="medium">{title}</Header>

          <Segment className="poll-options-list">
            <Header size="medium">Options:</Header>
            {options.map((option, ind) => (
              <Card key={option.id} fluid>
                <Card.Content>
                  from {option.start_date} to {option.end_date}
                  <Button
                    floated="right"
                    onClick={() => this.voteOption(option.id, 1)}
                    basic
                    disabled={option.vote === 1}
                    color="green"
                  >
                    <Icon name="thumbs up" />
                    Upvote
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Segment>
        </Segment>
        <Segment>
          <CommentsList poll_id={poll_id} />
        </Segment>
      </Container>
    )
  }
}
