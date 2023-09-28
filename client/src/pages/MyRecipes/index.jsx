import React, { useState, useEffect } from 'react';

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

    function stripHtml(html) {
        if (!html) return "";
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {recipes.map(recipe => (
                <div key={recipe.id} className="searchResult">
                    <h2>{recipe.title}</h2>
                    <img src={recipe.image} alt={recipe.title}/>
                    <p>{stripHtml(recipe.summary)}</p>
                    <br />
                    <p>Ingredients:{recipe.ingredients}</p>
                    <br />
                    <p>Instructions:{recipe.instructions}</p>
                </div>
            ))}
        </div>
    );
}
