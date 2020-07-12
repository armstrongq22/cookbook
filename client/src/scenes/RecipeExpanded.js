import React, {useState} from 'react';
import axios from 'axios';

// Material-ui components
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        padding: '5% 10%',
    },
    heading: {
        marginBottom: '4rem',
        textAlign: 'center',
        padding: '2rem 1rem',
    },
    image: {
        display: 'box',
        margin: '0 auto',
        padding: '2rem 0',
        width: '50%',
    },
}));

function RecipeExpanded(props) {
    const classes = useStyles();

    const [recipe, setRecipe] = React.useState(null);
    
    useState(() => {
        axios.post('/api/getRecipeExpanded', {id: props.match.params.id})
            .then((res) => {
                setRecipe(res.data.post)
                console.log('Data has been sent to server');
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if(!recipe) return <h1 style={{color: '#6c7b8c'}}>Loading...</h1>
    return ( 
        <div className={classes.root}>
            <div className={classes.heading}>
                <h1>{recipe.title}</h1>
                <p>Creator: {recipe.accountName}</p>
            </div>
            <p>{recipe.body}</p>
            <p>{recipe.ingredients}</p>
            <p>{recipe.instructions}</p>
            <img className={classes.image} src={recipe.imageData} alt='Recipe' />
        </div>
    );
};

export default RecipeExpanded;
