import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

export default class PollListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectTo: '',
    }
  }

  redirectTo(uri) {
    this.setState({
      redirectTo: uri,
    })
  }

  render() {
    const { startDate, endDate, likes, title, id } = this.props
    const { redirectTo } = this.state
    return redirectTo ? (
      <Redirect to={redirectTo} />
    ) : (
      // TODO: edit or view poll
      <Card key={id} fluid onClick={() => this.redirectTo(`/poll/${this.props.id}`)}>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          {/* <Card.Meta>
            <b> from </b>
            {new Date(startDate).toLocaleString()}
          </Card.Meta>
          <Card.Meta>
            <b> to </b>
            {new Date(endDate).toLocaleString()}
          </Card.Meta> */}
        </Card.Content>
        {/* <Card.Content extra>
          <Icon name="thumbs up" />
          {likes} Votes
        </Card.Content> */}
      </Card>
    )
  }
}
