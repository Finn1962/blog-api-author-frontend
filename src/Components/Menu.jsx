const apiUrl = import.meta.env.VITE_API_URL;
const userFrontendUrl = import.meta.env.VITE_USER_FRONTEND_URL;
import { useLocation, useNavigate, Link } from "react-router";
import { useProfile } from "../Contexts/ProfileContext.jsx";

function Menu() {
  const { profile } = useProfile();

  const navigate = useNavigate();
  const location = useLocation();

  function logOut() {
    fetch(`${apiUrl}logout`, {
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
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
                  <a href={userFrontendUrl} target="_blank" rel="noopener">
                    User frontend
                  </a>
                </li>
                {profile?.role === "ADMIN" && (
                  <li>
                    <Link to={"/users"}>Users</Link>
                  </li>
                )}
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
                  {profile?.profile_image_url ? (
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={profile?.profile_image_url}
                    />
                  ) : (
                    <div className="h-full bg-accent p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-person-fill h-full invert opacity-20"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      </svg>
                    </div>
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
