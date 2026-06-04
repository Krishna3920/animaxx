import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AnimeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/anime/all")
      .then((response) => {
        console.log(response.data);
        setAnimeList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addToWatchlist = async (animeId) => {
    try {
      await axios.post(
        "http://localhost:8080/api/watchlist/add",
        {
          userId: 2,
          animeId: animeId,
        }
      );

      alert("Added to Watchlist!");
    } catch (error) {
      console.log(error);
      alert("Failed to add!");
    }
  };

  return (
    <div className="anime-container">
      <nav className="navbar">
        <h2>AniMaxx</h2>

        <div>
          <Link to="/">
            <button>Home</button>
          </Link>

          <Link to="/watchlist">
            <button>Watchlist</button>
          </Link>
        </div>
      </nav>

      <h1>AniMaxx Anime List</h1>

      <p>Total Anime: {animeList.length}</p>

      <input
        type="text"
        placeholder="Search Anime..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      <div className="anime-grid">
        {animeList
          .filter((anime) =>
            anime.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          )
          .map((anime) => (
            <div
  className="anime-card"
  key={anime.animeId}
  onClick={() =>
    navigate(`/anime/${anime.animeId}`)
  }
>
              <img
               src={anime.imageUrl}
                alt={anime.title}
                className="anime-image"
              />

              <h2>{anime.title}</h2>

              <p>{anime.genre}</p>

              <p>⭐ {anime.rating}</p>

              <button
                className="watchlist-btn"
                onClick={() =>
                  addToWatchlist(anime.animeId)
                }
              >
                + Add to Watchlist
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AnimeList;