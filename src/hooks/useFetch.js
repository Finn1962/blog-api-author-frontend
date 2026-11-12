const apiUrl = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router";

function useFetch() {
  const navigate = useNavigate();

  async function fetchData({
    url,
    method = "GET",
    body = null,
    setIsLoading = () => {},
    callback = () => {},
    stringifyBody = true,
  }) {
    try {
      const hasBody =
        method === "POST" || method === "PUT" || method === "PATCH";

      setIsLoading(true);

      let response = await fetch(url, {
        method,
        credentials: "include",
        body: hasBody ? (stringifyBody ? JSON.stringify(body) : body) : null,
      });

      if (response.status === 401) {
        const refreshResponse = await fetch(`${apiUrl}login/refresh`, {
          credentials: "include",
        });
        if (refreshResponse.status === 401) return navigate("/login");
        response = await fetch(url, {
          method,
          credentials: "include",
          body: hasBody ? (stringifyBody ? JSON.stringify(body) : body) : null,
        });
      }

      const result = await response.json();
      callback(result);
      return result;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { fetchData };
}

export { useFetch };
