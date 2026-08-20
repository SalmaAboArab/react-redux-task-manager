import { Stack, Typography } from "@mui/material";
import React from "react";

export default function EmptyState() {
  return (
    <Stack spacing={0} sx={{textAlign: 'center', py: 4}}>
      <Typography variant="h6">Nothing filed here.</Typography>
      <Typography variant="subtitle1" color="textDisabled">
        Clear a filter, or add a new entry above to start the stack.
      </Typography>
    </Stack>
  );
}
