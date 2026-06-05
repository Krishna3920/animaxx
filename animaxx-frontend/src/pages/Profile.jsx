import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const email = localStorage.getItem("email");

    axios
      .get(
        `http://localhost:8080/api/users/email/${email}`
      )
      .then((response) => {

        setUser(response.data);

      })
      .catch((error) => {

        console.log(error);

      });

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