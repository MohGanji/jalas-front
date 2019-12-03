import React, { Component } from "react";
import "./Meeting.css";
import PollItem from "./PollItem";
import { Container, Header, Card, Message, Button } from "semantic-ui-react";
import { getMeeting, cancelMeetingReservation } from "../utils/fetcher";

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting: {
        id: this.props.match.params.id,
        title: "",
        startDate: null,
        endDate: null,
        room: null,
        status: "",
        polls: []
      },
      meetingCreated: false,
      selectedPoll: -1,
    };
    this.finalizeMeeting = this.finalizeMeeting.bind(this);
    this.checkMeetingStatus = this.checkMeetingStatus.bind(this);
    this.cancelReservation = this.cancelReservation.bind(this);

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
    const interval = setInterval(() => {
      this.checkMeetingStatus();
    }, 1000);
    this.setState(prevState => ({
      meetingCreated: true,
      meeting: {
        ...prevState.meeting,
        status: 1, // pending
        startDate,
        endDate,
        room,
        checkMeetingStatusInterval: interval
      }
    }));
  }

  cancelReservation() {
    cancelMeetingReservation(this.state.meeting.id).then(res=> {
      clearInterval(this.state.checkMeetingStatusInterval);
      this.setState(prevState => ({
        meeting: {
          ...prevState.meeting,
          status: 0,
          startDate: null,
          endDate: null,
          room: null
        },
        meetingCreated: false,
        checkMeetingStatusInterval: null,
        selectedPoll: -1
      }));
    })
    
  }

  checkMeetingStatus() {
    getMeeting(this.state.meeting.id).then(res => {
      if (res.data.status === 2) {
        clearInterval(this.state.checkMeetingStatusInterval);
        this.setState(prevState => ({
          meeting: {
            ...prevState.meeting,
            ...res.data
          },
          meetingCreated: true,
          checkMeetingStatusInterval: null
        }));
      }
    });
  }

  render() {
    const { meeting } = this.state;
    return (
      <Container className="meeting-container">
        {this.state.meetingCreated && this.state.meeting.status !== 0 ? (
          <Container>
            <Card fluid>
              <Card.Content>
                <Card.Header>{meeting.title}</Card.Header>
                <Card.Meta>
                  from {meeting.startDate} to {meeting.endDate}
                </Card.Meta>
                <Card.Description>At Room {meeting.room}</Card.Description>
                <Card.Content extra>
                  Status: {meeting.status === 1 ? "Pending" : "Finalized"}
                  {meeting.status === 1 && (<Button floated="right" onClick={() => this.cancelReservation()} basic color="red">
                    Cancel
                  </Button>)}
                </Card.Content>
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
