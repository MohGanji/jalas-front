import React from 'react'
import { Container, Card } from "semantic-ui-react";

export default function MeetingPreview({ title }) {
  return (
    <Container>
      <Card>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
        </Card.Content>
      </Card>
    </Container>
  );
}
