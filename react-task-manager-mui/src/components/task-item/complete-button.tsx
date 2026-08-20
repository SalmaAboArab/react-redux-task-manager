import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

export default function CompleteButton({
  completed,
  onclick,
}: {
  completed: boolean;
  onclick: () => void;
}) {
  const theme = useTheme();
  return (
    <Box
      role="button"
      aria-label={
        completed ? "Mark task as incomplete" : "Mark task as complete"
      }
      tabIndex={0}
      onClick={onclick}
      sx={{
        flexShrink: 0,
        width: 23,
        height: 23,
        mt: 0.35,
        borderRadius: "50%",
        border: `2px solid ${
          completed ? theme.palette.status.medium : theme.palette.text.disabled
        }`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease",

        bgcolor: completed ? theme.palette.status.medium : "transparent",

        "&:hover": {
          borderColor: theme.palette.status.medium,
        },

        "&:focus-visible": {
          outline: `2px solid ${theme.palette.status.medium}`,
          outlineOffset: 2,
        },
      }}
    >
      {completed && (
        <Typography
          component="span"
          sx={{
            color: "white",
            fontSize: 12,
            fontWeight: "bold",
            lineHeight: 1,
          }}
        >
          ✓
        </Typography>
      )}
    </Box>
  );
}
