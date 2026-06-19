import { useState, useEffect } from "react";
import axios from "axios";

function AdminPanel() {

  const [animeList, setAnimeList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [anime, setAnime] = useState({
    title: "",
    genre: "",
    rating: "",
    description: "",
    imageUrl: "",
    trailerUrl: ""
  });

  useEffect(() => {
    loadAnime();
  }, []);

  const loadAnime = () => {

    axios.get(
      "https://animaxx-backend.onrender.com/api/anime/all",
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then((response) => {
      setAnimeList(response.data);
    });

  };

  const addAnime = async () => {

    try {

      await axios.post(
        "https://animaxx-backend.onrender.com/api/anime/add",
        anime,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert("Anime Added!");

      loadAnime();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteAnime = async (id) => {

    try {

      await axios.delete(
        `https://animaxx-backend.onrender.com/api/anime/delete/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      loadAnime();

    } catch (error) {

      console.log(error);

    }

  };
  const updateAnime = async () => {

  try {

    await axios.put(
      `https://animaxx-backend.onrender.com/api/anime/update/${editingId}`,
      anime,
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    alert("Anime Updated!");

    setEditingId(null);

    setAnime({
      title: "",
      genre: "",
      rating: "",
      description: "",
      imageUrl: "",
      trailerUrl: ""
    });

    loadAnime();

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className="p-10">

      <h1 className="text-5xl font-bold mb-8">
        Admin Panel
      </h1>

      <div className="grid gap-4 max-w-xl">

        <input
  className="input input-bordered"
  placeholder="Title"
  value={anime.title}
  onChange={(e) =>
    setAnime({
      ...anime,
      title: e.target.value
    })
  }
/>

        <input
  className="input input-bordered"
  placeholder="Genre"
  value={anime.genre}
  onChange={(e) =>
    setAnime({
      ...anime,
      genre: e.target.value
    })
  }
/>

        <input
  className="input input-bordered"
  placeholder="Rating"
  value={anime.rating}
  onChange={(e) =>
    setAnime({
      ...anime,
      rating: e.target.value
    })
  }
/>

       <input
  className="input input-bordered"
  placeholder="Image URL"
  value={anime.imageUrl}
  onChange={(e) =>
    setAnime({
      ...anime,
      imageUrl: e.target.value
    })
  }
/>

       <input
  className="input input-bordered"
  placeholder="Trailer File"
  value={anime.trailerUrl}
  onChange={(e) =>
    setAnime({
      ...anime,
      trailerUrl: e.target.value
    })
  }
/>
        <textarea
  className="textarea textarea-bordered"
  placeholder="Description"
  value={anime.description}
  onChange={(e) =>
    setAnime({
      ...anime,
      description: e.target.value
    })
  }
/>

        {editingId ? (

  <button
    className="btn btn-warning"
    onClick={updateAnime}
  >
    Update Anime
  </button>

) : (

  <button
    className="btn btn-primary"
    onClick={addAnime}
  >
    Add Anime
  </button>

)}
      </div>

      <div className="mt-10">

        {animeList.map((a) => (

         <div
  key={a.animeId}
  className="flex justify-between items-center p-4 border mb-2"
>

  <h2>{a.title}</h2>

  <div className="flex gap-2">

    <button
      className="btn btn-warning"
      onClick={() => {

        setEditingId(a.animeId);

        setAnime({
          title: a.title,
          genre: a.genre,
          rating: a.rating,
          description: a.description,
          imageUrl: a.imageUrl,
          trailerUrl: a.trailerUrl
        });

      }}
    >
      Edit
    </button>

    <button
      className="btn btn-error"
      onClick={() =>
        deleteAnime(a.animeId)
      }
    >
      Delete
    </button>

  </div>

</div>

        ))}

      </div>

    </div>

  );

}

export default AdminPanel;