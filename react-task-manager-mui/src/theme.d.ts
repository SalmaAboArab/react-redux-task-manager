import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    status: {
      gold: string;
      high: string;
      medium: string;
      low: string;
      rule: string;
    };
    paperColor: {
      paper: string;
      paperShadow: string;
    };
  }

  interface PaletteOptions {
    status?: {
      gold?: string;
      high?: string;
      medium?: string;
      low?: string;
      rule?: string;
    };
    paperColor: {
      paper: string;
      paperShadow: string;
    };
  }
}
