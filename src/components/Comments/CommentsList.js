import React, { Component } from 'react'
import { getPollComments, createComment } from '../utils/fetcher'
import { Container, Header, Comment, Form, Button } from 'semantic-ui-react'

export default class CommentsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poll_id: props.poll_id || (props.match ? props.match.params.poll_id : ''),
      comments: [],
      newComment: '',
    }
  }
  componentDidMount() {
    getPollComments(this.state.poll_id)
      .then((res) => {
        this.setState({
          comments: res.data,
        })
      })
      .catch((err) => {
        console.error(err)
        alert(err)
      })
  }

  handleValueChange(event, field) {
    this.setState({ [field]: event.target.value })
  }

  addComment(e) {
    e.preventDefault()
    const { poll_id, newComment } = this.state
    createComment(poll_id, newComment)
      .then((res) => {
        console.log(res)
        this.setState((prevState) => ({
          comments: [...prevState.comments, res.data],
          newComment: '',
        }))
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
                <Comment.Author>{comment.writer}</Comment.Author>
                <Comment.Text>{comment.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))}

          <Form onSubmit={(e) => this.addComment(e)} reply>
            <Form.TextArea
              value={newComment}
              placeholder="Add new comment here ..."
              onChange={(e) => this.handleValueChange(e, 'newComment')}
            />
            <Button content="Add Comment" labelPosition="left" icon="edit" primary />
          </Form>
        </Comment.Group>
      </Container>
    )
  }
}
