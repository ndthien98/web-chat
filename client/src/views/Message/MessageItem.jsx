import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core';
export default class MessageItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent:
            this.props.message.username === 'giang' ? 'flex-end' : 'flex-start',
        }}
      >
        <Card>
          <Typography
            style={{
              background:
                this.props.message.username === 'giang' ? '#579fdd' : 'white',
            }}
          >
            {this.props.message.message}
          </Typography>
        </Card>
      </div>
    );
  }
}
