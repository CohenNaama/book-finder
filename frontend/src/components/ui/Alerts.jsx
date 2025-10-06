import { Alert } from "@mui/material";
import PropTypes from "prop-types";
import "./ui.css";

export default function Alerts({ type = "info", message }) {
  if (!message) return null;
  return (
    <Alert severity={type} className="alert">
      {message}
    </Alert>
  );
}

Alerts.propTypes = {
  type: PropTypes.oneOf(["error", "info", "success", "warning"]),
  message: PropTypes.string,
};
