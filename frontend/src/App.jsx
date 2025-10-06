/**
 * App root component.
 *
 * Defines all application routes and global providers.
 * Integrates React Query, Firebase auth context, and routing structure.
 */

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import BookDetailsPage from "./pages/BookDetailsPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./components/ui/ui.css";


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot" element={<ForgotPasswordPage />} />
                <Route
          path="/"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <ResultsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id"
          element={
            <ProtectedRoute>
              <BookDetailsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
