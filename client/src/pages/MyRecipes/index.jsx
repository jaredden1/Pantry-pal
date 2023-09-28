import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MyRecipes() {
    const [recipes, setRecipes] = useState([]);  
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetch('http://localhost:4000/recipes')
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching recipes:", error);
                setLoading(false);
            });
    }, []); 

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {recipes.map(recipe => (
                <div key={recipe.id} className="searchResult">
                    <Link to={`/recipe/${recipe.id}`}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} />
                    </Link>
                </div>
            ))}
        </div>
    );
}
