function SearchBar({ className }) {
  return (
    <div className={className}>
      <input className="input join-item w-full " placeholder="Search" />

      <select
        className="select join-item max-w-25 min-w-20 border-e-0"
        defaultValue="None"
      >
        <option>None</option>
        <option>Sci-fi</option>
        <option>Drama</option>
      </select>

      <div className="indicator">
        <button className="btn btn-outline border-base-300 font-regular w-25">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
