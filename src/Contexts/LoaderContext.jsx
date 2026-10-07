import { createContext, useContext, useState } from "react";

const LoaderContext = createContext(false);

function LoaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  function setLoadingTrue() {
    setIsLoading(true);
  }

  function setLoadingFalse() {
    setIsLoading(false);
  }

  return (
    <LoaderContext.Provider
      value={{ isLoading, setLoadingTrue, setLoadingFalse }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

function useLoader() {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }

  return context;
}

export { LoaderProvider, useLoader }; // eslint-disable-line
