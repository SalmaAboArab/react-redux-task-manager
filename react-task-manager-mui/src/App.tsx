import { Box, Container, Divider, Stack, useTheme } from "@mui/material";
import "./App.css";
import TaskManagerHeader from "./components/header";
import TaskCreator from "./components/task-creator";
import TasksFilter from "./components/tasks-filter";
import TaskItem from "./components/task-item";
import { useSelector } from "react-redux";
import type { TaskType } from "./components/types";
import { selectTaskCounts } from "./redux/tasks-slice";

function App() {
  const theme = useTheme();
  const Tasks = useSelector(
    (state: { tasks: { tasks: TaskType[] } }) => state.tasks.tasks,
  );

  const counts = useSelector(selectTaskCounts);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ m: 2.5, p: 3, maxWidth: "750px", width: "100%" }}>
        <TaskManagerHeader />
        <Divider
          sx={{ my: 3, bgcolor: "rgba(236, 228, 211, 0.25)", width: "100%" }}
        />
        <Stack
          direction="column"
          spacing={2}
          sx={{
            bgcolor: theme.palette.paperColor.paper,
            borderRadius: 0.5,
            p: 3,
            boxShadow: `0px 24px 60px rgba(0, 0, 0, 0.35), 0 1px 0 rgba(255, 255, 255, 0.4) inset`,
            position: "relative",
            ":before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: 1,
              backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 30px, ${theme.palette.status.rule} 31px)`,
              opacity: 0.35,
              pointerEvents: "none",
            },
          }}
        >
          <TaskCreator />
          <TasksFilter
            counts={counts}
          />
          {Tasks.map((task: TaskType) => (
            <TaskItem task={task} key={task?.id} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default App;
