import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import type { PRIORITIES, Statustype } from "../types";
import FilterButtons from "./filter-button";

const STATUSES = ["All", "Active", "Completed"] as const;

interface FilterCounts {
  completed: number;
  total: number;
  byPriority: Partial<Record<PRIORITIES, number>>;
}

interface FilterBarProps {
  priorityFilter: "All" | PRIORITIES;
  onPriorityChange: (priority: "All" | PRIORITIES) => void;
  statusFilter: Statustype;
  onStatusChange: (status: Statustype) => void;
  counts: FilterCounts;
}

export default function TasksFilter({
  priorityFilter = "All",
  onPriorityChange = () => {},
  statusFilter = "All",
  onStatusChange = () => {},
  counts = {
    completed: 0,
    total: 0,
    byPriority: {},
  },
}: FilterBarProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        gap: { xs: 1.5, md: 4 },
        flexWrap: "wrap",
      }}
    >
      {/* Priority */}
      <Box sx={{ minWidth: 0, maxWidth: "100%" }}>
        <FilterButtons
          onclick={(priority) =>
            onPriorityChange(priority as "All" | PRIORITIES)
          }
          type="priority"
          counts={counts.byPriority}
          FilterData={priorityFilter}
          MapData={["All", "high", "medium", "low"]}
        />
      </Box>

      {/* Status */}
      <Box sx={{ minWidth: 0, maxWidth: "100%" }}>
        <FilterButtons
          onclick={(status) => onStatusChange(status as Statustype)}
          type="status"
          FilterData={statusFilter}
          MapData={[...STATUSES]}
        />
      </Box>

      {/* Summary */}
      <Typography
        variant="body2"
        sx={{
          ml: { xs: 0, md: "auto" },
          width: { xs: "100%", md: "auto" },
          whiteSpace: "nowrap",
          color: theme.palette.primary.light,
        }}
      >
        {counts.completed} of {counts.total} closed out
      </Typography>
    </Box>
  );
}
