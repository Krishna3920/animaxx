import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function AnimeDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [anime, setAnime] = useState(null);


  useEffect(() => {

    axios
      .get("http://localhost:8080/api/anime/all")
      .then((response) => {

        const foundAnime = response.data.find(
          (a) => a.animeId === parseInt(id)
        );

        setAnime(foundAnime);

      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

  if (!anime) {
    return <h1>Loading...</h1>;
  }
const addToWatchlist = async () => {

  try {

    await axios.post(
      "http://localhost:8080/api/watchlist/add",
      {
        userId: 2,
        animeId: anime.animeId
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
    <button
  className="back-btn"
  onClick={() => navigate("/")}
>
  ← Back
</button>

    <div className="details-card">

      <img
        src={anime.imageUrl}
        alt={anime.title}
        className="details-image"
      />

      <div className="details-content">

        <h1>{anime.title}</h1>

        <p><strong>Genre:</strong> {anime.genre}</p>

        <p><strong>Rating:</strong> ⭐ {anime.rating}</p>

        <p><strong>Release Year:</strong> {anime.releaseYear}</p>
        <p><strong>Description:</strong></p>

<p>{anime.description}</p>
<button
  className="watchlist-btn"
  onClick={addToWatchlist}
>
  + Add to Watchlist
</button>

      </div>

    </div>

  </div>
);
}

export default AnimeDetails;