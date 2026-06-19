import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {

    try {

      await axios.post(
        "https://animaxx-backend.onrender.com/api/users/register",
        {
          username,
          email,
          password
        }
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);
      alert("Registration Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-900 flex items-center justify-center">

      <div className="w-full max-w-3xl">

        <div className="backdrop-blur-xl bg-white/5 border border-purple-500/30 rounded-3xl p-16">

          <div className="text-center mb-8">

            <h1 className="text-8xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              AniMaxx
            </h1>

            <p className="text-xl text-gray-300 mt-4">
              Create Your Account
            </p>

          </div>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered input-lg w-full bg-white/10 text-lg"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered input-lg w-full bg-white/10 text-lg"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered input-lg w-full bg-white/10 text-lg"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              className="btn btn-primary w-full h-16 text-xl mt-4"
              onClick={registerUser}
            >
              🚀 Register
            </button>

          </div>

          <div className="text-center mt-6">

            <p className="text-lg text-gray-300">
              Already have an account?
            </p>

            <button
              className="btn btn-link text-xl text-purple-400"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Register;