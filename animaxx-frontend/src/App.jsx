import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnimeList from "./pages/AnimeList";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;