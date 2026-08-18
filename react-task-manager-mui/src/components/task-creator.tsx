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
import { useForm } from "react-hook-form";

type TaskData = {
  taskName: string;
  priority: "low" | "medium" | "high";
};

export default function TaskCreator() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskData>({
    defaultValues: {
      taskName: "",
      priority: "medium",
    },
  });

  const submitData = (data: TaskData) => {
    console.log("data", data);
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

            <Select
              {...register("priority")}
              defaultValue="medium"
              label="Priority"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
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
