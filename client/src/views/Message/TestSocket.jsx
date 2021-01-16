import { Button, TextField, InputBase, IconButton, Paper, Divider } from '@material-ui/core'
import { AttachFile, Send } from '@material-ui/icons'
import React, { Component } from 'react'
import socketInstance from '../../socket'

export default class TestSocket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputtext: '',
      messages: [
      ]
    }
  }
  componentDidMount = () => {
    socketInstance.getInstance().on('new-message', data => {
      alert('on:new-message:' + data)
      this.setState({
        messages: [
          ...this.state.messages,
          JSON.stringify(data)
        ]
      })
    })
  }
  componentWillUnmount = () => {
    socketInstance.clearInstance()
  }
  handleSend = () => {
    if (this.state.inputtext.trim().length > 0) {
      socketInstance.getInstance().emit('new-message', this.state.inputtext.trim())
      this.setState({ inputtext: '' })
    }
  }
  handleAttachFile = () => {

  }
  render() {
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>{JSON.stringify(this.state.messages)}</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton onClick={this.handleAttachFile}>
            <AttachFile />
          </IconButton>
          <InputBase
            onChange={event => {
              this.setState({ inputtext: event.target.value })
            }}
            placeholder="Nhập tin nhắn"
            value={this.state.inputtext}
          />
          <Divider orientation="vertical" />
          <IconButton color="primary" onClick={this.handleSend}>
            <Send />
          </IconButton>
        </div>
      </div>
    )
  }
}
