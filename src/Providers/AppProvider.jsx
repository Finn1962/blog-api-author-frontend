import { ConfirmProvider } from "../Contexts/ConfirmContext.jsx";
import { ProfileProvider } from "../Contexts/ProfileContext.jsx";

function AppProvider({ children }) {
  return (
    <ProfileProvider>
      <ConfirmProvider>{children}</ConfirmProvider>
    </ProfileProvider>
  );
}

export default AppProvider;
