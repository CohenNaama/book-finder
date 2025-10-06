/**
 * FormContainer component.
 *
 * Provides a styled container for authentication forms (Sign In, Sign Up).
 * Displays title, success/error alerts, and wraps form content.
 */

import PropTypes from "prop-types";
import Alerts from "./Alerts";
import "./AuthForms.css";


export default function FormContainer({ title, error, info, children }) {
  return (

    <div className="form-container" role="form">
      <h4 className="form-title">{title}</h4>

      {error && <Alerts type="error" message={error} />}
      {info && <Alerts type="success" message={info} />}

      <div className="form-content">{children}</div>
    </div>
  );
}

FormContainer.propTypes = {
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  children: PropTypes.node.isRequired,
};
