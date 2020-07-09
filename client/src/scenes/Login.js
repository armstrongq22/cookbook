import React, {useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

// Matrial-ui components
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Custom components
import Copyright from '../components/Copyright';

// Applied styles
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://media3.s-nbcnews.com/i/newscms/2018_16/1332942/miso-shrimp-stir-fry-today-042018-tease_ee600a7ee7924360cb376aea3538ec97.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Login component
function Login() {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    axios.get('/auth/authenticate')
      .then((res) => {
          console.log('User already authenticated');
          history.push('/Home');
      })
      .catch((error) => {
          if(error.response.status === 500) {
            console.log(error.response.data.message);
          }
          else console.log(error);
      });
  }, [history]);

  // Input state
  const [login, setLogin] = React.useState({
    email: '',
    password: ''
  });

  // Updates input state
  function handleChange(event) {
    const target = event.target;
    const {name, value} = target;

    setLogin((prevValue) => {
        return {
            ...prevValue,
            [name]: value
        };
    });
  };

  // Verifies input state as a current user
  function submit(event) {
    event.preventDefault();

    const payload = {
        email: login.email,
        password: login.password
    };

    axios({
        url: '/auth/signin',
        method: 'POST',
        data: payload
    })
    .then((res) => {
        console.log('Login complete!');
        history.push('/Home');
    })
    .catch((error) => {
        console.log(error.response.data.message);
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={submit} noValidate>
            <TextField
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify='center'>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;