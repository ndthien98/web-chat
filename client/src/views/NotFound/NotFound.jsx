import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    padding: 32,
  },
  content: {
    paddingTop: 150,
    textAlign: 'center',
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
  },
}));

const NotFound = () => {
  const classes = useStyles();
  const handleBack = () => {
    window.location = '/'
  }
  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h3">Không tìm thấy trang này.</Typography>
            <Typography variant="subtitle2">Vui lòng thử lại sau</Typography>
            <img
              alt="page-not-found"
              className={classes.image}
              src="/images/undraw_page_not_found_su7k.svg"
            />
            <Button
              onClick={handleBack}
              variant="contained"
              color="primary"
            >
              Về trang chủ
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
