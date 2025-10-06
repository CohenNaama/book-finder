/**
 * Main entry point.
 *
 * Mounts the React app into the DOM and wraps it with global providers:
 *  - QueryClientProvider
 *  - BrowserRouter
 *  - ThemeProvider
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/queryClient.js";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme/theme.js";
import "./components/ui/ui.css"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
