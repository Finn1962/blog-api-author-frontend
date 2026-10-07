import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
    <div className="flex justify-center content-start pt-8">
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sd:grid-cols-1 gap-10 ps-5 pe-5 max-w-[1600px]">
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
