import React, { Component } from "react";
import { Icon, Label, Segment, Message } from "semantic-ui-react";
import RoomsContainer from "./RoomsContainer";
import { getAvailableRooms } from "../utils/fetcher";

class PollItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  componentDidUpdate() {
    if (this.props.selected) {
      getAvailableRooms(this.props.startDate, this.props.endDate).then(res => {
        console.log("getAvailableRooms: ", res);
        if (res.data && Array.isArray(res.data)) {
          this.setState({ rooms: res.data });
        }
      });
    }
  }

  render() {
    const {
      startDate,
      endDate,
      likes,
      dislikes,
      selected,
      selectPoll,
      id
    } = this.props;
    const { rooms, roomsFetchErrored } = this.state;
    return (
      <Segment.Group horizontal>
        <Segment className="poll-item">
          <Label>
            <Icon circular inverted name="thumbs up" /> {likes}
          </Label>
          <Label>
            <Icon circular name="thumbs down" /> {dislikes}
          </Label>
          <Label
            onClick={() => selectPoll(id)}
            className="clickable"
            size="large"
            basic
            horizontal
          >
            <b> from </b>
            {new Date(startDate).toLocaleString()}
            <b> to </b>
            {new Date(endDate).toLocaleString()}
          </Label>
        </Segment>
        {selected && <RoomsContainer finalizeMeeting={this.props.finalizeMeeting} poll={this.props} rooms={rooms} />}
      </Segment.Group>
    );
  }
}

export default PollItem;
