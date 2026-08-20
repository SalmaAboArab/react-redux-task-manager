import { Box, Link, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import type { TaskData, TaskType } from "../types";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTask } from "../../redux/tasks-slice";
import TaskEditMode from "./task-edit-mode";
import CompleteButton from "./complete-button";
import TaskActions from "./task-actions";

export default function TaskItem({ task }: { task: TaskType }) {
  const theme = useTheme();

  const [EditMode, setEditMode] = useState(false);

  const { reset } = useForm<TaskData>({
    defaultValues: {
      taskName: task?.title,
      priority: task?.priority,
    },
  });

  const dispatch = useDispatch();

  const handleEdit = () => {
    reset({
      taskName: task.title,
      priority: task.priority.toLowerCase() as TaskData["priority"],
    });
    setEditMode(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: theme.palette.secondary.main,
        borderRadius: 0.5,
        p: 2,
        boxShadow: "0px 6px 14px rgba(27, 36, 48, 0.12)",
        border: `1px solid ${theme.palette.paperColor.paperShadow}`,

        transform: "rotate(var(--tilt, 0deg))",
        transition:
          "transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease",

        ":hover": {
          "--tilt": "-0.3deg",
          transform: "rotate(var(--tilt))",
          boxShadow: "0 10px 20px rgba(27, 36, 48, 0.18)",
        },
        position: "relative",
      }}
    >
      {EditMode ? (
        <TaskEditMode setEditMode={setEditMode} task={task} />
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
          }}
        >
          {/* Complete Button */}
          <CompleteButton
            completed={task?.completed}
            onclick={() => dispatch(toggleComplete(task?.id))}
          />

          {/* Title + Actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              minWidth: 0,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "1.1rem",
                color: task?.completed
                  ? theme.palette.text.disabled
                  : theme.palette.text.primary,
                textDecoration: task?.completed ? "line-through" : "none",
                transition: "color 0.2s ease",
              }}
            >
              {task?.title}
            </Typography>

            {/* Actions */}
            <TaskActions
              handleDelete={() => dispatch(deleteTask(task?.id))}
              onEdit={() => handleEdit()}
            />
          </Box>
        </Box>
      )}
      {/* <Chip label="Medium" color="error" size="small" sx={{borderRadius: 0, position: 'absolute', top: 30, right: -30, transform: "rotate(90deg)", textTransform: 'uppercase', fontFamily: 'monospace'}}/> */}
      {!EditMode && (
        <span
          style={{
            backgroundColor:
              theme.palette.status[
                task?.priority?.toLowerCase() as "low" | "medium" | "high"
              ] || theme.palette.primary.main,
            color: "white",
            fontSize: "12px",
            padding: "6px 2px",
            borderRadius: 0,
            position: "absolute",
            top: 20,
            right: -12,
            transform: "rotate(180deg)",
            textTransform: "uppercase",
            fontFamily: "monospace",
            writingMode: "vertical-rl",
          }}
        >
          {task?.priority}
        </span>
      )}
    </Box>
  );
}
