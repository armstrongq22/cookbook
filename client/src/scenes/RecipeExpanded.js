import React, {useState} from 'react';
import axios from 'axios';

function RecipeExpanded(props) {
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
        <h1>{recipe.title}</h1>
    );
};

export default RecipeExpanded;
