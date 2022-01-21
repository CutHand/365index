import * as React from "react";
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Slide,
  Alert,
  IconButton,
  Box,
  Divider,
  Typography,
  Collapse,
  Fade,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { SlideProps } from "@mui/material/Slide";
import { KeyboardDoubleArrowDownSharp as DownSharpIcon } from "@mui/icons-material";
import { TransitionGroup } from "react-transition-group";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}
function readSubtitle(file: any) {
  return new Promise(
    (resolve: (value: string | ArrayBuffer | null) => void, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    }
  );
}
export default function MergeSubtitle() {
  const dropAreaRef = React.useRef(null);
  const fileInputRef = React.useRef(null);

  const [dropEnter, setDropEnter] = React.useState(false);
  const [fileList, setFileList] = React.useState<File[]>([]);
  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    message: "",
  });
  function dragenter(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    setDropEnter(true);
  }
  function dragover(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
  }
  function dragleave(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    setDropEnter(false);
  }
  function drop(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    setDropEnter(false);
    const dt = e.dataTransfer;
    const files = dt && dt.files;
    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        setFileList(prev => {
          if (prev.filter(f => f.name === files[i]["name"]).length === 0) {
            return [...prev, files[i]];
          } else {
            setOpenSnackbar({
              open: true,
              message: `${files[i]["name"]} 已经存在!`,
            });
            return prev;
          }
        });
      }
    }
  }
  React.useEffect(() => {
    dropAreaRef.current != null &&
      (dropAreaRef.current as HTMLElement).addEventListener(
        "dragenter",
        dragenter,
        false
      );
    dropAreaRef.current != null &&
      (dropAreaRef.current as HTMLElement).addEventListener(
        "dragleave",
        dragleave,
        false
      );
    dropAreaRef.current != null &&
      (dropAreaRef.current as HTMLElement).addEventListener(
        "dragover",
        dragover,
        false
      );
    dropAreaRef.current != null &&
      (dropAreaRef.current as HTMLElement).addEventListener(
        "drop",
        drop,
        false
      );
  }, []);

  const inputFile = async () => {
    const files =
      fileInputRef.current !== null &&
      (fileInputRef.current as HTMLInputElement).files;
    if (files !== null && files !== false) {
      for (let i = 0; i < files.length; i++) {
        setFileList(prev => {
          if (prev.filter(f => f.name === files[i]["name"]).length === 0) {
            return [...prev, files[i]];
          } else {
            setOpenSnackbar({
              open: true,
              message: `${files[i]["name"]} 已经存在!`,
            });
            return prev;
          }
        });
      }
    }
  };
  const handleClose = () => setOpenSnackbar(prev => ({ ...prev, open: false }));
  const handleRemoveFile = (name: string) =>
    setFileList(prev => [...prev.filter(f => f.name !== name)]);
  const mergeSubtitle = async () => {
    let fileName = fileList[0].name.split(".").slice(0, -1).join("");
    const firstSub = await readSubtitle(fileList[0]);
    let firstSubs: string[] = [];
    if (typeof firstSub === "string") {
      firstSubs = firstSub.trim().split("\n\n");
    }
    firstSubs.forEach((value, index) => {
      let subs = value.split("\n");
      let temp = subs.slice(0, 2);
      temp.push(subs.slice(2).join(""));
      subs = temp;
      firstSubs[index] = subs.join("\n");
    });
    for (const f of fileList.slice(1)) {
      fileName += `_${f.name.split(".").slice(0, -1).join("")}`;
      const sub = await readSubtitle(f);
      let subs: string[] = [];
      if (typeof sub === "string") {
        subs = sub.trim().split("\n\n");
      }
      firstSubs.forEach((value, index) => {
        firstSubs[index] = value
          .split("\n")
          .concat([subs[index].split("\n").slice(2).join("")])
          .join("\n");
      });
    }
    const downloadFile = new Blob(
      firstSubs.map(i => i + "\n\n"),
      { type: "text/plain" }
    );

    const downloadHandle = document.createElement("a");
    downloadHandle.href = URL.createObjectURL(downloadFile);
    downloadHandle.download = fileName + ".srt";
    downloadHandle.click();
  };
  return (
    <Fade in timeout={1000}>
      <Container>
        <Typography
          sx={{ textAlign: "center", fontWeight: 500, my: 3 }}
          variant="h3"
        >
          Merge Subtitle
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={10} md={6}>
            <Box sx={{ position: "absolute", clip: "rect(0 0 0 0)" }}>
              <input
                ref={fileInputRef}
                type="file"
                id="subtitle"
                onChange={inputFile}
                accept=".srt"
                multiple
              />
            </Box>
            <Box sx={{ my: 3 }}>
              <label htmlFor="subtitle">
                <Box
                  sx={[
                    {
                      py: 5,
                      px: 3,
                      textAlign: "center",
                      borderRadius: 4,
                      border: "1px dashed grey",
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: 2,
                      },
                    },
                    dropEnter && {
                      filter: "blur(1px)",
                      transform: "scale(1.05)",
                    },
                  ]}
                  ref={dropAreaRef}
                >
                  点击选择文件，或者拖拽文件到此处
                </Box>
              </label>
            </Box>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={openSnackbar.open}
              onClose={handleClose}
              TransitionComponent={TransitionDown}
              autoHideDuration={2000}
            >
              <Alert severity="warning" onClose={handleClose}>
                {openSnackbar.message}
              </Alert>
            </Snackbar>
            <List>
              <TransitionGroup>
                {fileList.map(f => (
                  <Collapse key={f.name}>
                    <ListItem
                      sx={{
                        borderRadius: 1,
                        my: 1,
                        bgcolor: "background.paper",
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          title="delete"
                          onClick={() => handleRemoveFile(f.name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={f.name} />
                    </ListItem>
                    <Divider />
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>

            <Collapse in={fileList.length >= 2} timeout={1000}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <DownSharpIcon sx={{ fontSize: "h4.fontSize" }} />
              </Box>
              <List>
                <ListItem
                  sx={{
                    borderRadius: 1,
                    my: 1,
                    bgcolor: "background.paper",
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="download"
                      title="download"
                      onClick={mergeSubtitle}
                    >
                      <DownloadIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={fileList.map(i => i.name).join(" + ")}
                  />
                </ListItem>
              </List>
            </Collapse>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  );
}
