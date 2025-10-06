/**
 * Page component for password recovery.
 *
 * Allows users to request a password reset via Firebase authentication.
 * Displays confirmation or error messages based on API response.
 */

import { useState } from "react";
import { forgotPassword } from "../services/auth";
import { TextField, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Alerts from "../components/ui/Alerts";
import FormContainer from "../components/ui/FormContainer";


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null); setInfo(null); setLoading(true);
    try {
      await forgotPassword(email.trim());
      setInfo("If this address exists, a reset email was sent.");
    } catch (e) {
      setErr(e.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FormContainer title="Reset password">
        <Alerts type="error" message={err} />
        <Alerts type="success" message={info} />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" variant="contained" loading={loading}>Send reset email</Button>
        <Link component={RouterLink} to="/signin">Back to sign in</Link>
      </FormContainer>
    </form>
  );
}
