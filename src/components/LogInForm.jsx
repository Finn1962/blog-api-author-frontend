import Loader from "./Loader.jsx";
import { useLoader } from "../Contexts/LoaderContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router";

function LogInForm() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [message, setMessage] = useState("");

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
        }),
      });
      const result = await response.json();
      setMessage(result.message);
      if (result.message === "Login successful") navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFalse();
    }
  }

  return (
    <fieldset
      className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4 shadow-lg"
      onKeyDown={(event) => event.key === "Enter" && fetchLoginData()}
    >
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input
        type="email"
        className="input"
        placeholder="Email"
        onChange={(event) => setEmailValue(event.target.value)}
        value={emailValue}
      />

      <label className="label">Password</label>
      <input
        type="password"
        className="input"
        placeholder="Password"
        onChange={(event) => setPasswordValue(event.target.value)}
        value={passwordValue}
      />

      <button className=" btn btn-neutral mt-4" onClick={fetchLoginData}>
        {isLoading ? <Loader /> : "Login"}
      </button>

      {message !== "" &&
        (message === "Login successful" ? (
          <p className="text-success font-bold mt-1">{message}</p>
        ) : (
          <p className="text-error font-bold mt-1">{message}</p>
        ))}
    </fieldset>
  );
}

export default LogInForm;
