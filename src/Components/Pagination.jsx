function Pagination({
  paginationTotalNumber,
  currentPaginationNumber,
  setCurrentPaginationNumber,
}) {
  return (
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
  );
}

export default Pagination;
