import React, { Component } from 'react'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import Cookie from 'js-cookie';
import styles from './Login.style'
import api from '../../api'

import noti from '../../components/Notificator';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    if (Cookie.get('token')) this.props.history.push('/')
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleLogin = async () => {
    console.log('object')
    const data = await api.auth.login(this.state)
    console.log('data', data)
    if (data) {
      Cookie.set('token', data.token)
      Cookie.set('userid', data.userid)
      this.props.history.push('/')
      noti.success('Đăng nhập thành công!')
    } else {
      noti.error('Đăng nhập thất bại!')
    }
  }
  handleRegister = () => {
    this.props.history.push('/register');
  }

  render() {
    return (
      <Grid style={styles.container}>
        <Button onClick={(e) => {
          console.log(e.a.v.c)
        }}>
          <Typography>Lỗi</Typography>
        </Button>
        <Typography
          variant="h2"
        >
          Trang web trò chuyện trực tuyến
        </Typography>
        <TextField
          style={styles.input}
          type="text"
          label="Username"
          name="username"
          onChange={this.handleChange}
        />
        <TextField
          style={styles.input}
          type="password"
          label="Password"
          name="password"
          onChange={this.handleChange}
        />
        <Button
          style={styles.input}
          variant="contained"
          color="primary"
          onClick={this.handleLogin}
        >
          Đăng nhập
        </Button>
        <Button
          style={styles.input}
          variant="outlined"
          color="primary"
          onClick={this.handleRegister}
        >
          Đăng ký
        </Button>
      </Grid >
    )
  }
}

export default Login