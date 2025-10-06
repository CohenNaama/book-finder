/**
 * BookDetailsPage component.
 *
 * Displays detailed information for a selected book retrieved from the API.
 * Includes a loading spinner, robust error handling, and a default fallback cover.
 *
 * Built with MUI Paper layout featuring soft hover animation and subtle backdrop blur.
 */


import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBook } from "../api/books.js";
import { Stack, Typography, Button, Alert, Box, Paper } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import Spinner from "../components/ui/Spinner";
import placeholderCover from "../assets/placeholderCover.png";


export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => getBook(id),
  });

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <Alert
        severity="error"
        sx={{
          mt: 4,
          maxWidth: 600,
          mx: "auto",
          borderRadius: 3,
        }}
      >
        {error?.userMessage || "Failed to load book details"}
      </Alert>
    );

  if (!data)
    return (
      <Typography align="center" sx={{ mt: 6, color: "text.secondary" }}>
        No details found.
      </Typography>
    );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 6,
        mb: 8,
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "flex-start",
          gap: 4,
          p: { xs: 3, md: 5 },
          borderRadius: 5,
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(18px)",
          boxShadow:
            "0 20px 40px rgba(23, 78, 140, 0.15), inset 0 1px 0 rgba(255,255,255,0.4)",
          maxWidth: 1000,
          width: "100%",
          transition: "all 0.35s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: "0 26px 60px rgba(23, 78, 140, 0.25)",
          },
        }}
      >
        <Box
          component="img"
          src={(data.image || data.thumbnail)?.replace("http://", "https://") || placeholderCover}
          alt={data.title || "Book cover"}
          sx={{
            width: { xs: "100%", sm: 300, md: 340 },
            height: "auto",
            borderRadius: 3,
            boxShadow: "0 16px 40px rgba(15,18,23,.25)",
            transition: "transform 0.4s ease",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        />

        <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              color: "primary.main",
              mb: 0.5,
              lineHeight: 1.2,
            }}
          >
            {data.title}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {data.authors?.join(", ") || "Unknown author"}
          </Typography>

          <Typography
            sx={{
              color: data.description ? "text.primary" : "text.secondary",
              lineHeight: 1.7,
              fontSize: 16,
            }}
          >
            {data.description || "No description available"}
          </Typography>

          <Button
            onClick={() => navigate(-1)}
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIosNewRoundedIcon />}
            sx={{
              alignSelf: "flex-end",
              mt: 3,
              px: 3.5,
              py: 1.2,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 15,
              boxShadow: "0 6px 14px rgba(245,166,35,0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 22px rgba(245,166,35,0.45)",
              },
            }}
          >
            Back
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
