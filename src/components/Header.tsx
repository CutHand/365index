import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  LinkProps,
  Link,
} from "@mui/material";
import {
  BlurOn as BlurOnIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { theme, themeChange } from "../store";
import { NavLink as RouterLink } from "react-router-dom";

export default function Header() {
  const mode = useTheme();
  const currentTheme = useSelector(theme);
  const dispatch = useDispatch();
  const changeThemeHandle = () => {
    dispatch(themeChange(currentTheme));
    // console.log(currentTheme, mode.palette.mode);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Button>
                <BlurOnIcon />
                <Typography variant="h6" component="div">
                  365index
                </Typography>
              </Button>
            </RouterLink>
          </Box>
          <Typography variant="button">{mode.palette.mode}</Typography>
          <IconButton onClick={changeThemeHandle}>
            {mode.palette.mode === "light" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
