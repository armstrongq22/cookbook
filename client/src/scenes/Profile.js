import React, {useEffect} from 'react';
import axios from 'axios';
import {CirclePicker} from 'react-color';
import {useHistory} from 'react-router-dom';

// Material-ui components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// Custom Components
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';

// Styles
const useStyles = makeStyles(() => ({
    header: {
      textAlign: 'center',
      '& h1': {
        color: '#3f51b5',
      }
    },
    container: {
        margin: '0 20px', 
        marginBottom: '80px',
    },
    paper: {
        textAlign: 'center',
        height: '30px'
    },
    button: {
        marginTop: '2rem',
    },
  }));

function Profile() {
    const classes = useStyles();

    const [color, setColor] = React.useState();
    const [user, setUser] = React.useState();
    const [display, setDisplay] = React.useState(false);
    
    const history = useHistory();

    useEffect(() => {
        axios.get('/auth/authenticate')
          .then(() => {
            axios.get('/auth/user')
                .then((res) => {
                    setUser(res.data);
                    setDisplay(true);
                })
                .catch((error) => {
                    console.log(error);
                });
              console.log('User authenticated');
          })
          .catch((error) => {
              if(error.response.status === 500) {
                console.log(error.response.data.message);
                history.push('/');
              }
              else console.log(error);
          });
      }, [history]);

    function handleChangeComplete(color) {
        setColor(color.hex);
    };

    function handleSumbit(event) {
        event.preventDefault();

        axios.post('/api/avatarColor', {newColor: color})
            .then(() => {
                history.push('/Home');
                console.log('Data has been sent to server');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if(!display) return null;
    return (
        <div className={classes.container}>
            <PrimarySearchAppBar scene='Profile' />
            <div className={classes.header}>
                <h1>User Profile</h1>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <p><strong>Name: </strong>{user.firstName + " " + user.lastName}</p>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <p><strong>Email: </strong>{user.email}</p>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <h3>Avatar Color</h3>
                    <form onSubmit={handleSumbit}>
                        <CirclePicker 
                            width='auto'
                            circleSize={40}
                            circleSpacing={10}
                            color={color}
                            onChangeComplete={handleChangeComplete}
                        />
                        <Button className={classes.button} variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
};

export default Profile;

