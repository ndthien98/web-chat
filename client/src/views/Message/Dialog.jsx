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
      <div>
        <TestSocket />
      </div>
    )
  }
}

