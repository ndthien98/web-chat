import { Typography } from '@material-ui/core'
import React, { Component } from 'react'
import Image from 'material-ui-image';
import { FilePicker } from 'react-file-picker';
import Cookie from 'js-cookie';
import {
  InputBase,
  IconButton,
  Divider,
  Card,
  Box
} from '@material-ui/core';
import {
  Send,
  Image as AttachImageIcon,
  Movie as AttachVideoIcon,
  Audiotrack as AttachAudioIcon
} from '@material-ui/icons';
import socketInstance from '../../socket';
import api from '../../api';
import { withRouter } from 'react-router-dom';

class Dialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [{
        username: '',
        displayname: '',
        gender: '',
        birthday: '',
        phone: '',
        avatar: '',
        online: false
      }],
      inputtext: '',
      index: 0,
      messages: []
    }
    this.messagesEndRef = React.createRef()
  }

  componentDidMount = async () => {
    // get all contacts 
    const contacts = await api.account.getAllAccounts()
    await this.setState({ contacts: contacts.map(e => ({ ...e, online: false })) })

    // get old messages
    const messages = await api.message.getAllMessage(this.state.contacts[this.state.index].userid)
    if (messages) {
      await this.setState({ messages })
      this.messagesEndRef.current.scrollIntoView()
    }

    // init socket 
    await socketInstance.clearInstance()
    socketInstance.getInstance().on('new-message', async (data) => {
      await this.setState({
        messages: [...this.state.messages, data]
      })
      this.messagesEndRef.current.scrollIntoView()
    })

    socketInstance.getInstance().on('online-user', (data) => {
      this.setState({
        contacts: this.state.contacts.map(e => ({
          ...e,
          online: data.indexOf(e.userid) !== -1
        }))
      })
    })

    socketInstance.getInstance().on('join', (userid) => {
      this.handleOnlineUser(userid, true)
    })
    socketInstance.getInstance().on('leave', (userid) => {
      this.handleOnlineUser(userid, false)
    })
  }
  handleOnlineUser = (userid, status) => {
    this.setState({
      contacts: this.state.contacts.map(e => {
        return {
          ...e,
          online: e.userid === userid ? status : e.online
        }
      })
    })
  }
  handleChangeContact = async (index) => {
    // get messages 
    await this.setState({ index })
    const messages = await api.message.getAllMessage(this.state.contacts[index].userid)
    if (messages) this.setState({ messages })
    this.messagesEndRef.current.scrollIntoView()
  }

  handleSend = async () => {
    if (this.state.inputtext.trim() === '') return;

    const newMessage = {
      sender: Cookie.get('userid'),
      receiver: this.state.contacts[this.state.index].userid,
      content: this.state.inputtext,
      type: 'TEXT'
    }

    socketInstance.getInstance().emit('new-message', newMessage)

    await this.setState({
      inputtext: '',
      messages: [...this.state.messages, newMessage]
    })

    this.messagesEndRef.current.scrollIntoView()
  }

  handleAttachFile = (type) => async (file) => {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);
    const { link } = await api.media.uploadFile(formData)

    const newMessage = {
      sender: Cookie.get('userid'),
      receiver: this.state.contacts[this.state.index].userid,
      content: link,
      type: type
    }

    socketInstance.getInstance().emit('new-message', newMessage)
    await this.setState({
      inputtext: '',
      messages: [...this.state.messages, newMessage]
    })

    this.messagesEndRef.current.scrollIntoView()
  }
  renderMessage = (message) => {
    switch (message.type) {
      case 'TEXT':
        return <p>{message.content}</p>
      case 'IMAGE':
        return <img style={{ height: 200, width: 200 }} src={process.env.REACT_APP_API_BASE_URL + message.content} alt="img" />
      case 'AUDIO':
        return <audio controls>
          <source src={process.env.REACT_APP_API_BASE_URL + message.content} type="audio/mpeg"></source>
        </audio>
      case 'VIDEO':
        return <video controls>
          <source src={process.env.REACT_APP_API_BASE_URL + message.content} type="video/mp4"></source>
        </video>
      default:
        return <p>{message.content}</p>
    }
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ display: 'flex', flex: 5, flexDirection: 'row', width: '100%' }}>
          <div style={{ width: '100%' }}>
            <div style={{ flexDirection: 'column', display: 'flex', width: '100%', height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 8 }}>
                <Card style={{ height: 50, width: 50 }}>
                  <Image src={process.env.REACT_APP_API_BASE_URL + this.state.contacts[this.state.index].avatar}></Image>
                </Card>
                <Typography>{this.state.contacts[this.state.index].displayname}</Typography>
              </div>
              <div style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                overflow: 'auto'
              }}>
                {this.state.messages.map((e, i) => <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent:
                      e.receiver === this.state.contacts[this.state.index].userid ? 'flex-end' : 'flex-start',
                  }}>
                  <div
                    style={{
                      borderRadius: 10,
                      margin: 4,
                      paddingLeft: 10,
                      paddingRight: 10,
                      backgroundColor: e.type === 'TEXT' ? (e.receiver === this.state.contacts[this.state.index].userid ? 'cyan' : 'gray') : 'white',
                    }}>
                    {this.renderMessage(e)}
                  </div>
                </div>)
                }
                <div ref={this.messagesEndRef} />
              </div>
              < div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <FilePicker
                  extensions={['jpg', 'jpeg', 'png']}
                  onChange={this.handleAttachFile('IMAGE')}
                  onError={alert}
                >
                  <IconButton>
                    <AttachImageIcon />
                  </IconButton>
                </FilePicker>
                <FilePicker
                  extensions={['mp3', 'wav']}
                  onChange={this.handleAttachFile('AUDIO')}
                  onError={alert}
                >
                  <IconButton>
                    <AttachAudioIcon />
                  </IconButton>
                </FilePicker>
                <FilePicker
                  extensions={['mp4']}
                  onError={alert}
                  onChange={this.handleAttachFile('VIDEO')}
                  maxSize={200}
                >
                  <IconButton>
                    <AttachVideoIcon />
                  </IconButton>
                </FilePicker>
                <InputBase
                  style={{ width: '100%' }}
                  onChange={(event) => {
                    this.setState({ inputtext: event.target.value });
                  }}
                  placeholder='Nhập tin nhắn'
                  value={this.state.inputtext}
                  onKeyDown={(e) => (e.key === 'Enter' ? this.handleSend() : 1)}
                />
                <Divider orientation='vertical' />
                <IconButton color='primary' onClick={this.handleSend}>
                  <Send />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flex: 2, flexDirection: 'row' }}>
          <div style={{ paddingTop: '10%', width: '100%', padding: '2%' }}>
            {this.state.contacts.map((obj, index) => (
              <Box
                key={obj.displayname}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '3%',
                  flexDirection: 'row',
                  cursor: 'pointer',
                  background: obj.colorChange ? 'yellow' : 'white',
                }}
                onMouseEnter={() =>
                  this.setState((state) => ({
                    contacts: state.contacts.map((d) => {
                      if (d.displayname === obj.displayname) {
                        return { ...d, colorChange: true };
                      } else {
                        return { ...d, colorChange: false };
                      }
                    }),
                  }))
                }
                onMouseLeave={() =>
                  this.setState((state) => ({
                    contacts: state.contacts.map((d) => {
                      return { ...d, colorChange: false };
                    }),
                  }))
                }
                onClick={() => this.handleChangeContact(index)}
              >
                <Card style={{ height: 50, width: 60 }}>
                  <Image src={process.env.REACT_APP_API_BASE_URL + obj.avatar}></Image>
                </Card>
                <div style={{ width: 10, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ width: 10, height: 10, borderRadius: 5, background: obj.online ? 'green' : 'gray' }} />
                </div>
                <div style={{ width: '100%', paddingLeft: '4%' }}>
                  <Typography>{obj.displayname}</Typography>
                </div>
              </Box>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Dialog);