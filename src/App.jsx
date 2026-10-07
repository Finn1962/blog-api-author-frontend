import AppProvider from "./Providers/AppProvider.jsx";

import LogInPage from "./pages/LogInPage.jsx";

function App() {
  return (
    <AppProvider>
      <LogInPage />
    </AppProvider>
  );
}

export default App;
