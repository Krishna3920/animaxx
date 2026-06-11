import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginUser = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email,
          password
        }
      );

      if (
        response.data ===
        "Invalid Email or Password"
      ) {

        alert("Invalid Email or Password");
        return;

      }

      localStorage.setItem(
        "token",
        response.data
      );

      localStorage.setItem(
        "email",
        email
      );

      try {

        const userResponse = await axios.get(
          `http://localhost:8080/api/users/email/${email}`,
          {
            headers: {
              Authorization:
                `Bearer ${response.data}`
            }
          }
        );

        localStorage.setItem(
          "role",
          userResponse.data.role || "USER"
        );

      } catch (err) {

        console.log(
          "Role fetch failed:",
          err
        );

      }

      window.location.href = "/";

    } catch (error) {

      console.log(error);
      alert("Login Failed!");

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
              Watch. Track. Discover Anime.
            </p>

          </div>

          <div className="space-y-4">

            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered input-lg w-full bg-white/10 text-lg"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                className="input input-bordered input-lg w-full bg-white/10 text-lg"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="absolute right-4 top-3"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {
                  showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                }

              </button>

            </div>

            <button
              className="btn btn-primary w-full h-16 text-xl mt-4"
              onClick={loginUser}
            >
              🚀 Login
            </button>

          </div>

          <div className="text-center mt-6">

            <p className="text-lg text-gray-300">
              New to AniMaxx?
            </p>

            <button
              className="btn btn-link text-xl text-purple-400"
              onClick={() =>
                window.location.href =
                  "/register"
              }
            >
              Register
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;