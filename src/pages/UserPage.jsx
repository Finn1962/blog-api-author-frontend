const apiUrl = import.meta.env.VITE_API_URL;
import { useState, useEffect } from "react";
import { useConfirm } from "../Contexts/ConfirmContext.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { debounce } from "../utils/debounce.js";
import PageWrapper from "../Components/PageWrapper";
import DeleteButton from "../Components/DeleteButton";
import EditButton from "../Components/EditButton";
import SearchBar from "../Components/SearchBar.jsx";
import Pagination from "../Components/Pagination.jsx";
import { useNavigate } from "react-router-dom";

function UsersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [roleValue, setRoleValue] = useState("ALL");
  const [currentPaginationNumber, setCurrentPaginationNumber] = useState(0);
  const [paginationTotalNumber, setPaginationTotalNumber] = useState(0);
  const elementsOnEachSlide = 10;

  const { fetchData } = useFetch();

  function getUserData() {
    fetchData({
      url: `${apiUrl}profile/all?searchValue=${searchValue}&role=${roleValue}&skip=${currentPaginationNumber * elementsOnEachSlide}&take=${elementsOnEachSlide}`,
      setIsLoading: setIsLoading,
      callback: (result) => {
        setUsers(result.userDatas);
        setPaginationTotalNumber(
          Math.ceil(result.totalUsersNumber / elementsOnEachSlide),
        );
      },
    });
  }

  useEffect(getUserData, [roleValue]); // eslint-disable-line
  useEffect(() => {
    debounce(getUserData);
  }, [searchValue]);

  return (
    <>
      {isLoading && (
        <span className="loading loading-spinner loading-xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-100"></span>
      )}
      <PageWrapper>
        <div className="w-full max-w-5xl flex flex-col gap-5 ">
          <div
            className={`flex flex-col  gap-3 w-full bg-base-100 p-3 shadow-sm`}
          >
            <div className=" flex justify-between items-center gap-3">
              <select
                defaultValue="Pick a color"
                className="select bg-base-200 max-w-30"
                value={roleValue}
                onChange={(event) => setRoleValue(event.target.value)}
              >
                <option value="ALL">All</option>
                <option value="USER">User</option>
                <option value="AUTHOR">Author</option>
                <option value="ADMIN">Admin</option>
              </select>
              <SearchBar
                className="join w-full max-w-300 md:flex hidden "
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </div>
            <SearchBar
              className="join w-full max-w-300 md:hidden flex"
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="table table-md bg-base-100  table-fixed w-full py-3">
              <thead>
                <tr className="h-14">
                  <th className="w-20 "></th>
                  <th className="w-1/4 text-accent opacity-80">Name</th>
                  <th className="text-accent hidden sm:table-cell opacity-80">
                    Role
                  </th>
                  <th className=" text-accent sm:text-end text-start opacity-80">
                    Created at
                  </th>
                  <th className="w-30"></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <User
                    user={user}
                    index={index}
                    key={user.id}
                    getUserData={getUserData}
                    setIsLoading={setIsLoading}
                  />
                ))}
              </tbody>
            </table>
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

function User({ user, getUserData, index, setIsLoading }) {
  const { fetchData } = useFetch();

  const navigate = useNavigate();
  const {
    showConfirm,
    hideConfirm,
    setAlertText,
    setConfirmText,
    setConfirmCallback,
  } = useConfirm();

  return (
    <tr className={index % 2 === 0 ? "bg-base-200" : "bg-base-100"}>
      <th>
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar rounded-full overflow-hidden"
        >
          {user?.profile_image_url ? (
            <img
              alt="Tailwind CSS Navbar component"
              src={user?.profile_image_url}
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
      </th>
      <td>{user.username}</td>
      <td className="hidden sm:table-cell">
        {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
      </td>
      <td className="sm:text-end text-start">
        {new Date(user.created_at).toLocaleDateString("de-DE")}
      </td>
      <td>
        <div className="flex gap-2 justify-end items-center h-full">
          <EditButton
            onClick={() => navigate(`/profile?userId=${user.id}`)}
            className={
              index % 2 === 0 ? "hover:bg-base-200" : "hover:bg-base-100"
            }
          />
          <DeleteButton
            onClick={() => {
              showConfirm();
              setAlertText("Deleted accounts cannot be restored!");
              setConfirmText("Do you really want to delete the account?");
              setConfirmCallback(() => () => {
                fetchData({
                  url: `${apiUrl}profile/${user.id}`,
                  setIsLoading: setIsLoading,
                  method: "DELETE",
                  callback: () => {
                    hideConfirm();
                    getUserData();
                  },
                });
              });
            }}
            className={
              index % 2 === 0 ? "hover:bg-base-200" : "hover:bg-base-100"
            }
          />
        </div>
      </td>
    </tr>
  );
}

export default UsersPage;
