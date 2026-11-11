const apiUrl = import.meta.env.VITE_API_URL;
import { createContext, useContext, useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

const ProfileContext = createContext(false);

function ProfileProvider({ children }) {
  const { fetchData } = useFetch();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchData({
      url: `${apiUrl}profile`,
      callback: (result) => {
        setProfile(result.userData);
      },
    });
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used within a LoaderProvider");
  }

  return context;
}

export { ProfileProvider, useProfile }; // eslint-disable-line
