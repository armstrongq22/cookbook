import React, { useEffect } from 'react';
import axios from 'axios';
import RecipePost from '../components/RecipePost';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import Footer from '../components/Footer';

const postsStyle = {
  position: 'absolute', left: '35%', top: '20%',
  marginBottom: '100px'
};


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
        <RecipePost 
          id={index}
          key={index}
          title={post.title}
          date={post.date}
          body={post.body}
          instructions={post.instructions}
        />)
    );
    
    return display.slice(0).reverse();
  };

  // Renders component
  return (
    <div>
      <PrimarySearchAppBar />
      <div style={postsStyle}>
        {displayPosts(recipePosts)}
      </div>
      <Footer />
    </div>
  )
}

export default Home;