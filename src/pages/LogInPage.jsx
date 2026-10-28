import { useLoader } from "../Contexts/LoaderContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router";

import Loader from "../Components/Loader.jsx";

function LogInPage() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");

  const { isLoading, setLoadingTrue, setLoadingFalse } = useLoader();

  const navigate = useNavigate();

  async function fetchLoginData() {
    setLoadingTrue();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          portal: "AUTHOR",
        }),
      });
      const result = await response.json();
      setError(result.errors ? result.errors[0] : "");
      if (result.message === "Login successful") navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFalse();
    }
  }

  return (
    <div className="flex justify-center items-center bg-base-200 w-screen h-screen d">
      <fieldset
        className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4 shadow-lg"
        onKeyDown={(event) => event.key === "Enter" && fetchLoginData()}
      >
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input bg-base-300"
          placeholder="Email"
          onChange={(event) => setEmailValue(event.target.value)}
          value={emailValue}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input bg-base-300"
          placeholder="Password"
          onChange={(event) => setPasswordValue(event.target.value)}
          value={passwordValue}
        />

        <button className=" btn btn-primary mt-4" onClick={fetchLoginData}>
          {isLoading ? <Loader /> : "Login"}
        </button>

        {error !== "" && <p className="text-error font-bold mt-1">{error}</p>}
      </fieldset>
    </div>
  );
}

export default LogInPage;
