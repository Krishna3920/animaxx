import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Watchlist() {

  const [watchlist, setWatchlist] = useState([]);
  const [animeList, setAnimeList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    axios.get(
      "http://localhost:8080/api/watchlist/all",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((response) => {
      console.log("WATCHLIST:", response.data);
      setWatchlist(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

    axios.get(
      "http://localhost:8080/api/anime/all",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((response) => {
      console.log("ANIME:", response.data);
      setAnimeList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }, []);

  const removeFromWatchlist = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/api/watchlist/delete/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setWatchlist(
        watchlist.filter(
          (item) => item.watchlistId !== id
        )
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-base-200">

      <div className="navbar bg-base-100 shadow-lg px-6">

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary">
            My Watchlist
          </h1>
        </div>

        <div className="flex gap-2">

          <Link to="/">
            <button className="btn btn-primary">
              Home
            </button>
          </Link>

          <Link to="/profile">
            <button className="btn btn-accent">
              Profile
            </button>
          </Link>

        </div>

      </div>

      <div className="p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {watchlist.map((item) => {

            const anime = animeList.find(
              (a) => a.animeId === item.animeId
            );

            return anime ? (

              <div
                key={item.watchlistId}
                className="card bg-base-100 shadow-xl"
              >

                <figure>

                  <img
                    src={anime.imageUrl}
                    alt={anime.title}
                    className="h-80 w-full object-cover"
                  />

                </figure>

                <div className="card-body">

                  <h2 className="card-title">
                    {anime.title}
                  </h2>

                  <p>Genre: {anime.genre}</p>

                  <p>⭐ {anime.rating}</p>

                  <div className="card-actions justify-between">

                    <button
                      className="btn btn-info"
                      onClick={() =>
                        navigate(`/anime/${anime.animeId}`)
                      }
                    >
                      Details
                    </button>

                    <button
                      className="btn btn-error"
                      onClick={() =>
                        removeFromWatchlist(
                          item.watchlistId
                        )
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            ) : null;

          })}

        </div>

      </div>

    </div>

  );

}

export default Watchlist;