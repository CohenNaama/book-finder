/**
 * ResultsPage component.
 *
 * Displays a list of books based on user search queries, fetched from the backend API.
 * Uses React Query for managing async loading, error, and empty result states.
 *
 * Renders BooksGrid for structured display and supports navigation to book details.
 */


import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Stack, Typography, Chip, Divider } from "@mui/material";
import Alerts from "../components/ui/Alerts";
import Spinner from "../components/ui/Spinner";
import SearchBar from "../components/SearchBar";
import BooksGrid from "../components/ui/BooksGrid";
import { searchBooks } from "../api/books";
import "../components/ui/ui.css"


export default function ResultsPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const navigate = useNavigate();

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["books", q],
    queryFn: () => searchBooks(q),
    enabled: !!q,
  });

  if (!q) return <Alerts type="info" message="Please enter a search term." />;
  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <Alerts
        type="error"
        message={error?.userMessage || "Failed to load results"}
      />
    );

  const rows = (data?.items ?? []).map((b) => ({
    id: b.id,
    cover: b.thumbnail || b.imageLinks?.thumbnail || "",
    title: b.title,
    authors: b.authors?.join(", ") || "Unknown",
  }));

  if (!rows.length)
    return <Alerts type="info" message={`No results found for “${q}”.`} />;

  return (
    <Box sx={{ width: "100%", mx: "auto", maxWidth: 1200 }}>
      <Stack spacing={2} mb={3}>
        <Stack direction="row" alignItems="center" spacing={1.5}>

          <Typography variant="h4" sx={{ color: "primary.main" }} fontWeight={800}>
            Results for:{" "}
            <Box component="span" sx={{ color: "text.secondary", fontWeight: 400 }}>
              {q}
            </Box>
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, fontSize: '20px' }}>
            ({rows.length})
          </Typography>
        </Stack>

        <Box maxWidth={500}>
          <SearchBar />
        </Box>
        <Divider sx={{ borderColor: "rgba(14,20,33,0.12)" }} />
      </Stack>

      <BooksGrid
        rows={rows}
        onRowClick={(p) => navigate(`/books/${p.id}`)}
      />

    </Box>
  );
}
