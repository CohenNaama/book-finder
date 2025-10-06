import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  direction: "ltr",

  palette: {
    mode: "light",

    primary: {
      main: "#174E8C",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#F5A623", 
      contrastText: "#FFFFFF",
    },

  
    background: {
      default: "#E3F2FD", 
      paper: "#FFFFFF",
    },

    text: {
      primary: "#0F172A", 
      secondary: "#475569",
    },
  },

  shape: { borderRadius: 12 },

  typography: {
    fontFamily: "Inter, Heebo, Arial, sans-serif",
    h1: { fontWeight: 800, color: "#174E8C" },
    h2: { fontWeight: 700, letterSpacing: -0.2, color: "#174E8C" },
    h4: { fontWeight: 600, color: "#1E293B" },
    button: { textTransform: "none", fontWeight: 700 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: {
          minHeight: "100%",
          margin: 0,
          backgroundColor: "#E3F2FD", 
          color: "#0F172A",
        },
        "#root": { minHeight: "100%" },
      },
    },


    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 6px rgba(10, 37, 64, 0.15)",
          backgroundColor: "#174E8C",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          paddingInline: 18,
          paddingBlock: 10,
          transition: "all 0.25s ease",
          "&:hover": {
            opacity: 0.95,
            transform: "translateY(-1px)",
            boxShadow: "0 4px 10px rgba(23,78,140,0.25)",
          },
        },
      },
    },

  },
});
