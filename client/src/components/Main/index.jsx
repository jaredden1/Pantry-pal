import { Routes, Route } from "react-router-dom";
import SearchBar from "../../pages/Search/SearchBar";
import About from "../../pages/About/About";
import MyRecipes from "../../pages/MyRecipes/MyRecipes";
import RecipeInfo from "../../pages/RecipeInfo/RecipeInfo";
import Error from "../../pages/Error/Error";

export default function () {

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipe/:id" element={<RecipeInfo />} />
        <Route path="/recipes" element={<MyRecipes />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </main>
  );
}