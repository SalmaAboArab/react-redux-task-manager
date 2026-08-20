import React from "react";
import type { PRIORITIES, Statustype } from "../types";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";

export default function FilterButtons({
  onclick,
  FilterData,
  type,
  counts,
  MapData,
}: {
  onclick: (val: string) => void;
  FilterData: "All" | PRIORITIES | Statustype;
  type: "status" | "priority";
  counts?: any;
  MapData: Statustype[] | PRIORITIES[];
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 1,
        maxWidth: "100%",
        flexWrap: "wrap",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontFamily: "monospace",
          textTransform: "uppercase",
          color: theme.palette.primary.light,
          letterSpacing: 1,
        }}
      >
        {type}
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          flexWrap: "wrap",
          rowGap: 1,
          minWidth: 0,
          maxWidth: "100%",
        }}
      >
        {MapData.map((value) => {
          const isActive = FilterData === value;

          return (
            <Button
              key={value}
              type="button"
              size="small"
              onClick={() => onclick(value)}
              variant={isActive ? "contained" : "outlined"}
              aria-pressed={isActive}
              sx={{
                minWidth: "auto",
                textTransform: "none",
                fontWeight: 500,
                boxShadow: "none",
                borderColor: theme.palette.primary.dark, // theme.palette.divider,
                fontFamily: "monospace",
                borderRadius: 0,
                ...(isActive && {
                  bgcolor:
                    value !== "All" && type === "priority"
                      ? theme.palette.status[
                          value.toLowerCase() as "low" | "medium" | "high"
                        ]
                      : theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,

                  "&:hover": {
                    // bgcolor: theme.palette.primary.dark,
                    boxShadow: "none",
                  },
                }),

                ...(!isActive && {
                  color: theme.palette.text.secondary,

                  "&:hover": {
                    bgcolor: theme.palette.action.hover,
                    borderColor: theme.palette.divider,
                  },
                }),
              }}
            >
              {value}

              {type === "priority" && value !== "All" && (
                <Box
                  component="span"
                  sx={{
                    ml: 0.75,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                  }}
                >
                  {counts[value?.toLowerCase() as PRIORITIES] ?? 0}
                </Box>
              )}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
