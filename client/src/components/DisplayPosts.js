import React from 'react';

// Material-ui components
import Grid from '@material-ui/core/Grid';

// Custom components
import RecipePost from '../components/RecipePost';

function DisplayPosts(props) {

    // Displays posts in reverse order (most recent first)
    function displayPosts(posts) {
        if(!posts.length) return;

        const display = (
        posts.map((post, index) => 
        <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
            <RecipePost 
            id={post._id}
            key={index}
            account={post.account}
            name={post.accountName}
            title={post.title}
            date={post.date}
            body={post.body}
            ingredients={post.ingredients}
            instructions={post.instructions}
            image={post.imageData}
            scene={props.scene}
            />
        </Grid>)
    );
    
    return display.slice(0).reverse();
  };

    return (
        <Grid container spacing={3}>
            {displayPosts(props.posts)}
        </Grid>
    )
};

export default DisplayPosts;
