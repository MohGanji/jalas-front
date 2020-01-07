import React, { Component } from 'react'
import { Container, Header, Divider, Checkbox } from 'semantic-ui-react'
import { updateNotifSetting, getNotifSetting } from '../utils/fetcher'

export default class NotificationSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      '0': true,
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': true,
      '6': true,
      '7': true,
    }
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  componentDidMount() {
    getNotifSetting()
      .then((res) => {
        const mapped = res.data.reduce((prev, item) => {
          return { ...prev, [item.action]: item.active }
        }, {})
        console.log(mapped)
        this.setState({
          ...mapped,
        })
      })
      .catch((err) => {
        alert('Failed to fetch notification settings')
      })
  }

  handleValueChange(data) {
    updateNotifSetting(data.id, data.checked)
      .then((res) => {
        this.setState({ [data.id]: data.checked })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  render() {
    const { 0: n0, 1: n1, 2: n2, 3: n3, 4: n4, 5: n5, 6: n6, 7: n7 } = this.state
    return (
      <Container textAlign="left">
        <Header as="h3">Notification Setting</Header>
        <Divider></Divider>
        <Checkbox
          toggle
          checked={n1}
          label="Receive notification when a poll you created is finilized and a meeting is arrenged"
          id="1"
          onChange={(e, data) => this.handleValueChange(data)}
        />
        <Divider></Divider>
        <Checkbox
          toggle
          checked={n2}
          label="Receive notification when a poll you are invited to is finilized and a meeting is arrenged"
          id="2"
          onChange={(e, data) => this.handleValueChange(data)}
        />
        <Divider></Divider>
        <Checkbox
          toggle
          checked={n3}
          label="Receive notification when someone voted on an option of one of your polls"
          id="3"
          onChange={(e, data) => this.handleValueChange(data)}
        />
        <Divider></Divider>
        <Checkbox
          toggle
          checked={n4}
          label="Receive notification when participant added to poll notify that participant"
          id="4"
          onChange={(e, data) => this.handleValueChange(data)}
        />
        <Divider></Divider>
        <Checkbox
          toggle
          checked={n5}
          label="Receive notification when you are removed from a poll"
          id="5"
          onChange={(e, data) => this.handleValueChange(data)}
        />
        <Divider></Divider>
        <Checkbox
          toggle
          checked={n6}
          label="Receive notification when you are invited to a poll"
          id="6"
          onChange={(e, data) => this.handleValueChange(data)}
        />
        <Divider></Divider>
        <Checkbox
          toggle
          checked={n0}
          label="Receive notification when an option is added to a poll you are invited to"
          id="0"
          onChange={(e, data) => this.handleValueChange(data)}
        />
        <Divider></Divider>

        <Checkbox
          toggle
          checked={n7}
          label="Receive notification when an option is removed from a poll you are invited to"
          id="7"
          onChange={(e, data) => this.handleValueChange(data)}
        />
        <Divider></Divider>
      </Container>
    )
  }
}
