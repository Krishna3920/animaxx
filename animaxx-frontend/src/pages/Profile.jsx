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

    const loadProfile = async () => {

      try {

        const userResponse = await axios.get(
          `http://localhost:8080/api/users/email/${email}`
        );

        setUser(userResponse.data);

        const userId = userResponse.data.userId;

        const watchlistResponse = await axios.get(
          "http://localhost:8080/api/watchlist/all"
        );

        const animeResponse = await axios.get(
          "http://localhost:8080/api/anime/all"
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

    navigate("/login");

  };

  if (!user) {

    return <h1>Loading...</h1>;

  }

  return (

    <div className="anime-container">

      <h1>My Profile</h1>

      <div className="details-card">

        <div className="details-content">

          <h2>{user.username}</h2>

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

          <h3>Recent Watchlist</h3>

          {watchlistAnime.map((anime, index) => (

            <p key={index}>
              ⭐ {anime}
            </p>

          ))}

          <button
            className="watchlist-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default Profile;