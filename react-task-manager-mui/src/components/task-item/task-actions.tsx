import { Box, Link, useTheme } from "@mui/material";
import React from "react";

export default function TaskActions({
  onEdit,
  handleDelete,
}: {
  onEdit: () => void;
  handleDelete: () => {};
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link
        component="button"
        sx={{
          cursor: "pointer",
          mr: 2,
          color: theme.palette.text.primary,
          fontSize: "0.8rem",
          fontFamily: "monospace",
          textDecorationColor: theme.palette.text.primary,
          textUnderlineOffset: 2,
        }}
        onClick={onEdit}
      >
        EDIT
      </Link>

      <Link
        component="button"
        onClick={handleDelete}
        sx={{
          cursor: "pointer",
          color: theme.palette.status.high,
          fontSize: "0.8rem",
          fontFamily: "monospace",
          textDecorationColor: theme.palette.status.high,
          textUnderlineOffset: 2,
        }}
      >
        DELETE
      </Link>
    </Box>
  );
}
