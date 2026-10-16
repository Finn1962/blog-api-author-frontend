import { createContext, useContext, useState } from "react";

const ConfirmContext = createContext(false);

function ConfirmProvider({ children }) {
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [confirmCallback, setConfirmCallback] = useState(() => {});
  const [alertText, setAlertText] = useState("");
  const [typeOfAlert, setTypeOfAlert] = useState("");

  function showConfirm() {
    setIsConfirmVisible(true);
  }

  function hideConfirm() {
    setIsConfirmVisible(false);
  }

  return (
    <ConfirmContext.Provider
      value={{
        typeOfAlert,
        setTypeOfAlert,
        isConfirmVisible,
        showConfirm,
        hideConfirm,
        alertText,
        setAlertText,
        confirmText,
        setConfirmText,
        confirmCallback,
        setConfirmCallback,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}

function useConfirm() {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }

  return context;
}

export { ConfirmProvider, useConfirm }; // eslint-disable-line
