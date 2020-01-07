import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './Header.css'

export default class Header extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item
          href="/polls/invited"
          name="Active Polls"
          active={activeItem === 'Active Polls'}
          onClick={this.handleItemClick}
        />
        <Menu.Item href="/polls/" name="My Polls" active={activeItem === 'My Polls'} onClick={this.handleItemClick} />
        <Menu.Item
          href="/meetings"
          name="My Meetings"
          active={activeItem === 'My Meetings'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          href="/poll/"
          name="Create new Poll"
          active={activeItem === 'Create new Poll'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          href="/notif"
          name="Notifications"
          active={activeItem === 'Notifications'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}
