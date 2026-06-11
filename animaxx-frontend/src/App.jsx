import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AnimeList from "./pages/AnimeList";
import Watchlist from "./pages/Watchlist";
import AnimeDetails from "./pages/AnimeDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
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
  path="/register"
  element={<Register />}
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
  path="/admin"
  element={
    token ? (
      <AdminPanel />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
<Route
  path="/admin"
  element={
    localStorage.getItem("role") === "ADMIN"
      ? <AdminPanel />
      : <Navigate to="/" />
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

        <Route
          path="/profile"
          element={
            token ? (
              <Profile />
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