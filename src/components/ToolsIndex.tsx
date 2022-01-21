import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  CardActionArea,
  Typography,
  Grid,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import merge_subtitle_img from "../merge_subtitle.svg";

export default function ToolsIndex() {
  return (
    <Box>
      <Container>
        <Grid container justifyContent="center">
          <Grid item md={4} xs={12}>
            <NavLink to="/mergeSubtitle" style={{textDecoration:"none"}}>
              <Card sx={{ borderRadius: 3 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={merge_subtitle_img}
                    alt="merge_subtitle_img"
                  />
                  <CardContent>
                    <Typography variant="h5">Merge Subtitles</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      合并多语字幕，支持srt格式
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </NavLink>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
