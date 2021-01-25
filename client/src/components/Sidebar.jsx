import React, { forwardRef, Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer } from '@material-ui/core';
import { List, ListItem, Button, Paper } from '@material-ui/core';
import {
  Settings as SettingIcon,
  AccountCircle as AccountIcon,
  Message as MessageIcon,
  Search as SearchIcon
} from '@material-ui/icons';
import Cookie from 'js-cookie'

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <NavLink {...props} />
  </div>
));
export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.pages = [
      {
        title: 'Tin nhắn',
        href: '/message',
        icon: <MessageIcon />,
      },
      {
        title: 'Tìm kiếm',
        href: '/search',
        icon: <SearchIcon />,
      },
      {
        title: 'Thông tin cá nhân',
        href: '/',
        icon: <AccountIcon />,
      },
      {
        title: 'Đổi mật khẩu',
        href: '/change-password',
        icon: <SettingIcon />,
      },
    ]
  }
  render() {
    return (
      <Paper style={{ height: '100%', width: 300 }}>
        <List style={{ height: '100%' }}>
          {this.pages.map((page) => (
            <ListItem disableGutters key={page.title}>
              <Button
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start'
                }}
                component={CustomRouterLink}
                to={page.href}
              >
                <div >{page.icon}</div>
                {page.title}
              </Button>
            </ListItem>
          ))}
          <ListItem >
            <Button
              fullWidth
              onClick={() => {
                Cookie.remove('token');
                Cookie.remove('refreshToken');
                window.location = '/'
              }}
              style={{ marginTop: 50 }}
              variant="outlined"
            >
              Đăng xuất
              </Button>
          </ListItem>
        </List>
      </Paper>
    )
  }
}
