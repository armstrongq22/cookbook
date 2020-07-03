import React from 'react';
import axios from 'axios';

function CreatePost(props) {
    // Input state
    const [newPost, setNewPost] = React.useState({
        title: '',
        body: ''
    });

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
            props.refresh();
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

    return (
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
    );
};

export default CreatePost;