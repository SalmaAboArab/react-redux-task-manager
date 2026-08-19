import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  Link,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import type { TaskData, TaskType } from "./types";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { edit, toggleComplete } from "../redux/tasks-slice";

export default function TaskItem({ task }: { task: TaskType }) {
  const theme = useTheme();

  const [EditMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TaskData>({
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

  const submitData = (data: TaskData) => {
    dispatch(edit({ id: task?.id, ...data }));
    setEditMode(false);
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
        <form onSubmit={handleSubmit(submitData)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Input
              size="small"
              disableUnderline
              {...register("taskName", {
                required: "Task Name Can't Be Empty.",
              })}
              sx={{
                width: "100%",
                borderBottom: "1px solid black",
                "&:focus-within": {
                  borderBottom: `1px solid ${theme.palette.status.medium}`,
                },
              }}
            />

            <FormControl
              size="small"
              sx={{
                minWidth: 85,
                "& .MuiSelect-select": {
                  fontSize: 13,
                  fontFamily: "monospace",
                  p: 0,
                  py: 0.3,
                  pl: 1,
                },
              }}
            >
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="small"
                    MenuProps={{
                      sx: {
                        "& .MuiPaper-root": {
                          bgcolor: theme.palette.secondary.main,
                        },

                        "& .MuiMenuItem-root": {
                          fontSize: 13,
                          fontFamily: "monospace",
                          py: 0.3,

                          "&.Mui-selected": {
                            bgcolor: "grey.700",
                            color: "white",
                          },

                          "&.Mui-selected:hover": {
                            bgcolor: "grey.700",
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Link
                component="button"
                type="submit"
                sx={{
                  cursor: "pointer",
                  mr: 0.5,
                  color: theme.palette.text.primary,
                  fontSize: "0.8rem",
                  fontFamily: "monospace",
                  textDecorationColor: theme.palette.text.primary,
                  textUnderlineOffset: 2,
                }}
              >
                SAVE
              </Link>

              <Link
                component="button"
                sx={{
                  cursor: "pointer",
                  mr: 0.5,
                  color: theme.palette.text.disabled,
                  fontSize: "0.8rem",
                  fontFamily: "monospace",
                  textDecorationColor: theme.palette.text.disabled,
                  textUnderlineOffset: 2,
                }}
                onClick={() => {
                  reset();
                  setEditMode(false);
                }}
              >
                CANCEL
              </Link>
            </Box>
          </Box>
          <FormHelperText
            error={!!errors.taskName}
            sx={{
              mb: 1,
              fontSize: "0.9rem",
              // fontStyle: "italic",
              color: "rgba(255, 255, 255, 0.75)",
            }}
          >
            {errors.taskName && errors.taskName.message}
          </FormHelperText>
        </form>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
          }}
        >
          {/* Complete Button */}
          <Box
            role="button"
            aria-label={
              task?.completed ? "Mark task as incomplete" : "Mark task as complete"
            }
            tabIndex={0}
            onClick={() => {
              dispatch(toggleComplete(task));
            }}
            sx={{
              flexShrink: 0,
              width: 23,
              height: 23,
              mt: 0.35,
              borderRadius: "50%",
              border: `2px solid ${
                task?.completed
                  ? theme.palette.status.medium
                  : theme.palette.text.disabled
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",

              bgcolor: task?.completed ? theme.palette.status.medium : "transparent",

              "&:hover": {
                borderColor: theme.palette.status.medium,
              },

              "&:focus-visible": {
                outline: `2px solid ${theme.palette.status.medium}`,
                outlineOffset: 2,
              },
            }}
          >
            {task?.completed && (
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
              {/* Sketch the ledger layout */}
              {task?.title}
            </Typography>

            {/* Actions */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link
                sx={{
                  cursor: "pointer",
                  mr: 2,
                  color: theme.palette.text.primary,
                  fontSize: "0.8rem",
                  fontFamily: "monospace",
                  textDecorationColor: theme.palette.text.primary,
                  textUnderlineOffset: 2,
                }}
                onClick={handleEdit}
              >
                EDIT
              </Link>

              <Link
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
