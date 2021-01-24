import React, { Component } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Dialog from './Message/Dialog'
import Login from './Login/Login'
import NotFound from './NotFound/NotFound'
import ProtectRoute from '../components/ProtectedRoute'
import Register from './Register/Register'
import Account from './Account/Account'
import Search from './Search/Search'
import ChangePassword from './ChangePassword/ChangePassword'

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <ProtectRoute
            exact
            path="/message/:id"
            component={Dialog}
          />
          <ProtectRoute
            exact
            path="/"
            component={Account}
          />
          <ProtectRoute
            exact
            path="/search"
            component={Search}
          />
          <ProtectRoute
            exact
            path="/change-password"
            component={ChangePassword}
          />
          <Route
            exact
            path="/login"
            component={Login}
          />
          <Route
            exact
            path="/register"
            component={Register}
          />
          <Route
            exact
            path="/not-found"
            component={NotFound}
          />
          <Redirect to="/not-found" />
        </Switch>
      </BrowserRouter >
    )
  }
}
