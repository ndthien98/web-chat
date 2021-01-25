import React, { Component } from 'react'

export default class Current extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '1'
    }
  }
  render() {
    return (
      <div style={{ width: '100%' }}>
        message with: {this.state.username}
      </div>
    )
  }
}
