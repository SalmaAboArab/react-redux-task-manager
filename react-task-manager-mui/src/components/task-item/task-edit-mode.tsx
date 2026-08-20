import React from "react";
import { Controller, useForm } from "react-hook-form";
import type { TaskData, TaskType } from "../types";
import { useDispatch } from "react-redux";
import { edit } from "../../redux/tasks-slice";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  Link,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";

export default function TaskEditMode({ task, setEditMode }:{task: TaskType, setEditMode: (val: boolean) => void}) {
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

  const theme = useTheme();
  const dispatch = useDispatch();
  const submitData = (data: TaskData) => {
    dispatch(edit({ id: task?.id, ...data }));
    setEditMode(false);
  };
  return (
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
  );
}
