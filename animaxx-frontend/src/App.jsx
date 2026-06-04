import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnimeList from "./pages/AnimeList";
import Watchlist from "./pages/Watchlist";
import AnimeDetails from "./pages/AnimeDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnimeList />} />
        <Route path="/watchlist" element={<Watchlist />} />
         <Route path="/anime/:id" element={<AnimeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;