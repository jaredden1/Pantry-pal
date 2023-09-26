import { Routes, Route } from "react-router-dom";
import SearchBar from "../../pages/Search/SearchBar";
import About from "../../pages/About";
import Recipes from "../../pages/Recipes";

export default function () {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </main>
  );
}