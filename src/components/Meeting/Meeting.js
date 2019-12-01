import React from 'react';
import './Meeting.css'
import PollItem from './PollItem';
import { Container, Header } from 'semantic-ui-react';

function Meeting({title, polls}) {
  return (
    <Container className="meeting-container">
      <Container className="meeting-polls-container">
        <Header as="h3">{title}</Header>
        <div className="meeting-title"></div>
        {polls.map((poll, ind) => {
          return (<PollItem key={ind} date={poll.date} likes={poll.likes} dislikes={poll.dislikes} />)
        })}
      </Container>
    </Container>
  );
}

export default Meeting;
