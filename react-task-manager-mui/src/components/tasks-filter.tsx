import React from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
// import { PRIORITIES } from "../redux/tasksSlice";

const STATUSES = ["All", "Active", "Completed"] as const;
export const PRIORITIES = ["High", "Medium", "Low"];

type Priority = (typeof PRIORITIES)[number];
type Status = (typeof STATUSES)[number];
interface FilterCounts {
  completed: number;
  total: number;
  byPriority: Partial<Record<Priority, number>>;
}

interface FilterBarProps {
  priorityFilter: "All" | Priority;
  onPriorityChange: (priority: "All" | Priority) => void;
  statusFilter: Status;
  onStatusChange: (status: Status) => void;
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
        onclick={(priority) => onPriorityChange(priority as "All" | Priority)}
        type="priority"
        // count={counts.byPriority[priority as Priority] ?? 0}
        counts={counts.byPriority}
        FilterData={priorityFilter}
        MapData={["All", ...PRIORITIES]}
      />

      {/* Status */}
      <FilterButtons
        onclick={(status) => onStatusChange(status as Status)}
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

export const FilterButtons = ({
  onclick,
  FilterData,
  type,
  counts,
  MapData,
}: {
  onclick: (val: string) => void;
  FilterData: "All" | Priority | Status;
  type: "status" | "priority";
  counts?: any;
  MapData: Status[] | Priority[];
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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

      <Stack direction="row" spacing={1}>
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
                borderColor: theme.palette.primary.dark,   // theme.palette.divider,
                fontFamily: "monospace",
                borderRadius: 0,
                // color: theme.palette.primary.dark,
                ...(isActive && {
                  bgcolor: value !== "All" && type === 'priority' ? theme.palette.status[value.toLowerCase() as "low" | "medium" | "high"] : theme.palette.primary.main ,
                  color: theme.palette.primary.contrastText,

                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
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
                    minWidth: 20,
                    height: 20,
                    px: 0.5,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    bgcolor: isActive
                      ? "rgba(255,255,255,0.2)"
                      : theme.palette.action.selected,
                  }}
                >
                  {counts[value as Priority] ?? 0}
                </Box>
              )}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};
