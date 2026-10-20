import { useNavigate } from "react-router";

function useFetch() {
  const navigate = useNavigate();

  async function fetchData({
    url,
    method = "GET",
    body = null,
    setLoadingTrue = () => {},
    setLoadingFalse = () => {},
    callback = () => {},
    stringifyBody = true,
  }) {
    try {
      const hasBody =
        method === "POST" || method === "PUT" || method === "PATCH";

      setLoadingTrue();

      let response = await fetch(url, {
        method,
        credentials: "include",
        body: hasBody ? (stringifyBody ? JSON.stringify(body) : body) : null,
      });

      if (response.status === 401) {
        const refreshResponse = await fetch(
          "http://localhost:3000/login/refresh",
          { credentials: "include" },
        );
        if (refreshResponse.status === 401) return navigate("/login");
        response = await fetch(url, {
          method,
          credentials: "include",
          body: hasBody ? (stringifyBody ? JSON.stringify(body) : body) : null,
        });
      }

      const result = await response.json();

      callback(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFalse();
    }
  }

  return { fetchData };
}

export { useFetch };
