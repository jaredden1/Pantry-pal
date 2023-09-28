import { Routes, Route } from "react-router-dom";
import SearchBar from "../../pages/Search/SearchBar";
import About from "../../pages/About";
import MyRecipes from "../../pages/MyRecipes";
import RecipeInfo from "../../pages/RecipeInfo";
import Error from "../../pages/Error";
import AuthPage from "../../pages/AuthPage";

export default function () {

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<MyRecipes />} />
        <Route path="/recipe/:id" element={<RecipeInfo />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </main>
  );
}