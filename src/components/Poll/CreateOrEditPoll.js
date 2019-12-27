import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Form, Header, Segment, Card, Button } from 'semantic-ui-react'
import { createOrUpdatePoll, getPoll } from '../utils/fetcher'
import { renderDate } from '../utils/dateUtils'

export default class CreateOrEditPoll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poll_id: props.match.params.poll_id || '',
      title: '',
      options: [
        // { start_date: "2019-12-13T11:32", end_date: "2019-12-13T13:32" }
      ],
      guests: [
        // {email: "someone@gmail"}
      ],
      currentOptionStartDate: '',
      currentOptionEndDate: '',
      currentGuest: '',
      submitted: false,
      new_poll_id: '',
    }
    this.handleValueChange = this.handleValueChange.bind(this)
  }
  componentDidMount() {
    const poll_id = this.props.match.params.poll_id
    if (poll_id) {
      getPoll(poll_id)
        .then((res) => {
          console.log('data: ', res)
          this.setState({
            poll_id: res.data.id,
            title: res.data.title,
            options: res.data.options_set,
            guests: res.data.attendees,
          })
        })
        .catch((err) => {
          console.error(err)
          alert(err)
          // this.setState({
          //   poll_id: poll_id,
          //   title: 'some old title',
          //   options: [{ start_date: '2019-12-13T11:32', end_date: '2019-12-13T13:32' }],
          //   guests: [{ email: 'someone@gmail' }],
          // })
        })
    }
  }

  handleValueChange(event, field) {
    this.setState({ [field]: event.target.value })
  }

  addOption() {
    const { currentOptionStartDate: start_date, currentOptionEndDate: end_date } = this.state
    if (!end_date || !start_date) {
      return alert('Start Date and End Date are required')
    } else if (end_date <= start_date) {
      return alert('Start Date should be smaller than end Date')
    } else {
      this.setState((prevState) => ({
        options: [...prevState.options, { start_date, end_date }],
        currentOptionStartDate: '',
        currentOptionEndDate: '',
      }))
    }
  }
  removeOption(ind) {
    this.setState((prev) => ({
      options: [...prev.options.slice(0, ind), ...prev.options.slice(ind + 1)],
    }))
  }

  addGuest() {
    const { currentGuest } = this.state
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (!currentGuest) {
      alert('guest email address cannot be empty!')
    } else if (!emailRegex.test(currentGuest)) {
      alert('You should enter a valid Email address!')
    } else {
      this.setState((prevState) => ({
        guests: [...prevState.guests, { email: currentGuest }],
        currentGuest: '',
      }))
    }
  }
  removeGuest(ind) {
    this.setState((prev) => ({
      guests: [...prev.guests.slice(0, ind), ...prev.guests.slice(ind + 1)],
    }))
  }

  submitForm(event) {
    event.preventDefault()
    createOrUpdatePoll(this.state)
      .then((res) => {
        this.setState({ submitted: true, new_poll_id: res.data.id })
      })
      .catch((err) => {
        console.error('Error in creating poll: ', err)
      })
  }

  render() {
    const {
      poll_id,
      title,
      options,
      guests,
      currentOptionEndDate,
      currentOptionStartDate,
      currentGuest,
      submitted,
      new_poll_id,
    } = this.state
    // console.log(this.state);
    return submitted && new_poll_id ? (
      <Redirect to={`/poll/${new_poll_id}/edit`} />
    ) : (
      <Container>
        <Segment>
          <Header size="large"> {poll_id ? 'Edit Poll' : 'Create Poll'}</Header>
          <Form>
            <Form.Field inline className="poll-title">
              <label> Title </label>
              <input
                type="text"
                value={title}
                onChange={(e) => this.handleValueChange(e, 'title')}
                placeholder="Poll Title"
              ></input>
            </Form.Field>

            <Form.Group className="poll-add-option">
              <Form.Field inline>
                <label>Start Date</label>
                <input
                  type="datetime-local"
                  value={currentOptionStartDate}
                  onChange={(e) => this.handleValueChange(e, 'currentOptionStartDate')}
                ></input>
              </Form.Field>
              <Form.Field inline>
                <label>End Date</label>
                <input
                  type="datetime-local"
                  value={currentOptionEndDate ? currentOptionEndDate : currentOptionStartDate}
                  onChange={(e) => this.handleValueChange(e, 'currentOptionEndDate')}
                ></input>
              </Form.Field>
              <Form.Button type="button" onClick={(e) => this.addOption(e)}>
                Add Option
              </Form.Button>
            </Form.Group>
            {!!options.length && (
              <Segment className="poll-options-list">
                <Header size="medium">Options:</Header>
                {options.map((option, ind) => (
                  <Card key={ind} fluid>
                    <Card.Content>
                      from {renderDate(option.start_date)} to {renderDate(option.end_date)}
                      <Button floated="right" onClick={() => this.removeOption(ind)} basic color="red">
                        Remove
                      </Button>
                    </Card.Content>
                  </Card>
                ))}
              </Segment>
            )}

            <Form.Group className="poll-add-guest">
              <Form.Field inline>
                <label>New Guest</label>
                <input
                  type="email"
                  placeholder="guest@mail.com"
                  value={currentGuest}
                  onChange={(e) => this.handleValueChange(e, 'currentGuest')}
                ></input>
              </Form.Field>
              <Form.Button type="button" onClick={(e) => this.addGuest(e)}>
                Add Guest
              </Form.Button>
            </Form.Group>
            {!!guests && !!guests.length && (
              <Segment className="poll-guests-list">
                <Header size="medium">Guests:</Header>
                {guests.map((item, ind) => (
                  <Card key={ind} fluid>
                    <Card.Content>
                      {item.email}
                      <Button floated="right" onClick={() => this.removeGuest(ind)} basic color="red">
                        Remove
                      </Button>
                    </Card.Content>
                  </Card>
                ))}
              </Segment>
            )}
            <Form.Button primary type="submit" onClick={(e) => this.submitForm(e)}>
              {poll_id ? 'Update Poll' : 'Create Poll'}
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    )
  }
}
