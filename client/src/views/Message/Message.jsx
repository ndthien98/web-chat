import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import Contact from './Contact'
import Current from './Current'
export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
      }}>
        <div style={{ width: '80%' }}>
          <Current />
        </div>
        <div style={{ width: '20%' }}>
          <Contact />
        </div>
      </div>
    )
  }
}

