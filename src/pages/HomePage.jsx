import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import BlogPreview from "../Components/BlogPreview.jsx";

function HomePage() {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/home", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) return navigate("/login");
        return response.json();
      })
      .then((result) => {
        setBlogs(result);
        console.log(result);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start xl:px-10 px-5">
      <div className="pt-5 pb-5 flex justify-center btn-block">
        <Link
          to="/post/new"
          className="btn btn-neutral btn-dash w-full max-w-3xl"
        >
          New Post
        </Link>
      </div>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sd:grid-cols-1 gap-5 max-w-[1600px] pb-5">
        <BlogPreview />
        <BlogPreview />
        <BlogPreview />
        <BlogPreview />
        <BlogPreview />
        <BlogPreview />
        <BlogPreview />
      </div>
    </div>
  );
}

export default HomePage;
