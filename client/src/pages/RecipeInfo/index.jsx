import { useParams } from "react-router"
import { getRecipeDetails } from "../../utilities/SearchAPI/searchService"
import { useEffect, useState } from "react";

export default function RecipeInfo() {
    const {id} = useParams()
    const [recipe, setRecipe] = useState([])
    const [loading, setLoading] = useState(true)
    async function recipeDetail() {
    const result = await getRecipeDetails(id); 
    console.log(result.data[0].title)
    setRecipe(result) 
    setLoading(false)
    } 

    useEffect(() => {
        recipeDetail()
    }, [loading]
    );
    return loading ? (
    <div>loading</div>
    ) : (

        <h1>Recipes Page</h1>
    )
}