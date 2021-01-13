
import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import styles from './ChangePassword.style'
import api from '../../api';
import noti from '../../components/Notificator';

export default class ChangePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: '',
        displayname: '',
        password: '',
        newpassword: '',
        repassword: '',
      }
    }
  }
  async componentDidMount() {
    const data = await api.auth.getCurrent()
    if (data) {
      this.setState({
        user: data.account
      })
    } else {
      noti.error('Không lấy được thông tin người dùng')
    }

  }
  handleChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value
      }
    })
  }
  handleSave = async () => {
    const data = await api.auth.changePassword(this.state.user)
    if (data) {
      noti.success('Đã lưu!')
    } else {
      noti.error('Thất bại')
    }
  }
  render() {
    return (
      <Card >
        <form autoComplete="off" noValidate>
          <CardHeader
            title="Đổi mật khẩu"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Typography>Tài khoản</Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  name="username"
                  onChange={this.handleChange}
                  disabled
                  value={this.state.user.username}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography>Tên hiển thị</Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  name="displayname"
                  onChange={this.handleChange}
                  required
                  value={this.state.user.displayname}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography>Mật khẩu cũ</Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  name="password"
                  onChange={this.handleChange}
                  required
                  type="password"
                  value={this.state.user.password}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography>Mật khẩu mới</Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  name="newpassword"
                  onChange={this.handleChange}
                  required
                  type="password"
                  value={this.state.user.newpassword}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography>Xác nhận mật khẩu mới</Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  name="repassword"
                  onChange={this.handleChange}
                  required
                  type="password"
                  value={this.state.user.repassword}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              onClick={this.handleSave}
              variant="contained"
            >
              Lưu thay đổi
          </Button>
          </CardActions>
        </form>
      </Card>
    )
  }
}