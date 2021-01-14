import { Button, Grid } from '@material-ui/core'
import React, { Component } from 'react'
import Contact from './Contact'
import Current from './Current'
import socketInstance from '../../socket'

export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount = () => {
    socketInstance.getInstance().on('new-message', data => {
      this.setState({
        data: [...this.state.data, data]
      })
    })
  }

  handleClick = () => {
    socketInstance.getInstance().emit('new-message', 'xin chào')
  }
  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}>
        <div style={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
          {
            this.state.data.map(e => <h3>{e}</h3>)
          }

        </div>
        <div style={{ width: '60%' }}>
          <Current />
          <Button onClick={this.handleClick}>
            Click
          </Button>
        </div>
        <div style={{ width: '20%' }}>
          <Contact />
        </div>
      </div>
    )
  }
}

