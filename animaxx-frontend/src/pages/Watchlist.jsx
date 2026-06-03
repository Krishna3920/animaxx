import { useEffect, useState } from "react";
import axios from "axios";

function Watchlist() {

  const [watchlist, setWatchlist] = useState([]);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:8080/api/watchlist/all")
      .then((response) => {
        setWatchlist(response.data);
      });

    axios
      .get("http://localhost:8080/api/anime/all")
      .then((response) => {
        setAnimeList(response.data);
      });

  }, []);

  return (
    <div className="anime-container">

      <h1>My Watchlist</h1>

      <div className="anime-grid">

        {watchlist.map((item) => {

          const anime = animeList.find(
            (a) => a.animeId === item.animeId
          );

          const removeFromWatchlist = async (id) => {

  try {

    await axios.delete(
      `http://localhost:8080/api/watchlist/delete/${id}`
    );

    setWatchlist(
      watchlist.filter(
        (item) => item.watchlistId !== id
      )
    );

    alert("Removed from Watchlist!");

  } catch (error) {

    console.log(error);

    alert("Failed to Remove!");

  }
};
          return anime ? (
            <div
              className="anime-card"
              key={item.watchlistId}
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
    removeFromWatchlist(item.watchlistId)
  }
>
  Remove
</button>

            </div>
          ) : null;

        })}

      </div>

    </div>
  );
}

export default Watchlist;