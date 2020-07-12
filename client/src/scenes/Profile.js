import React, {useEffect} from 'react';
import axios from 'axios';
import {CirclePicker} from 'react-color';
import {useHistory} from 'react-router-dom';

// Material-ui components
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
  }));

function Profile() {
    const classes = useStyles();

    const [color, setColor] = React.useState();
    const [display, setDisplay] = React.useState(false);
    
    const history = useHistory();

    useEffect(() => {
        axios.get('/auth/authenticate')
          .then(() => {
              setDisplay(true);
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
            <form onSubmit={handleSumbit}>
                <CirclePicker 
                    color={color}
                    onChangeComplete={handleChangeComplete}
                />
                <button>Submit</button>
            </form>
        </div>
    )
};

export default Profile;

