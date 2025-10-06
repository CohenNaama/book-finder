import { useState } from "react";
import { Box, TextField, Button, InputAdornment, Stack } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router-dom";


export default function SearchBar() {
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    nav(`/results?q=${encodeURIComponent(q.trim())}`);
    setQ("");

  };

  return (
    <Box component="form" onSubmit={onSubmit} aria-label="Search form">
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          fullWidth
          variant="outlined"
          label="Book title"
          placeholder="Title, author, or keyword"
          color="secondary"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" variant="contained" color="secondary">
          Search
        </Button>
      </Stack>
    </Box>
  );
}
