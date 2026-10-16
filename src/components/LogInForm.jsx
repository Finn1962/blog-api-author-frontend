import Loader from "./Loader.jsx";

import { useLoader } from "../Contexts/LoaderContext.jsx";

function LogInForm({
  fetchLoginData,
  emailValue,
  setEmailValue,
  passwordValue,
  setPasswordValue,
  message,
}) {
  const { isLoading } = useLoader();

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

      <button className=" btn btn-primary mt-4" onClick={fetchLoginData}>
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
