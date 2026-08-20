import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a3444",
      light: "#8892a0",
      dark: "#1b2430",
    },
    secondary: {
      main: "#fdfaf2",
    },
    status: {
      gold: "#c98a2b",
      high: "#a63446",
      medium: "#c98a2b",
      low: "#3f7d78",
      rule: "#c6b995",
    },
    paperColor: {
      paper: "#ece4d3",
      paperShadow: "#d8cdb2",
    },
  },
  typography: {
    fontFamily: "Source Serif 4, Georgia, serif",
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
