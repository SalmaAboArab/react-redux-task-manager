import { Stack, Typography, useTheme } from "@mui/material";
import React from "react";

export default function TaskManagerHeader() {
  const theme = useTheme();
  return (
    <Stack
      direction="column"
      spacing={1.5}
      sx={{ color: theme.palette.paperColor.paper }}
    >
      <Typography
        variant="subtitle2"
        component="h5"
        sx={{
          color: theme.palette.status.gold,
          letterSpacing: 4,
          textTransform: "uppercase",
          fontSize: '12px',
        }}
      >
        Vol. I — Daily Ledger
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: "bold", letterSpacing: -1 }}>
        Task Manager
      </Typography>
      <Typography
        variant="subtitle1"
        component="h2"
        sx={{
          color: theme.palette.primary.light,
          maxWidth: "46ch",
          lineHeight: 1.5,
        }}
      >
        File it, stamp it, cross it off. Everything here stays put in your
        browser.
      </Typography>
    </Stack>
  );
}
