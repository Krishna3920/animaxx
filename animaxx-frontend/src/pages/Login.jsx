import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: email,
          password: password
        }
      );

      localStorage.setItem(
        "token",
        response.data
      );

      localStorage.setItem(
        "email",
        email
      );

  

      navigate("/");
      

console.log("After Navigate");

    } catch (error) {

      alert("Login Failed");
      console.log(error);

    }

  };

  return (

    <div className="container">

      <h1>AniMaxx Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={loginUser}>
        Login
      </button>

    </div>

  );

}

export default Login;