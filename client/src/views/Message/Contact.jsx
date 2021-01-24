import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Card, Box } from '@material-ui/core';
import Image from 'material-ui-image';
import {withRouter} from 'react-router-dom'

 class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          colorChange: false,
          image:
            'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
          contactName: 'GiangTran',
          listMessage: [
            {
              id: 1,
              message: 'Giang',
              username: 'giang',
            },
            {
              id: 2,
              message: 'top1 ',
              username: 'thien',
            },
            {
              id: 3,
              message:
                'Ve chua nhanh len tao buon ia qua  :v,Ve chua nhanh len tao buon ia qua  :v ',
              username: 'my',
            },
            {
              colorChange: false,
              image:
                'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
              contactName: 'GiangTran1',
              listMessage: [
                {
                  id: 1,
                  message: 'Giang',
                  username: 'giang',
                },
                {
                  id: 2,
                  message: 'top1 ',
                  username: 'thien',
                },
                {
                  id: 3,
                  message:
                    'Ve chua nhanh len tao buon ia qua  :v,Ve chua nhanh len tao buon ia qua  :v ',
                  username: 'my',
                },
              ],
            },
          ],
        },
        {
          colorChange: false,
          image:
            'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
          contactName: 'GiangTran2',
          listMessage: [
            {
              id: 1,
              message: 'Giang',
              username: 'giang',
            },
            {
              id: 2,
              message: 'top1 ',
              username: 'thien',
            },
            {
              id: 3,
              message:
                'Ve chua nhanh len tao buon ia qua  :v,Ve chua nhanh len tao buon ia qua  :v ',
              username: 'my',
            },
          ],
        },
        {
          colorChange: false,
          image:
            'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
          contactName: 'GiangTran3',
          listMessage: [
            {
              id: 1,
              message: 'Giang',
              username: 'giang',
            },
            {
              id: 2,
              message: 'top1 ',
              username: 'thien',
            },
            {
              id: 3,
              message:
                'Ve chua nhanh len tao buon ia qua  :v,Ve chua nhanh len tao buon ia qua  :v ',
              username: 'my',
            },
          ],
        },
        {
          colorChange: false,
          image:
            'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png',
          contactName: 'GiangTran4',
          listMessage: [
            {
              id: 1,
              message: 'Giang',
              username: 'giang',
            },
            {
              id: 2,
              message: 'top1 ',
              username: 'thien',
            },
            {
              id: 3,
              message:
                'Ve chua nhanh len tao buon ia qua  :v,Ve chua nhanh len tao buon ia qua  :v ',
              username: 'my',
            },
          ],
        },
      ],
    };
  }
  render() {
    return (
      <div style={{ paddingTop: '10%', width: '100%', padding: '2%' }}>
        {this.state.data.map((obj) => (
          <Box
            key={obj.contactName}
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
                data: state.data.map((d) => {
                  if (d.contactName === obj.contactName) {
                    return { ...d, colorChange: true };
                  } else {
                    return { ...d, colorChange: false };
                  }
                }),
              }))
            }
            onMouseLeave={() =>
              this.setState((state) => ({
                data: state.data.map((d) => {
                  return { ...d, colorChange: false };
                }),
              }))
            }

            onClick={()=>this.props.history.push(`/message/${obj.contactName}`)}
          >
            <Card style={{ height: 50, width: 60 }}>
              <Image src={obj.image}></Image>
            </Card>
            <div style={{ width: '100%', paddingLeft: '4%' }}>
              <Typography>{obj.contactName}</Typography>
            </div>
          </Box>
        ))}
      </div>
    );
  }
}

export default withRouter(Contact)