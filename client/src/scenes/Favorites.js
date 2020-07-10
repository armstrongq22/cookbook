import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Custom components
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import DisplayPosts from '../components/DisplayPosts';
import Footer from '../components/Footer';


function Favorites() {
  // Recipe posts state
  const [favoritePosts, setFavoritePosts] = React.useState([]);
  const [display, setDisplay] = React.useState(false);

  const history = useHistory();

  // If authenticated, loads recipe posts, otherwise redirects to login
  useEffect(() => {
    axios.get('/auth/authenticate')
      .then((res) => {
          console.log('User authenticated');
          setDisplay(true);
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
      axios.get('/api/getFavorites')
      .then((res) => {
        // console.log(res);
        const data = res.data.posts;
        setFavoritePosts(data);
        console.log('Posts have been retrieved');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if(!display) return null;
  return (
    <div style={{margin: '0 20px', marginBottom: '80px'}}>
      <PrimarySearchAppBar />
      <DisplayPosts posts={favoritePosts} />
      <Footer />
    </div>
  )
}

export default Favorites;