import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

// Material-ui components
import { makeStyles } from '@material-ui/core/styles';

// Custom components
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import CreatePost from '../components/CreatePost';

const useStyles = makeStyles(() => ({
  header: {
    textAlign: 'center',
  },
  create: {
    padding: '0 5% 5%',
  },
}));

function NewPost() {
    const classes = useStyles();
    const [display, setDisplay] = React.useState(false);
    
    const history = useHistory();
    const goHome = () => history.push('/Home');

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

    if(!display) return null;
    return (
        <div>
            <PrimarySearchAppBar scene='NewPost' />
            <div className={classes.header}>
              <h1>Create Post</h1>
            </div>
            <div className={classes.create}> 
              <CreatePost refresh={goHome} />
            </div>
        </div>
    );
};

export default NewPost;
