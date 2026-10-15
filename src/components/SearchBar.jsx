function SearchBar({ className, searchValue, setSearchValue, fetchSearch }) {
  return (
    <div className={className}>
      <input
        className="input join-item w-full border-e-0"
        placeholder="Search"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />

      <div className="indicator">
        <button
          className="btn btn-outline border-base-300 font-regular w-25"
          onClick={fetchSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
