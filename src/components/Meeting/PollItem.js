import React from "react";
import { Icon, Container, Label, Segment, List, Button, Message } from "semantic-ui-react";

function PollItem({ date, likes, dislikes }) {
  return (
    <Segment.Group horizontal>
      <Segment className="poll-item">
        <Label size="large" basic horizontal>
          {date}
        </Label>
        <Label>
          <Icon circular inverted name="thumbs up" /> {likes}
        </Label>
        <Label>
          <Icon circular name="thumbs down" /> {dislikes}
        </Label>
      </Segment>
      <Segment className="rooms-container">
        <List verticalAlign="middle">
          <List.Item>
            <List.Content floated="right">
              <Button>Reserve</Button>
            </List.Content>
            <List.Content>Room1</List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="right">
              <Button>Reserve</Button>
            </List.Content>
            <List.Content>Room2</List.Content>
          </List.Item>
          <List.Item>
            <List.Content floated="right">
              <Button>Reserve</Button>
            </List.Content>
            <List.Content>Room3</List.Content>
          </List.Item>
          <Message error hidden >Room is reserved</Message>
        </List>
      </Segment>
    </Segment.Group>
  );
}

export default PollItem;
