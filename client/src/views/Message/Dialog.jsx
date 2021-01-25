import { Button, Grid } from '@material-ui/core'
import React, { Component } from 'react'

import Contact from './Contact'
import Current from './Current'
import TestSocket from './TestSocket'


export default class Dialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ display: 'flex', flex: 5, flexDirection: 'row' }}>
          <Current></Current>
        </div>
        <div style={{ display: 'flex', flex: 2, flexDirection: 'row' }}>
          <Contact></Contact>
        </div>
      </div>
    )
  }
}

