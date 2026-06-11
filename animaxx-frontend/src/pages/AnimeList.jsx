import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AnimeList() {

  const [searchTerm, setSearchTerm] = useState("");
  const [animeList, setAnimeList] = useState([]);

  const role = localStorage.getItem("role");

  const navigate = useNavigate();

  useEffect(() => {

    axios.get(
      "http://localhost:8080/api/anime/all",
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then((response) => {
      setAnimeList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }, []);

  const addToWatchlist = async (animeId) => {

    try {

      const email =
        localStorage.getItem("email");

      const userResponse = await axios.get(
        `http://localhost:8080/api/users/email/${email}`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const userId =
        userResponse.data.userId;

      await axios.post(
        "http://localhost:8080/api/watchlist/add",
        {
          userId,
          animeId
        },
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Added to Watchlist!");

    } catch (error) {

      console.log(error);

      if (error.response) {

        console.log(
          "Status:",
          error.response.status
        );

        console.log(
          "Data:",
          error.response.data
        );

      }

      alert("Failed to add!");

    }

  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/login");

  };

  const topRatedAnime = [...animeList]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (

    <div className="min-h-screen bg-base-200">

      <div className="navbar bg-base-100 shadow-lg px-6">

        <div className="flex-1">

          <h1 className="text-3xl font-bold text-primary">
            AniMaxx
          </h1>

        </div>

        <div className="flex gap-2">

          <Link to="/">
            <button className="btn btn-primary">
              Home
            </button>
          </Link>

          <Link to="/watchlist">
            <button className="btn btn-secondary">
              Watchlist
            </button>
          </Link>

          <Link to="/profile">
            <button className="btn btn-accent">
              Profile
            </button>
          </Link>

          {role === "ADMIN" && (

            <button
              className="btn btn-warning"
              onClick={() =>
                navigate("/admin")
              }
            >
              Admin
            </button>

          )}

          <button
            className="btn btn-error"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

      <div className="p-8">

        <h1 className="text-5xl font-bold text-center mb-6">
          AniMaxx Anime List
        </h1>

        <p className="text-center text-lg mb-6">
          Total Anime: {animeList.length}
        </p>

        <h2 className="text-3xl font-bold mb-6">
          🔥 Top Rated Anime
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {topRatedAnime.map((anime) => (

            <div
              key={anime.animeId}
              className="card bg-base-100 shadow-xl"
            >

              <figure>

                <img
                  src={anime.imageUrl}
                  alt={anime.title}
                  className="h-60 w-full object-cover"
                />

              </figure>

              <div className="card-body">

                <h2 className="card-title">
                  {anime.title}
                </h2>

                <p>
                  ⭐ {anime.rating}
                </p>

              </div>

            </div>

          ))}

        </div>

        <div className="flex justify-center mb-8">

          <input
            type="text"
            placeholder="Search Anime..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="input input-bordered w-full max-w-md"
          />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {animeList
            .filter((anime) =>
              anime.title
                .toLowerCase()
                .includes(
                  searchTerm.toLowerCase()
                )
            )
            .map((anime) => (

              <div
                key={anime.animeId}
                className="card bg-base-100 shadow-xl cursor-pointer hover:scale-105 transition-all"
                onClick={() =>
                  navigate(
                    `/anime/${anime.animeId}`
                  )
                }
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

                  <p>
                    Genre: {anime.genre}
                  </p>

                  <p>
                    ⭐ {anime.rating}
                  </p>

                  <div className="card-actions justify-end">

                    <button
                      className="btn btn-primary"
                      onClick={(e) => {

                        e.stopPropagation();

                        addToWatchlist(
                          anime.animeId
                        );

                      }}
                    >
                      Add to Watchlist
                    </button>

                  </div>

                </div>

              </div>

            ))}

        </div>

      </div>

    </div>

  );

}

export default AnimeList;