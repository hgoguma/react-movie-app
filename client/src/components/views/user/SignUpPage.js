import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SweetAlert from 'sweetalert2-react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUpPage() {
  const classes = useStyles();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ShowAlert, setShowAlert] = useState(false);
  const [Message, setMessage] = useState("");

  const onNameChange = (e) => {
    setName(e.currentTarget.value);
  }

  const onEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const variables = {
      name : Name,
      email : Email,
      password : Password
    }

    Axios.post('/api/user/signup', variables)
      .then(res => {
        if(res.data.result){ //회원가입 성공
          console.log(res.data.message);
          setMessage(res.data.message);
        } else if (res.data.message !== '' || res.data.message !== 'undefined' ) { //이메일 중복인 경우
          setMessage(res.data.message);
        }
        setShowAlert(true); //alert창 띄우기
      })
  }

  const redirectFunc = () => {
    return <Redirect to="/" />
  }

  return ( 
    
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={onNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onPasswordChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            회원가입
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login" variant="body2">
                이미 회원이신가요? 로그인하세요
              </Link>
            </Grid>
          </Grid>
          {
            ShowAlert && <SweetAlert
            show={ShowAlert}
            title="회원가입"
            text={Message}
            onConfirm={redirectFunc()}
          />
          }
          

        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}