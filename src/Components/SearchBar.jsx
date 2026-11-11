function SearchBar({ className, searchValue, setSearchValue }) {
  return (
    <div className={`${className} flex gap-1`}>
      <input
        className="input join-item w-full border-e-0 border-base-300 bg-base-300"
        placeholder="Search"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
    </div>
  );
}

export default SearchBar;
