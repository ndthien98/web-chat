import { Button, Grid } from '@material-ui/core'
import React, { Component } from 'react'
import {
  GiftedChat,
  MessageImage,
  Send,
  MessageContainer,
  Message,
} from "react-web-gifted-chat";

import Contact from './Contact'
import Current from './Current'
import socketInstance from '../../socket'

export default class Dialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [
        {
          id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            id: 2,
            name: 'React',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
        {
          id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            id: 2,
            name: 'React',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }
      ]
    }
  }
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          id: 1,
        }}
      />
    )
  }
}

