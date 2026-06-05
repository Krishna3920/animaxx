import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AnimeList from "./pages/AnimeList";
import Watchlist from "./pages/Watchlist";
import AnimeDetails from "./pages/AnimeDetails";
import Login from "./pages/Login";

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            token ? (
              <AnimeList />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/watchlist"
          element={
            token ? (
              <Watchlist />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/anime/:id"
          element={
            token ? (
              <AnimeDetails />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;