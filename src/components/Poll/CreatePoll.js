import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Form,
  Header,
  Segment,
  Card,
  Button
} from "semantic-ui-react";
import { createPoll } from "../utils/fetcher";

export default class CreatePoll extends Component {
  // static propTypes = {
  //     prop: PropTypes
  // }
  constructor(props) {
    super(props);
    this.state = {
      poll_id: "",
      title: "",
      options: [
        { start_date: "2019-12-13T11:32", end_date: "2019-12-13T13:32" }
      ],
      guests: ["someone@gmail"],
      currentOptionStartDate: "",
      currentOptionEndDate: "",
      currentGuest: ""
    };
    this.handleValueChange = this.handleValueChange.bind(this);
  }
  componentDidMount() {
    const poll_id = this.props.match.params.poll_id;
    if (poll_id) {
      console.log("hereee: ", poll_id);
      // getPoll and setState
    }
  }

  handleValueChange(event, field) {
    this.setState({ [field]: event.target.value });
  }

  addOption() {
    const {
      currentOptionStartDate: start_date,
      currentOptionEndDate: end_date
    } = this.state;
    if (!end_date || !start_date) {
      return alert("Start Date and End Date are required");
    } else if (end_date <= start_date) {
      return alert("Start Date should be smaller than end Date");
    } else {
      this.setState(prevState => ({
        options: [...prevState.options, { start_date, end_date }],
        currentOptionStartDate: "",
        currentOptionEndDate: ""
      }));
    }
  }
  removeOption(ind) {
    this.setState(prev => ({
      options: [...prev.options.slice(0, ind), ...prev.options.slice(ind + 1)]
    }));
  }

  addGuest() {
    const { currentGuest } = this.state;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!currentGuest) {
      alert("guest email address cannot be empty!");
    } else if (!emailRegex.test(currentGuest)) {
      alert("You should enter a valid Email address!");
    } else {
      this.setState(prevState => ({
        guests: [...prevState.guests, currentGuest],
        currentGuest: ""
      }));
    }
  }
  removeGuest(ind) {
    this.setState(prev => ({
      guests: [...prev.guests.slice(0, ind), ...prev.guests.slice(ind + 1)]
    }));
  }

  submitForm(event) {
    event.preventDefault();
    createPoll(this.state);
  }

  render() {
    const {
      pollId,
      title,
      options,
      guests,
      currentOptionEndDate,
      currentOptionStartDate,
      currentGuest
    } = this.state;
    console.log(this.state);
    return (
      <Container>
        <Segment>
          <Header size="large">Create Poll</Header>
          <Form>
            <Form.Field inline className="poll-title">
              <label> Title </label>
              <input
                type="text"
                value={title}
                onChange={e => this.handleValueChange(e, "title")}
                placeholder="Poll Title"
              ></input>
            </Form.Field>

            <Form.Group className="poll-add-option">
              <Form.Field inline>
                <label>Start Date</label>
                <input
                  type="datetime-local"
                  value={currentOptionStartDate}
                  onChange={e =>
                    this.handleValueChange(e, "currentOptionStartDate")
                  }
                ></input>
              </Form.Field>
              <Form.Field inline>
                <label>End Date</label>
                <input
                  type="datetime-local"
                  value={
                    currentOptionEndDate
                      ? currentOptionEndDate
                      : currentOptionStartDate
                  }
                  onChange={e =>
                    this.handleValueChange(e, "currentOptionEndDate")
                  }
                ></input>
              </Form.Field>
              <Form.Button type="button" onClick={e => this.addOption(e)}>
                Add Option
              </Form.Button>
            </Form.Group>
            {!!options.length && (
              <Segment className="poll-options-list">
                <Header size="medium">Options:</Header>
                {options.map((option, ind) => (
                  <Card key={ind} fluid>
                    <Card.Content>
                      from {option.start_date} to {option.end_date}
                      <Button
                        floated="right"
                        onClick={() => this.removeOption(ind)}
                        basic
                        color="red"
                      >
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
                  onChange={e => this.handleValueChange(e, "currentGuest")}
                ></input>
              </Form.Field>
              <Form.Button type="button" onClick={e => this.addGuest(e)}>
                Add Guest
              </Form.Button>
            </Form.Group>
            {!!guests.length && (
              <Segment className="poll-guests-list">
                <Header size="medium">Guests:</Header>
                {guests.map((item, ind) => (
                  <Card key={ind} fluid>
                    <Card.Content>
                      {item}
                      <Button
                        floated="right"
                        onClick={() => this.removeGuest(ind)}
                        basic
                        color="red"
                      >
                        Remove
                      </Button>
                    </Card.Content>
                  </Card>
                ))}
              </Segment>
            )}
            <Form.Button
              primary
              type="submit"
              onClick={e => this.submitForm(e)}
            >
              Submit Poll
            </Form.Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}
