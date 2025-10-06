/**
 * Page component for user registration.
 *
 * Handles new account creation via Firebase.
 * Validates inputs and provides real-time error feedback to users.
 */

import { useState } from "react";
import { signUp } from "../services/auth";
import { TextField, Button,Link, Stack } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import FormContainer from "../components/ui/FormContainer";
import "../components/ui/AuthForms.css";


export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      await signUp(form.name.trim(), form.email.trim(), form.password);
      navigate("/");
    } catch (e) {
      setErr(e.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FormContainer title="Create account" error={err}>
        <Stack spacing={2}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={onChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          required
        />
        </Stack>
        <Button
          type="submit"
          variant="contained"
          disabled={loading} 
        >
          {loading ? "Creating..." : "Sign up"}
        </Button>
        <Link component={RouterLink} to="/signin">
          Already have an account? Sign in
        </Link>
      </FormContainer>
    </form>
  );
}
