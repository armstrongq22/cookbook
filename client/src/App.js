import React, { useEffect } from 'react';
import axios from 'axios';


function App() {
  // recipe posts state and input state
  const [recipePosts, setRecipePosts] = React.useState([]);
  const [newPost, setNewPost] = React.useState({
    title: '',
    body: ''
  });

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

  // Displays posts in recipe posts state
  function displayPosts(posts) {
    if(!posts.length) return null;

    return posts.slice(0).reverse().map((post, index) => (
      <div key={index}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  }

  // Updates input state
  function handleChange(event) {
    const target = event.target;
    const {name, value} = target;

    setNewPost((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  };

  // Submits input state as a new recipe
  function submit(event) {
    event.preventDefault();

    const payload = {
      title: newPost.title,
      body: newPost.body
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Data has been sent to server');
      resetInput();
      getRecipePost();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // Resets input state after submission
  function resetInput() {
    setNewPost({
      title: "",
      body: ''
    });
  };

  // Renders component
  return (
    <div>
      <h2>Welcome</h2>
      <form onSubmit={submit}>
        <div className='form-input'>
          <input 
            type='text'
            name='title'
            placeholder='title'
            value={newPost.title}
            onChange={handleChange}
          />
        </div>
        <div className='form-input'>
          <textarea 
            name='body'
            placeholder='body'
            cols='30'
            rows='10'
            value={newPost.body}
            onChange={handleChange}
          />
        </div>
        <button>Submit</button>
      </form>
      <div>
        {displayPosts(recipePosts)}
      </div>
    </div>
  )
}

export default App;