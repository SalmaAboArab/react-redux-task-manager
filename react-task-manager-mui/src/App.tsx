import { Box, Container, Divider, useTheme } from "@mui/material";
import "./App.css";
import TaskManagerHeader from "./components/header";

function App() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ margin: "20px" }}>
        <TaskManagerHeader />
        <Divider sx={{my: 3, bgcolor: "rgba(236, 228, 211, 0.25)", width: '100%'}}/>
      </Container>
    </Box>
  );
}

export default App;
