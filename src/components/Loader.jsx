import { useLoader } from "../Contexts/LoaderContext.jsx";

function Loader({ className }) {
  const { isLoading } = useLoader();

  return (
    <>
      {isLoading ? (
        <span
          className={`loading loading-spinner loading-md ${className}`}
        ></span>
      ) : (
        <span
          className={`hidden loading loading-spinner loading-md ${className}`}
        ></span>
      )}
    </>
  );
}

export default Loader;
