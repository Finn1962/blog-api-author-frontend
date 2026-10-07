import { useLoader } from "../Contexts/LoaderContext.jsx";

function Loader() {
  const { isLoading } = useLoader();

  return (
    <>
      {isLoading ? (
        <span className="loading loading-spinner loading-md"></span>
      ) : (
        <span className="hidden loading loading-spinner loading-md"></span>
      )}
    </>
  );
}

export default Loader;
