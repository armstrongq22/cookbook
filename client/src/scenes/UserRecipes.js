import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Material-ui components
import { makeStyles } from '@material-ui/core/styles';

// Custom components
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import DisplayPosts from '../components/DisplayPosts';

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

function UserRecipes() {
  const classes = useStyles();

  // Recipe posts state
  const [UserPosts, setUserPosts] = React.useState([]);
  const [display, setDisplay] = React.useState(false);

  const history = useHistory();

  // If authenticated, loads recipe posts, otherwise redirects to login
  useEffect(() => {
    axios.get('/auth/authenticate')
      .then(() => {
          console.log('User authenticated');
          getRecipePost();
      })
      .catch((error) => {
          if(error.response.status === 500) {
            console.log(error.response.data.message);
            history.push('/');
          }
          else console.log(error);
      });
  }, [history]);

  // Updates recipe posts state to DB
  function getRecipePost() {
      axios.get('/api/getUserRecipes')
      .then((res) => {
        const data = res.data.posts;
        setUserPosts(data);
        setDisplay(true);
        console.log('Posts have been retrieved');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if(!display) return null;
  return (
    <div className={classes.container}>
      <PrimarySearchAppBar scene='UserRecipes' />
      <div className={classes.header}>
        <h1>Your Recipes</h1>
      </div>
      <DisplayPosts scene='UserRecipes' posts={UserPosts} />
    </div>
  )
}

export default UserRecipes;
