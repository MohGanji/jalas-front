import React, { Component } from 'react'
import { getPollComments, createComment } from '../utils/fetcher'
import { Container, Header, Comment, Form, Button } from 'semantic-ui-react'

export default class CommentsList extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      poll_id: props.poll_id || props.match ? props.match.params.poll_id : '',
      comments: [],
      newComment: '',
    }
  }
  componentDidMount() {
    getPollComments(this.state.poll_id)
      .then((res) => {
        // TODO:
        this.setState({
          comments: res.data,
        })
      })
      .catch((err) => {
        console.error(err)
        // TODO:
        this.setState({
          comments: [
            {
              id: '1',
              text: 'This was the shitttiest text ',
              user: 'some user',
              createdAt: new Date(),
            },
            {
              id: '2',
              text: 'This was the shitttiest text ',
              user: 'some user',
              createdAt: new Date(),
            },
            {
              id: '3',
              text: 'This was the shitttiest text ',
              user: 'some user',
              createdAt: new Date(),
            },
          ],
        })
      })
  }

  handleValueChange(event, field) {
    this.setState({ [field]: event.target.value })
  }

  addComment(e) {
    const { poll_id, newComment } = this.state
    createComment(poll_id, newComment)
      .then((res) => {
        // TODO:
      })
      .catch(console.error)
  }

  render() {
    const { comments, newComment } = this.state
    return (
      <Container>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>

          {comments.map((comment, ind) => (
            <Comment key={comment.id}>
              <Comment.Content>
                <Comment.Author>{comment.user}</Comment.Author>
                <Comment.Metadata>
                  <div>{comment.createdAt.toString()}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}

          <Form reply>
            <Form.TextArea value={newComment} onChange={(e) => this.handleValueChange(e, 'newComment')} />
            <Button content="Add Comment" onClick={this.addComment()} labelPosition="left" icon="edit" primary />
          </Form>
        </Comment.Group>
      </Container>
    )
  }
}
