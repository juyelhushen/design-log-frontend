import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import OAuthSuccessPage from "../pages/OAuthSuccessPage";
import BlogsPage from "../pages/BlogsPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import BlogEditorPage from "../pages/BlogEditorPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth-success" element={<OAuthSuccessPage />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/new" element={<BlogEditorPage />} />
          <Route path="/blogs/edit/:slug" element={<BlogEditorPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}