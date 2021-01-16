import { InputBase, IconButton, Divider } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'

import React, { Component } from 'react'
import api from '../../api'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputtext: '',
      accounts: []
    }
  }
  handleSeach = async () => {
    if (this.state.inputtext.trim().length > 0) {
      const data = await api.account.findUserByUsername(this.state.inputtext)
      this.setState({ accounts: data })
    }
  }
  render() {
    return (
      <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        margin: 100
      }}>
        <div style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
        }}>
          <InputBase
            style={{ width: '90%' }}
            onChange={event => {
              this.setState({ inputtext: event.target.value })
            }}
            placeholder="Nhập tên người dùng"
            value={this.state.inputtext}
          />
          <Divider orientation="vertical" />
          <IconButton
            style={{ width: '10%' }}
            color="primary" onClick={this.handleSeach}>
            <SearchIcon />
          </IconButton>
        </div>
        <div>
          <h3>search result: {JSON.stringify(this.state.accounts)}</h3>
        </div>
      </div>
    )
  }
}
