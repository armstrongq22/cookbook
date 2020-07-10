import React from 'react';
import axios from 'axios';

//Custom component
import defaultImage from '../images/defaultImage.jpg';

function CreatePost(props) {
    // Input state
    const [newPost, setNewPost] = React.useState({
        title: '',
        body: '',
        ingredients: '',
        instructions: ''
    });
    const [newPostImage, setNewPostImage] = React.useState();
    const [newPreviewImage, setPreviewImage] = React.useState(defaultImage);

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

        let recipeObject = new FormData();

        recipeObject.append('title', newPost.title);
        recipeObject.append('body', newPost.body);
        recipeObject.append('ingredients', newPost.ingredients);
        recipeObject.append('instructions', newPost.instructions);
        recipeObject.append('imageData', newPostImage);

        axios.post('/api/save', recipeObject)
            .then(() => {
                console.log('Data has been sent to server');
                resetInput();
                props.refresh();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Resets input state after submission
    function resetInput() {
        setNewPost({
            title: '',
            body: '',
            ingredients: '',
            instructions: ''
        });
        setNewPostImage(defaultImage);
    };

    function handleImageChange(event) {
        setNewPostImage(event.target.files[0]);
        handlePreview(event);
    };

    function handlePreview(event) {
        event.preventDefault();

        let file = event.target.files[0];
        let reader = new FileReader();
    
        if (event.target.files.length === 0) {
          return;
        }
    
        reader.onloadend = (e) => {
          setPreviewImage(reader.result);
        };
    
        reader.readAsDataURL(file);
    };
    

    return (
        <form onSubmit={submit}>
            <div className='form-input'>
                <input 
                    type='text'
                    name='title'
                    placeholder='title'
                    value={newPost.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='form-input'>
                <textarea 
                    name='body'
                    placeholder='body'
                    cols='30'
                    rows='5'
                    value={newPost.body}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='form-input'>
                <textarea 
                    name='instructions'
                    placeholder='instructions'
                    cols='30'
                    rows='10'
                    value={newPost.instructions}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='form-input'>
                <textarea 
                    name='ingredients'
                    placeholder='ingredients'
                    cols='30'
                    rows='10'
                    value={newPost.ingredients}
                    onChange={handleChange}
                    required
                />
            </div>
            <input type='file' onChange={handleImageChange} />
            <img src={newPreviewImage} required width='100px' height='100px' alt="" />
            <button>Submit</button>
        </form>
    );
};

export default CreatePost;
