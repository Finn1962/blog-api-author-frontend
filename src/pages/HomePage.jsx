const apiUrl = import.meta.env.VITE_API_URL;
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useFetch } from "../hooks/useFetch.js";
import { useConfirm } from "../Contexts/ConfirmContext.jsx";
import { debounce } from "../utils/debounce.js";
import PageWrapper from "../Components/PageWrapper.jsx";
import PostPreview from "../Components/PostPreview.jsx";
import SearchBar from "../Components/SearchBar.jsx";
import Pagination from "../Components/Pagination.jsx";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilterValue, setStatusFilterValue] = useState("ALL");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentPaginationNumber, setCurrentPaginationNumber] = useState(0);
  const [paginationTotalNumber, setPaginationTotalNumber] = useState(0);
  const elementsOnEachSlide = 10;

  const { fetchData } = useFetch();
  const { showConfirm, setConfirmText, setAlertText, setConfirmCallback } =
    useConfirm();

  function fetchSearch() {
    fetchData({
      url: `${apiUrl}post?searchValue=${searchValue}&status=${statusFilterValue}&skip=${currentPaginationNumber * elementsOnEachSlide}&take=${elementsOnEachSlide}`,
      callback: (result) => {
        setPosts(result.posts);
        setPaginationTotalNumber(
          Math.ceil(result.totalPostsNumber / elementsOnEachSlide),
        );
      },
    });
  }

  useEffect(fetchSearch, [statusFilterValue, currentPaginationNumber]); // eslint-disable-line
  useEffect(() => {
    debounce(fetchSearch);
    setCurrentPaginationNumber(0); // eslint-disable-line
  }, [searchValue]);

  useEffect(() => {
    function handleScroll() {
      setScrollPosition(window.scrollY);
    }

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
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
            {posts.map((post) => {
              return (
                <PostPreview
                  post={post}
                  key={post.id}
                  onDelete={() => {
                    showConfirm();
                    setConfirmText("Do you really want to delete the post?");
                    setAlertText("Warning: Deleted posts cannot be restored!");
                    setConfirmCallback(() => () => {
                      fetchData({
                        url: `${apiUrl}post/${post.id}`,
                        method: "DELETE",
                      });
                      setPosts((prev) => {
                        const abc = prev.filter(
                          (current) => current.id !== post.id,
                        );
                        return abc;
                      });
                    });
                  }}
                />
              );
            })}
          </div>

          <Pagination
            paginationTotalNumber={paginationTotalNumber}
            currentPaginationNumber={currentPaginationNumber}
            setCurrentPaginationNumber={setCurrentPaginationNumber}
          />
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
      />
    </div>
  );
}

export default HomePage;
