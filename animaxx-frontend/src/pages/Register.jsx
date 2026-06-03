import { useState } from "react";
import axios from "axios";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          username,
          email,
          password
        }
      );

      alert("Registration Successful");

      console.log(response.data);

    } catch (error) {

      alert("Registration Failed");
      console.log(error);

    }
  };

  return (
    <div className="container">

      <h1>AniMaxx Register</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={registerUser}>
        Register
      </button>

    </div>
  );
}

export default Register;