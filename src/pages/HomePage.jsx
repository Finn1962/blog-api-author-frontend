import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useLoader } from "../Contexts/LoaderContext.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { useConfirm } from "../Contexts/ConfirmContext.jsx";
import { debounce } from "../utils/debounce.js";
import PageWrapper from "../Components/PageWrapper.jsx";
import BlogPreview from "../Components/BlogPreview.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import Loader from "../Components/Loader.jsx";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilterValue, setStatusFilterValue] = useState("ALL");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPaginationNumber, setCurrentPaginationNumber] = useState(0);
  const elementsOnEachSlide = 5;
  const paginationTotalNumber = Math.ceil(posts.length / elementsOnEachSlide);

  const { setLoadingTrue, setLoadingFalse } = useLoader();
  const { fetchData } = useFetch();
  const { showConfirm, setConfirmText, setAlertText, setConfirmCallback } =
    useConfirm();

  function fetchSearch() {
    fetchData({
      url: `http://localhost:3000/post/search?searchValue=${searchValue}&status=${statusFilterValue}`,
      setLoadingTrue,
      setLoadingFalse,
      callback: (result) => {
        setPosts(result.posts);
      },
    });
    setCurrentPaginationNumber(0);
  }

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchData({
      url: "http://localhost:3000/post",
      setLoadingTrue,
      setLoadingFalse,
      callback: (result) => {
        setPosts(result.posts);
      },
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPaginationNumber]);

  useEffect(fetchSearch, [statusFilterValue]); // eslint-disable-line
  useEffect(() => debounce(fetchSearch), [searchValue]);

  return (
    <>
      <Loader className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" />
      <PageWrapper>
        <div className="w-full relative">
          <ControllerBar
            statusFilterValue={statusFilterValue}
            setStatusFilterValue={setStatusFilterValue}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            fetchSearch={fetchSearch}
          />
          {scrollPosition > 80 && (
            <ControllerBar
              className="fixed top-0 left-0 z-100 top-slide-in"
              statusFilterValue={statusFilterValue}
              setStatusFilterValue={setStatusFilterValue}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              fetchSearch={fetchSearch}
            />
          )}
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sd:grid-cols-1 gap-5  pb-5">
            {posts
              ?.slice(
                currentPaginationNumber * elementsOnEachSlide,
                currentPaginationNumber * elementsOnEachSlide +
                  elementsOnEachSlide,
              )
              .map((blog) => {
                return (
                  <BlogPreview
                    blog={blog}
                    key={blog.id}
                    onDelete={() => {
                      showConfirm();
                      setConfirmText("Do you really want to delete the post?");
                      setAlertText(
                        "Warning: Deleted posts cannot be restored!",
                      );
                      setConfirmCallback(() => () => {
                        fetchData({
                          url: `http://localhost:3000/post/${blog.id}`,
                          method: "DELETE",
                        });
                        setPosts((prev) => {
                          const abc = prev.filter(
                            (current) => current.id !== blog.id,
                          );
                          return abc;
                        });
                      });
                    }}
                  />
                );
              })}
          </div>

          <div className="join">
            {new Array(paginationTotalNumber).fill(0).map((_, index) => (
              <button
                className={`join-item btn ${currentPaginationNumber === index && "btn-primary"}`}
                key={index}
                onClick={() => {
                  setCurrentPaginationNumber(index);
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

function ControllerBar({
  className,
  statusFilterValue,
  setStatusFilterValue,
  searchValue,
  setSearchValue,
  fetchSearch,
}) {
  return (
    <div
      className={`flex flex-col  gap-3 w-full bg-base-100 p-3  mb-5 shadow-sm ${className}`}
    >
      <div className=" flex justify-between items-center gap-5">
        <div className="filter flex-nowrap">
          <input
            className="btn btn border-base-300 "
            type="checkbox"
            name="frameworks"
            value="PUBLIC"
            aria-label="Public"
            checked={statusFilterValue === "PUBLIC"}
            onChange={() =>
              setStatusFilterValue((prev) =>
                prev !== "PUBLIC" ? "PUBLIC" : "ALL",
              )
            }
          />
          <input
            className="btn btn border-base-300 "
            type="checkbox"
            name="frameworks"
            value="DRAFT"
            aria-label="Draft"
            checked={statusFilterValue === "DRAFT"}
            onChange={() =>
              setStatusFilterValue((prev) =>
                prev !== "DRAFT" ? "DRAFT" : "ALL",
              )
            }
          />
        </div>
        <SearchBar
          className="join w-full max-w-300 md:flex hidden "
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          fetchSearch={fetchSearch}
        />
        <Link
          to="/post/new"
          className="btn btn-primary font-regular border-base-300 w-32"
        >
          New Post +
        </Link>
      </div>
      <SearchBar
        className="join w-full max-w-300 md:hidden flex"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fetchSearch={fetchSearch}
      />
    </div>
  );
}

export default HomePage;
