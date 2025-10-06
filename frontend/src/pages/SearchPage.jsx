import { Box, Stack, Typography} from "@mui/material";
import SearchBar from "../components/SearchBar.jsx";
import "../components/ui/SearchHero.css";


export default function SearchPage() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        px: { xs: 1.5, md: 0 },
        py: { xs: 4, md: 6 },
        width: "100%",
      }}>
      <div className="search-hero">
        <Stack className="search-hero-content" spacing={2.5}>
          <Typography className="search-hero-title" variant="h2">
            Find your next read.
          </Typography>
          <Typography className="search-hero-subtitle">
            Search books and authors via Google Books
          </Typography>
          <Box sx={{ mt: 1 }}>
            <SearchBar />
          </Box>
        </Stack>
      </div>
    </Box>
  );
}
