import React, { Component } from "react";
import "./Meeting.css";
import PollItem from "./PollItem";
import { Container, Header, Card, Message } from "semantic-ui-react";
import { getMeeting } from "../utils/fetcher";

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting: {
        title: "",
        startDate: null,
        endDate: null,
        room: null,
        polls: []
      },
      meetingCreated: false,
      selectedPoll: -1
    };
    this.finalizeMeeting = this.finalizeMeeting.bind(this);

    if (this.props.match.params.id) {
      getMeeting(this.props.match.params.id).then(res => {
        console.log("getMeeting: ", res);
        this.setState(prevState => ({
          meeting: { ...prevState.meeting, ...res.data }
        }));
      });
    }
    this.selectPoll = this.selectPoll.bind(this);
  }

  selectPoll(ind) {
    this.setState({ selectedPoll: ind });
  }

  finalizeMeeting(startDate, endDate, room) {
    this.setState(prevState => ({
      meetingCreated: true,
      meeting: {
        ...prevState.meeting,
        startDate,
        endDate,
        room
      }
    }));
  }

  render() {
    const { meeting } = this.state;
    return (
      <Container className="meeting-container">
        {this.state.meetingCreated ? (
          <Container>
            <Card>
              <Card.Content>
                <Card.Header>{meeting.title}</Card.Header>
                <Card.Meta>
                  from {meeting.startDate} to {meeting.endDate}
                </Card.Meta>
                <Card.Description>{meeting.room}</Card.Description>
              </Card.Content>
            </Card>
            <Message success visible attached="bottom">
              Meeting created successfully
            </Message>
          </Container>
        ) : (
          <Container className="meeting-polls-container">
            <Header as="h3">{meeting.title}</Header>
            {meeting.polls.map((poll, ind) => (
              <PollItem
                key={poll.id}
                id={poll.id}
                selected={this.state.selectedPoll === poll.id}
                selectPoll={this.selectPoll}
                startDate={poll.start_date}
                finalizeMeeting={this.finalizeMeeting}
                endDate={poll.end_date}
                likes={poll.votes_agree}
                dislikes={poll.votes_disagree}
              />
            ))}
          </Container>
        )}
      </Container>
    );
  }
}

export default Meeting;
