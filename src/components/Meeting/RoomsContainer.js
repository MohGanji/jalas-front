import React, { Component } from "react";
import { Segment, Card, Modal, Button } from "semantic-ui-react";
import { reserveRoom } from "../utils/fetcher";

export default class RoomsContainer extends Component {
  state = {
    reserveErrored: false,
    reserveErrorMessage: ""
  };

  handleRoomClick(poll, room) {
    reserveRoom(poll.id, room)
      .then(res => {
        console.log(res);
        
        this.props.finalizeMeeting(poll.startDate, poll.endDate, room)
        
        // this.props.finalizeMeeting(poll.startDate, poll.endDate, room)
      })
      .catch(err => {
        console.log(err);
        if(err.message.includes('400')) {
          this.setState({
            reserveErrored: true,
            reserveErrorMessage: "This room is already reserved for this date"
          });
        } else {
          this.setState({
            reserveErrored: true,
            reserveErrorMessage: "Server internal error, please try again later"
          });
        }
      });
  }

  closeModal() {
    this.setState({ reserveErrored: false });
  }

  render() {
    const { rooms, poll } = this.props;
    return (
      <Segment className="rooms-container">
        {rooms.map(room => (
          <Card
            key={room}
            onClick={() => this.handleRoomClick(poll, room)}
            fluid
            header={`Room ${room}`}
          />
        ))}
        <Modal
          open={this.state.reserveErrored}
          onClose={() => this.closeModal()}
          basic
          size="small"
        >
          <Modal.Header content="Error" />
          <Modal.Content>
            <h4>{this.state.reserveErrorMessage}</h4>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" onClick={() => this.closeModal()} inverted>
              Dismiss
            </Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    );
  }
}
