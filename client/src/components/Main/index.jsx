import { Routes, Route } from "react-router-dom";
import SearchBar from "../../pages/Search/SearchBar";
import About from "../../pages/About";

export default function () {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  );
}