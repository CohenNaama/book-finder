/**
 * Route guard component for authenticated pages.
 *
 * Wraps protected routes and redirects unauthenticated users to the Sign In page.
 * Uses the `useAuth` hook for session validation.
 *
 * Ensures that only logged-in users can access restricted routes.
 */

import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
