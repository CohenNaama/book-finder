import {
  Container, AppBar, Toolbar, Typography, Box, Stack, Button
} from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logout } from "../services/auth";
import { useCallback } from "react";


export default function Layout() {
  const { user, ready } = useAuth();
  const firstName = user?.displayName?.split(" ")?.[0];

const handleLogout = useCallback(async () => {
  await logout();
}, []);

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={0}>
        <Toolbar sx={{ px: { xs: 2, md: 4 }, gap: 2 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ fontWeight: 800, color: "inherit", textDecoration: "none", cursor: "pointer" }}
            aria-label="Go to home"
          >
            Book Finder
          </Typography>

          <Box sx={{ flex: 1 }} />

          <Stack direction="row" spacing={1} alignItems="center">
            {ready && !user && (
              <>
                <Button
                  component={RouterLink}
                  to="/signin"
                  color="inherit"
                  variant="text"
                  size="small"
                  aria-label="Sign in"

                >
                  Sign in
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  color="secondary"
                  variant="contained"
                  size="small"
                  aria-label="Sign up"

                >
                  Sign up
                </Button>
              </>
            )}

            {ready && user && (
              <>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {firstName ? `Hi, ${firstName}` : "Hi there"}
                </Typography>

                <Button
                  onClick={handleLogout}
                  color="inherit"
                  variant="text"
                  size="small"
                  aria-label="Sign out"
                  sx={{
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: "#FFD369",
                      color: "#174E8C",
                      borderRadius: "8px",
                      boxShadow: "0 4px 10px rgba(255, 211, 105, 0.4)",
                    },
                  }}
                >
                  Sign out
                </Button>

              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "grid", placeItems: "center", width: "100%" }}>
        <Container maxWidth="xl" sx={{ width: "100%", py: 6 }}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
