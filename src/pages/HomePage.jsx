import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import BlogPreview from "../Components/BlogPreview.jsx";
import { checkAuth } from "../utils/loggedIn.js";

function HomePage() {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/home", {
      method: "GET",
      credentials: "include",
    })
      .then(checkAuth(navigate))
      .then((response) => response.json())
      .then((result) => {
        setBlogs(result);
        console.log(result);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start xl:px-10 px-5 pt-5">
      <div className="max-w-[1600px]">
        <div className=" flex justify-between w-full bg-base-100 p-3 rounded-md mb-5 shadow-sm gap-5">
          <Link
            to="/post/new"
            className="btn btn-primary font-regular border-base-300 w-32"
          >
            New Post +
          </Link>

          <div className="flex content-center items-center gap-3">
            <div className="flex content-center items-center gap-3">
              <p className="font-semibold">Select: </p>
              <select
                defaultValue="All"
                className="select font-normal border-base-300 "
              >
                <option>All</option>
                <option>Draft</option>
                <option>Public</option>
              </select>
            </div>

            <div className="join">
              <div>
                <div>
                  <input
                    className="input join-item md:w-50 w-20"
                    placeholder="Search"
                  />
                </div>
              </div>
              <select className="select join-item" defaultValue="None">
                <option>None</option>
                <option>Sci-fi</option>
                <option>Drama</option>
              </select>
              <div className="indicator">
                <button className="btn btn-primary font-normal  w-20">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sd:grid-cols-1 gap-5  pb-5">
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
          <BlogPreview />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
