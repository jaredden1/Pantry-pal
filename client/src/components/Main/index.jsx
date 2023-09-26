import { Routes, Route } from "react-router-dom";
import SearchBar from "../../pages/Search/SearchBar";

export default function () {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<SearchBar />} />
      </Routes>
    </main>
  );
}