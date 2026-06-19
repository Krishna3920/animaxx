import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AnimeDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [anime, setAnime] = useState(null);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {

    axios.get(
      "https://animaxx-backend.onrender.com/api/anime/all",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then((response) => {

      const foundAnime = response.data.find(
        (a) => a.animeId === parseInt(id)
      );

      setAnime(foundAnime);
      setAnimeList(response.data);

    })
    .catch((error) => {
      console.log(error);
    });

  }, [id]);

  const addToWatchlist = async () => {

    try {

      const email = localStorage.getItem("email");

      const userResponse = await axios.get(
        `https://animaxx-backend.onrender.com/api/users/email/${email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const userId = userResponse.data.userId;

      await axios.post(
        "https://animaxx-backend.onrender.com/api/watchlist/add",
        {
          userId,
          animeId: anime.animeId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Added to Watchlist!");

    } catch (error) {

      console.log(error);
      alert("Failed to add!");

    }

  };

  if (!anime) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const relatedAnime = animeList.filter(
    (a) =>
      a.genre === anime.genre &&
      a.animeId !== anime.animeId
  );

  return (

    <div className="min-h-screen bg-base-200">

      <div className="navbar bg-base-100 shadow-lg px-6">

        <div className="flex-1">
          <button
            className="btn btn-outline"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-primary">
            AniMaxx
          </h1>
        </div>

      </div>

      <div className="p-8">

        <div className="card lg:card-side bg-base-100 shadow-2xl">

          <figure className="p-6">

            <img
              src={anime.imageUrl}
              alt={anime.title}
              className="rounded-xl w-80 object-cover"
            />

          </figure>

          <div className="card-body">

            <h1 className="card-title text-5xl">
              {anime.title}
            </h1>

            <p className="text-lg">
              <strong>Genre:</strong> {anime.genre}
            </p>

            <p className="text-lg">
              <strong>Rating:</strong> ⭐ {anime.rating}
            </p>

            <p className="text-lg">
              <strong>Release Year:</strong> {anime.releaseYear}
            </p>

            <div className="divider"></div>

            <h2 className="text-2xl font-bold">
              Description
            </h2>

            <p className="text-base leading-relaxed">
              {anime.description}
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Trailer
            </h2>

            <video
              key={anime.animeId}
              src={`https://animaxx-backend.onrender.com/trailers/${anime.trailerUrl}`}
              controls
              className="w-full rounded-xl shadow-xl"
            />

            <div className="card-actions mt-6">

              <button
                className="btn btn-primary"
                onClick={addToWatchlist}
              >
                + Add to Watchlist
              </button>

            </div>

          </div>

        </div>

        <div className="mt-12">

          <h2 className="text-4xl font-bold mb-6">
            You May Also Like
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {relatedAnime.map((item) => (

              <div
                key={item.animeId}
                className="card bg-base-100 shadow-xl cursor-pointer hover:scale-105 transition-all"
                onClick={() =>
                  navigate(`/anime/${item.animeId}`)
                }
              >

                <figure>

                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-72 w-full object-cover"
                  />

                </figure>

                <div className="card-body">

                  <h2 className="card-title">
                    {item.title}
                  </h2>

                  <p>{item.genre}</p>

                  <p>⭐ {item.rating}</p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default AnimeDetails;