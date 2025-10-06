import { useState } from "react";
import { signIn } from "../services/auth";
import { TextField, Button, Stack, Link } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import FormContainer from "../components/ui/FormContainer";


export default function SignInPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      await signIn(form.email.trim(), form.password);
      navigate("/");
    } catch (e) {
      setErr(e.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <FormContainer title="Sign in" error={err}>
        <Stack spacing={2}>
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
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <Stack direction="row" justifyContent="space-between">
          <Link component={RouterLink} to="/forgot">
            Forgot password?
          </Link>
          <Link component={RouterLink} to="/signup">
            Create account
          </Link>
        </Stack>
      </FormContainer>
    </form>
  );
}
