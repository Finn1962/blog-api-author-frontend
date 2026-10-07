import { BrowserRouter, Routes, Route } from "react-router";
import AppProvider from "./Providers/AppProvider.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PostEditorPage from "./pages/PostEditorPage.jsx";
import Menu from "./Components/Menu.jsx";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/new" element={<PostEditorPage />} />
          <Route path="/post/edit/:postId" element={<PostEditorPage />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
