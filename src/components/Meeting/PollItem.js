import React, { Component } from "react";
import { Icon, Label, Segment, Message } from "semantic-ui-react";
import RoomsContainer from "./RoomsContainer";
import { getAvailableRooms } from "../utils/fetcher";

class PollItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: null,
      fetchRoomsError: ''
    };
  }

  componentDidUpdate() {
    if (this.props.selected && !this.state.fetchRoomsError.length && this.state.rooms === null) {
      getAvailableRooms(this.props.startDate, this.props.endDate).then(res => {
        console.log("getAvailableRooms: ", res);
        try {
          const rooms = JSON.parse(res.data)
          if(Array.isArray(rooms)) {
            this.setState({ rooms: rooms });
          } else {
            this.setState({fetchRoomsError: res.data})
          }
        } catch (err) {
          this.setState({fetchRoomsError: res.data})
        }
      });
    } else if(!this.props.selected && this.state.fetchRoomsError.length) {
      this.setState({fetchRoomsError: ''})
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
    const { rooms, fetchRoomsError } = this.state;
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
        {selected && fetchRoomsError === '' && <RoomsContainer finalizeMeeting={this.props.finalizeMeeting} poll={this.props} rooms={rooms || []} />}
        {fetchRoomsError.length > 0 && <Segment>{fetchRoomsError}</Segment> }
      </Segment.Group>
    );
  }
}

export default PollItem;
