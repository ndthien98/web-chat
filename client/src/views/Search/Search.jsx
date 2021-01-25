import { InputBase, IconButton, Divider, Card, CardMedia, TextField, Typography, CardActions, Button } from '@material-ui/core'
import { Search as SearchIcon, Add } from '@material-ui/icons'

import React, { Component } from 'react'
import api from '../../api'
import EndPoint from '../../api/EndPoint'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputtext: '',
      account: []
    }
  }
  handleSeach = async () => {
    if (this.state.inputtext.trim().length > 0) {
      const data = await api.account.findUserByUsername(this.state.inputtext)
      this.setState({ account: data })
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

        {
          this.state.account.map(e => {
            return <Card style={{
              display: 'flex',
              flexDirection: 'row',
              margin: 24
            }}>
              <CardMedia image={EndPoint.BASE_URL + e.avatar} style={{ height: 100, width: 100, margin: 8 }}>

              </CardMedia>
              <Typography style={{ margin: 8, width: 500 }} variant="h6">
                {e.displayname}
              </Typography>
              <CardActions>
                <Button style={{ margin: 8, width: 200 }} onClick={() => {
                  this.props.history.push(`/message/${e.username}`)
                }}>
                  Nhắn tin
                  </Button>
              </CardActions>
            </Card>
          })
        }

      </div>
    )
  }
}
