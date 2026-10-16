import { useLoader } from "../Contexts/LoaderContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router";

import LogInForm from "../Components/LogInForm.jsx";

function LogInPage() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [message, setMessage] = useState("");

  const { setLoadingTrue, setLoadingFalse } = useLoader();

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
    <div className="flex justify-center items-center bg-base-200 w-screen h-screen d">
      <LogInForm
        fetchLoginData={fetchLoginData}
        emailValue={emailValue}
        setEmailValue={setEmailValue}
        passwordValue={passwordValue}
        setPasswordValue={setPasswordValue}
        message={message}
      />
    </div>
  );
}

export default LogInPage;
