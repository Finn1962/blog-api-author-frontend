import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { checkAuth } from "../utils/loggedIn.js";
import { useLoader } from "../Contexts/LoaderContext.jsx";
import BlogPreview from "../Components/BlogPreview.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import Loader from "../Components/Loader.jsx";

function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [publicFilter, setPublicFilter] = useState("all");

  const { setLoadingTrue, setLoadingFalse } = useLoader();

  const navigate = useNavigate();

  useEffect(() => {
    setLoadingTrue();
    fetch("http://localhost:3000/post", {
      method: "GET",
      credentials: "include",
    })
      .then(checkAuth(navigate))
      .then((response) => response.json())
      .then((result) => {
        setBlogs(result.blogs);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingFalse());
  }, []);

  return (
    <>
      <Loader className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" />
      <div className="flex flex-col items-center justify-start xl:px-10 px-5 pt-5">
        <div className="max-w-[1600px] w-full">
          <div className="flex flex-col  gap-3 w-full bg-base-100 p-3 rounded-md mb-5 shadow-sm ">
            <div className=" flex justify-between items-center gap-5">
              <div className="filter flex-nowrap">
                <input
                  className="btn btn-outline  border-base-300"
                  type="checkbox"
                  name="frameworks"
                  value="public"
                  aria-label="Public"
                  checked={publicFilter === "public"}
                  onChange={() =>
                    setPublicFilter((prev) =>
                      prev !== "public" ? "public" : "all",
                    )
                  }
                />
                <input
                  className="btn btn-outline border-base-300"
                  type="checkbox"
                  name="frameworks"
                  value="draft"
                  aria-label="Draft"
                  checked={publicFilter === "draft"}
                  onChange={() =>
                    setPublicFilter((prev) =>
                      prev !== "draft" ? "draft" : "all",
                    )
                  }
                />
              </div>
              <SearchBar className="join w-full max-w-300 md:flex hidden" />
              <Link
                to="/post/new"
                className="btn btn-primary font-regular border-base-300 w-32"
              >
                New Post +
              </Link>
            </div>
            <SearchBar className="join w-full max-w-300 md:hidden flex" />
          </div>
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sd:grid-cols-1 gap-5  pb-5">
            {blogs.map((blog) => (
              <BlogPreview
                key={blog.id}
                title={blog.title}
                content={blog.content}
                imageUrl={blog.image_url}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
