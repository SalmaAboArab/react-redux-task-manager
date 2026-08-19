import {
  Box,
  Chip,
  FormControl,
  Input,
  Link,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

export default function TaskItem() {
  const theme = useTheme();

  const [EditMode, setEditMode] = useState(false);
  const [completed, setCompleted] = useState(false);

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
            <Select
              defaultValue="medium"
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
          </FormControl>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Link
              sx={{
                cursor: "pointer",
                mr: 0.5,
                color: theme.palette.text.primary,
                fontSize: "0.8rem",
                fontFamily: "monospace",
                textDecorationColor: theme.palette.text.primary,
                textUnderlineOffset: 2,
              }}
              onClick={() => setEditMode(false)}
            >
              SAVE
            </Link>

            <Link
              sx={{
                cursor: "pointer",
                mr: 0.5,
                color: theme.palette.text.disabled,
                fontSize: "0.8rem",
                fontFamily: "monospace",
                textDecorationColor: theme.palette.text.disabled,
                textUnderlineOffset: 2,
              }}
              onClick={() => setEditMode(false)}
            >
              CANCEL
            </Link>
          </Box>
        </Box>
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
              completed ? "Mark task as incomplete" : "Mark task as complete"
            }
            tabIndex={0}
            onClick={() => setCompleted((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setCompleted((prev) => !prev);
              }
            }}
            sx={{
              flexShrink: 0,
              width: 23,
              height: 23,
              mt: 0.35,
              borderRadius: "50%",
              border: `2px solid ${
                completed
                  ? theme.palette.status.medium
                  : theme.palette.text.disabled
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s ease",

              bgcolor: completed
                ? theme.palette.status.medium
                : "transparent",

              "&:hover": {
                borderColor: theme.palette.status.medium,
              },

              "&:focus-visible": {
                outline: `2px solid ${theme.palette.status.medium}`,
                outlineOffset: 2,
              },
            }}
          >
            {completed && (
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
                color: completed
                  ? theme.palette.text.disabled
                  : theme.palette.text.primary,
                textDecoration: completed ? "line-through" : "none",
                transition: "color 0.2s ease",
              }}
            >
              Sketch the ledger layout
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
                onClick={() => setEditMode(true)}
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
      <span style={{backgroundColor: theme.palette.status.medium, color: 'white', fontSize: '12px', padding: '6px 2px', borderRadius: 0, position: 'absolute', top: 20, right: -12, transform: "rotate(180deg)", textTransform: 'uppercase', fontFamily: 'monospace', writingMode: 'vertical-rl'}}>medium</span>
      )}
    </Box>
  );
}