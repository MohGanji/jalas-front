import React, { Component } from 'react'
import { getPollComments, createComment, replyToComment } from '../utils/fetcher'
import { Container, Header, Comment, Form, Button } from 'semantic-ui-react'

export default class CommentsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poll_id: props.poll_id || (props.match ? props.match.params.poll_id : ''),
      comments: [],
      newComment: '',
      activeComment: null,
    }
  }
  componentDidMount() {
    getPollComments(this.state.poll_id)
      .then((res) => {
        console.log('TCL: CommentsList -> componentDidMount -> res', res)
        this.setState({
          comments: res.data, //.map((qsObj) => qsObj.fields),
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
    const { poll_id, newComment, activeComment } = this.state
    if (activeComment) {
      replyToComment(activeComment, newComment)
        .then(() => {
          this.setState((prevState) => {
            let comments = [...prevState.comments]
            comments = comments.map((c) =>
              c.pk === prevState.activeComment
                ? {
                    ...c,
                    replies: [...c.replies, { text: newComment, owner: { email: localStorage.getItem('session') } }],
                  }
                : c,
            )
            console.log('TCL: CommentsList -> addComment -> comments', comments)

            return {
              comments,
              newComment: '',
              activeComment: null,
            }
          })
        })
        .catch(console.error)
    } else {
      createComment(poll_id, newComment)
        .then((res) => {
          console.log(res)
          this.setState((prevState) => ({
            comments: [
              ...prevState.comments,
              { ...res.data, replies: [], writer: { email: localStorage.getItem('session') } },
            ],
            newComment: '',
          }))
        })
        .catch(console.error)
    }
  }

  activateReplyForComment(commentId) {
    console.log('TCL: CommentsList -> activateReplyForComment -> commentId', commentId)
    this.setState((prev) => ({
      activeComment: prev.activeComment === commentId ? null : commentId,
    }))
  }

  render() {
    const { comments, newComment, activeComment } = this.state
    return (
      <Container>
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>

          {comments.map((comment, ind) => (
            <Comment key={ind}>
              <Comment.Content>
                <Comment.Author>{comment.writer.email}</Comment.Author>
                <Comment.Text>{comment.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action onClick={() => this.activateReplyForComment(comment.pk)}>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
              {!!comment.replies.length && (
                <Comment.Group>
                  {comment.replies.map((reply, index) => (
                    <Comment key={index}>
                      <Comment.Content>
                        <Comment.Author as="a">{reply.owner.email}</Comment.Author>
                        <Comment.Text>{reply.text}</Comment.Text>
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
              )}
            </Comment>
          ))}

          <Form onSubmit={(e) => this.addComment(e)} reply>
            <Form.TextArea
              value={newComment}
              placeholder={activeComment ? 'Write your reply ...' : 'Add new comment here ...'}
              onChange={(e) => this.handleValueChange(e, 'newComment')}
            />
            <Button content="Add Comment" labelPosition="left" icon="edit" primary />
          </Form>
        </Comment.Group>
      </Container>
    )
  }
}
