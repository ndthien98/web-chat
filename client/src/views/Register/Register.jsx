
import React, { Component } from 'react'
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import styles from './Register.style'
import api from '../../api'
import noti from '../../components/Notificator';

export default class Register extends Component {
  history = this.props.history
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      displayname: '',
      birthday: new Date().toISOString().slice(0, 10),
      phone: '',
      gender: ''
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.birthday)
  }
  handleBack = async () => {
    this.history.goBack()
  }
  handleRegister = async () => {
    const data = await api.auth.register(this.state)
    if (data) {
      noti.success('Đăng ký thành công!')
      this.props.history.push('/')
    } else {
      noti.error('Đăng ký thất bại!')
    }
  }

  render() {
    return (
      <Grid style={styles.container}>
        <Typography
          variant="h2"
        >
          Đăng ký tài khoản
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
        <TextField
          style={styles.input}
          label="Tên hiển thị"
          name="displayname"
          onChange={this.handleChange}
        /><TextField
          style={styles.input}
          label="Giới tính"
          name="gender"
          onChange={this.handleChange}
        />
        <TextField
          style={styles.input}
          label="Số điện thoại"
          name="phone"
          onChange={this.handleChange}
        />
        <TextField
          style={styles.input}
          label="Ngày sinh"
          name="birthday"
          type="date"
          onChange={this.handleChange}
          value={this.state.birthday}
        />
        <Button
          style={styles.input}
          variant="outlined"
          color="primary"
          onClick={this.handleRegister}
        >
          Đăng ký
        </Button>
        <Button
          style={styles.input}
          variant="contained"
          color="primary"
          onClick={this.handleBack}
        >
          Trở lại
        </Button>
      </Grid >
    )
  }
}