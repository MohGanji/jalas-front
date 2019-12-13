import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Header,
  Segment,
  Card,
  Button,
  Icon
} from "semantic-ui-react";
import { createVote } from "../utils/fetcher";

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
        { id: '1234', start_date: "2019-12-13T11:32", end_date: "2019-12-13T14:32" },
        { id: '1235', start_date: "2019-12-14T11:32", end_date: "2019-12-14T14:32" },
        { id: '1236', start_date: "2019-12-15T11:32", end_date: "2019-12-15T14:32" },
      ],
      user_email: ""
    };
  }
  componentWillMount() {
    const poll_id = this.props.match.params.poll_id;
    if (poll_id) {
      console.log("hereee: ", poll_id);
      // getPoll and setState
    }
  }

  voteOption(optionId, vote) {
    let user_email
    if(!this.state.user_email) {
        user_email = prompt('Please enter your email');
        this.setState({user_email})
    }
    createVote(this.state.user_email || user_email, optionId, vote).then().catch()
  }

  render() {
    const { title, options } = this.state;
    console.log(this.state);
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
                    color="green"
                  >
                    <Icon name="thumbs up" />
                    Upvote
                  </Button>
                  <Button
                    floated="right"
                    onClick={() => this.voteOption(option.id, -1)}
                    basic
                    color="orange"
                  >
                    <Icon name="thumbs down" />
                    Downvote
                  </Button>
                </Card.Content>
              </Card>
            ))}
          </Segment>
        </Segment>
      </Container>
    );
  }
}
