/**
 * Spinner component.
 *
 * Displays a centered loading spinner using MUI CircularProgress.
 * Used during async data fetching across pages.
 */

import { CircularProgress, Box } from "@mui/material";
import "./ui.css";

export default function Spinner() {
  return (
    <Box className="spinner-container">
      <CircularProgress size={70} thickness={4.5} className="spinner" />
    </Box>
  );
}
