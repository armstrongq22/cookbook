import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Custom components
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import DisplayPosts from '../components/DisplayPosts';
import Footer from '../components/Footer';


function Home() {
  // Recipe posts state
  const [recipePosts, setRecipePosts] = React.useState([]);

  const history = useHistory();

  // If authenticated, loads recipe posts, otherwise redirects to login
  useEffect(() => {
    axios.get('/auth/authenticate')
      .then((res) => {
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
      axios.get('/api/posts')
      .then((res) => {
        const data = res.data;
        setRecipePosts(data);
        console.log('Posts have been retrieved');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Renders component
  return (
    <div style={{margin: '0 20px', marginBottom: '80px'}}>
      <PrimarySearchAppBar />
      <DisplayPosts scene='Home' posts={recipePosts} />
      <Footer />
    </div>
  )
}

export default Home;