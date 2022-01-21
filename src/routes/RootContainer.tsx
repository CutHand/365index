import * as React from "react";
import Banner from "../components/Banner";
import ToolsIndex from "../components/ToolsIndex";
import { Box, Fade } from "@mui/material";

export default function RootContainer() {
  return (
    <Fade in timeout={1000}>
      <Box>
        <Banner />
        <ToolsIndex />
      </Box>
    </Fade>
  );
}
