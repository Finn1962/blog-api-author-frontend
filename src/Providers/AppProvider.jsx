import { LoaderProvider } from "../Contexts/LoaderContext.jsx";
import { ConfirmProvider } from "../Contexts/ConfirmContext.jsx";

function AppProvider({ children }) {
  return (
    <LoaderProvider>
      <ConfirmProvider>{children}</ConfirmProvider>
    </LoaderProvider>
  );
}

export default AppProvider;
