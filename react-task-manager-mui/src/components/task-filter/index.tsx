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
        display: "flex",
        alignItems: "center",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      {/* Priority */}

      <FilterButtons
        onclick={(priority) => onPriorityChange(priority as "All" | PRIORITIES)}
        type="priority"
        counts={counts.byPriority}
        FilterData={priorityFilter}
        MapData={["All", "high", "medium", "low"]}
      />

      {/* Status */}
      <FilterButtons
        onclick={(status) => onStatusChange(status as Statustype)}
        type="status"
        FilterData={statusFilter}
        MapData={[...STATUSES]}
      />

      {/* Summary */}
      <Typography
        variant="body2"
        sx={{
          ml: "auto",
          whiteSpace: "nowrap",
          // fontFamily: 'monospace',
          color: theme.palette.primary.light,
        }}
      >
        {counts.completed} of {counts.total} closed out
      </Typography>
    </Box>
  );
}
