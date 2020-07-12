import React from 'react';
import axios from 'axios';

// Material-ui components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

//Custom component
import defaultImage from '../images/defaultImage.jpg';

// Styles
const useStyles = makeStyles(() => ({
    inputBackground: {
        backgroundColor: 'white',
    },
    imagePreview: {
        maxWidth:'100%', 
        maxHeight:'500px',
    },
    input: {
        display: 'none',
    },
}));

function CreatePost(props) {
    const classes = useStyles();

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
            <Grid container spacing={2}>
                <Grid container item xs={6} spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            label="Title"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={handleChange}
                            value={newPost.title}
                            className={classes.inputBackground}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="body"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows='5'
                            required
                            fullWidth
                            onChange={handleChange}
                            value={newPost.body}
                            className={classes.inputBackground}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name="ingredients"
                            label="Ingredients"
                            variant="outlined"
                            multiline
                            rows='5'
                            required
                            fullWidth
                            onChange={handleChange}
                            value={newPost.ingredients}
                            className={classes.inputBackground}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="instructions"
                            label="Instructions"
                            variant="outlined"
                            multiline
                            rows='10'
                            required
                            fullWidth
                            onChange={handleChange}
                            value={newPost.instructions}
                            className={classes.inputBackground}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <p>No backslash or spaces in photo name</p>
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="contained-button-file">
                            <Button
                                variant="contained"
                                color="default"
                                component="span"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <img 
                        src={newPreviewImage} 
                        required 
                        alt="" 
                        className={classes.imagePreview}
                    />
                </Grid>
            </Grid>
        </form>
    );
};

export default CreatePost;
