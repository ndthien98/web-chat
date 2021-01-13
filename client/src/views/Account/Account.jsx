
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
import styles from './Account.style'
import api from '../../api';
import noti from '../../components/Notificator';

export default class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: '',
        displayname: '',
        gender: '',
        birthday: '',
        phone: '',
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
  handleSaveDetail = async () => {
    const data = await api.account.updateAccount(this.state.user)
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
            title="Chỉnh sửa thông tin cá nhân"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
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
              <Grid item md={6} xs={12}>
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
              <Grid item md={6} xs={12}>
                <Typography>Giới tính</Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  name="gender"
                  onChange={this.handleChange}
                  required
                  value={this.state.user.gender}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography>Số điện thoại</Typography>
                <TextField
                  fullWidth
                  margin="dense"
                  name="phone"
                  onChange={this.handleChange}
                  required
                  value={this.state.user.phone}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography>Ngày sinh</Typography>
                <TextField
                  margin="dense"
                  name="birthday"
                  onChange={this.handleChange}
                  required
                  type="date"
                  value={this.state.user.birthday}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              color="primary"
              onClick={this.handleSaveDetail}
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