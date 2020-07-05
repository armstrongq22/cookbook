import React, { useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import RecipePost from '../components/RecipePost';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import Footer from '../components/Footer';


function Home() {
  // Recipe posts state
  const [recipePosts, setRecipePosts] = React.useState([]);

  // Mounts current recipe posts on load
  useEffect(() => {
    return getRecipePost();
  }, []);

  // Updates recipe posts state to DB
  function getRecipePost() {
    axios.get('/api/posts')
      .then((res) => {
        const data = res.data;
        setRecipePosts(data);
        console.log('Posts have been retrieved');
      })
      .catch(() => {
        console.log('An error has occurred retrieving the posts');
      });
  };

  // Displays posts in recipePosts state
  function displayPosts(posts) {
    if(!posts.length) return;

    const display = (
      posts.map((post, index) => 
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <RecipePost 
          id={index}
          key={index}
          title={post.title}
          date={post.date}
          body={post.body}
          instructions={post.instructions}
        />
      </Grid>)
    );
    
    return display.slice(0).reverse();
  };

  // Renders component
  return (
    <div style={{margin: '0 20px', marginBottom: '80px'}}>
      <PrimarySearchAppBar />
      <Grid container spacing={3}>
        {displayPosts(recipePosts)}
      </Grid>
      <Footer />
    </div>
  )
}

export default Home;