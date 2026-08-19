import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { create } from "../redux/tasks-slice";
import type { TaskData } from "./types";

export default function TaskCreator() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<TaskData>({
    defaultValues: {
      taskName: "",
      priority: "medium",
    },
  });

  const dispatch = useDispatch();

  const submitData = (data: TaskData) => {
    dispatch(create(data));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitData)}>
      <Grid container spacing={2}>
        <Grid size={{ md: 8, sm: 6, xs: 12 }}>
          <Input
            {...register("taskName", {
              required: "Give the entry a title before filing it.",
            })}
            placeholder="New entry - what needs doing?"
            disableUnderline
            sx={{
              width: "100%",

              "& input::placeholder": {
                fontStyle: "italic",
                fontSize: "1rem",
              },

              borderBottom: "2px solid black",

              //   "&:hover": {
              //     borderBottom: `2px solid ${theme.palette.status.medium}`,
              //   },

              "&:focus-within": {
                borderBottom: `2px solid ${theme.palette.status.medium}`,
              },
            }}
          />
        </Grid>

        <Grid>
          <FormControl size="small">
            <InputLabel>Priority</InputLabel>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  defaultValue="medium"
                  label="Priority"
                  MenuProps={{
                    sx: {
                      "& .MuiPaper-root": {
                        bgcolor: theme.palette.paperColor.paper,
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
        </Grid>

        <Grid>
          <Button type="submit" variant="contained">
            Add Task
          </Button>
        </Grid>
      </Grid>
      <FormHelperText
        error={!!errors.taskName}
        sx={{
          mb: 1,
          fontSize: "1rem",
          fontStyle: "italic",
          color: "rgba(255, 255, 255, 0.75)",
        }}
      >
        {errors.taskName && errors.taskName.message}
      </FormHelperText>
    </form>
  );
}
