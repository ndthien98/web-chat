import React, { Component } from 'react'
import { SnackbarProvider } from 'notistack'
import Routes from './views/Routes'
import { Notificator } from './components/Notificator'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
}

export default class App extends Component {
  render() {
    return (
      <SnackbarProvider maxSnack={5} ref={notistackRef}
        action={(key) => (
          <IconButton onClick={onClickDismiss(key)}>
            <CloseIcon></CloseIcon>
          </IconButton>
        )}>
        <Notificator />
        <Routes />
      </SnackbarProvider>
    )
  }
}
