import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {

  const [user, setUser] = useState(null);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [watchlistAnime, setWatchlistAnime] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    const loadProfile = async () => {

      try {

        const userResponse = await axios.get(
          `https://animaxx-backend.onrender.com/api/users/email/${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setUser(userResponse.data);

        const userId = userResponse.data.userId;

        const watchlistResponse = await axios.get(
          "https://animaxx-backend.onrender.com/api/watchlist/all",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const animeResponse = await axios.get(
          "https://animaxx-backend.onrender.com/api/anime/all",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const userWatchlist = watchlistResponse.data.filter(
          (item) => item.userId === userId
        );

        setWatchlistCount(userWatchlist.length);

        const animeTitles = userWatchlist.map((watchlistItem) => {

          const anime = animeResponse.data.find(
            (a) => a.animeId === watchlistItem.animeId
          );

          return anime ? anime.title : "Unknown Anime";

        });

        setWatchlistAnime(animeTitles);

      } catch (error) {

        console.log(error);

      }

    };

    loadProfile();

  }, []);

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    navigate("/login");

  };

  if (!user) {

    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-base-200 p-8">

      <div className="max-w-3xl mx-auto">

        <div className="card bg-base-100 shadow-2xl">

          <div className="card-body">

            <h1 className="text-4xl font-bold text-center mb-6">
              My Profile
            </h1>

            <h2 className="text-2xl font-bold">
              {user.username}
            </h2>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>

            <p>
              <strong>User ID:</strong> {user.userId}
            </p>

            <p>
              <strong>Watchlist Count:</strong> {watchlistCount}
            </p>

            <div className="divider"></div>

            <h3 className="text-xl font-bold">
              Recent Watchlist
            </h3>

            {watchlistAnime.length > 0 ? (
              watchlistAnime.map((anime, index) => (
                <p key={index}>
                  ⭐ {anime}
                </p>
              ))
            ) : (
              <p>No anime in watchlist</p>
            )}

            <div className="card-actions justify-end mt-6">

              <button
                className="btn btn-primary"
                onClick={() => navigate("/")}
              >
                Home
              </button>

              <button
                className="btn btn-error"
                onClick={logout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;