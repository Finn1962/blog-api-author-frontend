import { BrowserRouter, Routes, Route } from "react-router";
import AppProvider from "./Providers/AppProvider.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PostEditorPage from "./pages/PostEditorPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import Menu from "./Components/Menu.jsx";
import ConfirmForm from "./Components/ConfirmForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="bg-base-200 min-h-screen">
          <Menu />
          <ConfirmForm />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/new" element={<PostEditorPage />} />
            <Route path="/post/edit/:postId" element={<PostEditorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
