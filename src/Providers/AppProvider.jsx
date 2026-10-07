import { LoaderProvider } from "../Contexts/LoaderContext.jsx";

function AppProvider({ children }) {
  return <LoaderProvider>{children}</LoaderProvider>;
}

export default AppProvider;
