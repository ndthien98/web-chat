import { Button, Grid, Typography } from '@material-ui/core'
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
import { AttachFile, Send } from '@material-ui/icons';
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
        avatar: ''
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
    await this.setState({ contacts })
    if (this.props.location.userid !== null) {
      for (let i = 0; i < this.state.length; i++) {
        if (this.props.location.userid === this.state.contacts[i].userid) {
          console.log('found',i)
          await this.handleChangeContact(i);
          break
        }
      }
    }
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

  }

  handleChangeContact = async (index) => {
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
  handleAttachFile = async (image) => {
    console.log(image)
    const formData = new FormData();
    formData.append('image', image);
    const { link } = await api.media.uploadFile(formData)

    const newMessage = {
      sender: Cookie.get('userid'),
      receiver: this.state.contacts[this.state.index].userid,
      content: link,
      type: 'IMAGE'
    }

    socketInstance.getInstance().emit('new-message', newMessage)
    await this.setState({
      inputtext: '',
      messages: [...this.state.messages, newMessage]
    })
    this.messagesEndRef.current.scrollIntoView()
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ display: 'flex', flex: 5, flexDirection: 'row', width: '100%' }}>
          <div style={{ width: '100%' }}>
            <div style={{ flexDirection: 'column', display: 'flex', paddingTop: '10%', width: '100%', height: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 8 }}>
                <Card style={{ height: 50, width: 50 }}>
                  <Image src={process.env.REACT_APP_API_BASE_URL + this.state.contacts[this.state.index].avatar}></Image>
                </Card>
                <Typography>{this.state.contacts[this.state.index].displayname}</Typography>
              </div>
              <div style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'gray',
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
                      backgroundColor: e.receiver === this.state.contacts[this.state.index].userid ? 'cyan' : 'white',
                    }}>
                    {e.type === 'TEXT'
                      ? <p>{e.content}</p>
                      : <img
                        style={{
                          height: 200,
                          width: 200,
                        }}
                        src={process.env.REACT_APP_API_BASE_URL + e.content}
                        alt="img"
                      />}
                  </div>
                </div>)
                }
                <div ref={this.messagesEndRef} />
              </div>
              < div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <FilePicker
                  extensions={['jpg', 'jpeg', 'png']}
                  onChange={this.handleAttachFile}
                  onError={() => {

                  }}
                >
                  <IconButton>
                    <AttachFile />
                  </IconButton>
                </FilePicker>
                <InputBase
                  style={{ width: '100%' }}
                  onChange={(event) => {
                    this.setState({ inputtext: event.target.value });
                  }}
                  placeholder='Nhập tin nhắn'
                  value={this.state.inputtext}
                />
                <Divider orientation='vertical' />
                <IconButton color='primary' onClick={this.handleSend} onKeyPress={(event) => event.keyCode === 13 ? this.handleSend() : null}>
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