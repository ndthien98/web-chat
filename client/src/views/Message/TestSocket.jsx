import {
  Button,
  TextField,
  InputBase,
  IconButton,
  Paper,
  Divider,
  Card,
  Typography,
} from '@material-ui/core';
import { AttachFile, Send } from '@material-ui/icons';
import React, { Component } from 'react';
import socketInstance from '../../socket';
import Image from 'material-ui-image';
import MessageItem from './MessageItem';
export default class TestSocket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputtext: '',
      messages: [
        {
          id: 1,
          message: 'Giang',
          username: 'giang',
        },
        {
          id: 2,
          message: 'top1 ',
          username: 'thien',
        },
        {
          id: 3,
          message:
            'Ve chua nhanh len tao buon ia qua  :v,Ve chua nhanh len tao buon ia qua  :v ',
          username: 'my',
        }
      ],
    };
  }
  componentDidMount = () => {
    socketInstance.getInstance().on('new-message', (data) => {
      alert('on:new-message:' + data);
      this.setState({
        messages: [...this.state.messages, JSON.stringify(data)],
      });
    });
  };
  componentWillUnmount = () => {
    socketInstance.clearInstance();
  };
  handleSend = () => {
    if (this.state.inputtext.trim().length > 0) {
      socketInstance
        .getInstance()
        .emit('new-message', this.state.inputtext.trim());
      this.setState({ inputtext: '' });
    }
  };
  handleAttachFile = () => {};
  render() {
    return (
      <div style={{ flexDirection: 'column', display: 'flex' ,paddingTop:'10%'}}>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        <Card style={{ height: 50, width: 60 }}>
          <Image src='https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'></Image>
          </Card>
          <Typography>Giang Tran</Typography>
        </div>
        <div>
        {this.state.messages.map(mes => (
          <MessageItem message ={mes}></MessageItem>
        ))}
       </div>
        {/* <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3>{JSON.stringify(this.state.messages)}</h3>
        </div> */}

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton onClick={this.handleAttachFile}>
            <AttachFile />
          </IconButton>
          <InputBase
            onChange={(event) => {
              this.setState({ inputtext: event.target.value });
            }}
            placeholder='Nhập tin nhắn'
            value={this.state.inputtext}
          />
          <Divider orientation='vertical' />
          <IconButton color='primary' onClick={this.handleSend}>
            <Send />
          </IconButton>
        </div>
      </div>
    );
  }
}
