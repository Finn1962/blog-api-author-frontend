import { useLocation, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch.js";

function Menu() {
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { fetchData } = useFetch();

  useEffect(() => {
    fetchData({
      url: "http://localhost:3000/profile",
      callback: (result) => {
        setProfile(result.userData);
      },
    });
  }, []);

  function logOut() {
    fetch("http://localhost:3000/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === "Logout successful") navigate("/login");
      });

    return;
  }

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <div className="navbar bg-base-100 shadow-sm z-100 ps-5 pe-5">
          <div className="navbar-start w-fulll">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  aria-label="Menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <a
                    href="http://localhost:5000/"
                    target="_blank"
                    rel="noopener"
                  >
                    User frontend
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="navbar-center">
            <Link to="/" className="btn btn-ghost text-xl font-heading">
              .codersBackend
            </Link>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {profile && (
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={profile?.profile_image_url}
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to={"/profile"}>
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logOut}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
