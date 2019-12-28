import React, { Component } from 'react'
import { Container, Form, Header, Divider } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { login } from '../utils/fetcher'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      submitted: false,
    }
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  handleValueChange(event, field) {
    this.setState({ [field]: event.target.value })
  }

  submitForm(event) {
    event.preventDefault()
    const { email, password } = this.state
    console.log('TCL: Login -> submitForm -> email, password', email, password)
    login(email, password)
      .then((res) => {
        this.setState({ submitted: true })
      })
      .catch((err) => {
        console.error('Error in Login: ', err)
        alert(err)
      })
  }

  render() {
    const { email, password, submitted } = this.state
    return submitted ? (
      <Redirect to={`/polls`} />
    ) : (
      <Container textAlign="left">
        <Header as="h3">Login to Jalas</Header>
        <Divider></Divider>
        <Form>
          <Form.Field className="email">
            <label> Email </label>
            <input
              type="text"
              value={email}
              onChange={(e) => this.handleValueChange(e, 'email')}
              placeholder="yourmail@email.com"
            ></input>
          </Form.Field>
          <Form.Field className="email">
            <label> Password </label>
            <input
              type="password"
              value={password}
              onChange={(e) => this.handleValueChange(e, 'password')}
              placeholder="password"
            ></input>
          </Form.Field>
          <Form.Button primary type="submit" onClick={(e) => this.submitForm(e)}>
            {'Login'}
          </Form.Button>
        </Form>
      </Container>
    )
  }
}
