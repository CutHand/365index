import * as React from "react";
import { Box, Container } from "@mui/material";
import { BoxProps as MuiBoxProps } from "@mui/material/Box";
import { makeStyles } from "@material-ui/styles";

interface Props {
  time: "past" | "current" | "future";
  delay: number;
  random: number;
}
function getCalendar() {
  /**
   * @description 获取今年的总天数，和今天的索引
   * @returns {
   *  full_day:总天数
   *  current_day:今天是第几天
   * }
   */
  const current_year = new Date().getFullYear();
  let full_day = 0;
  const current_day = Math.floor(
    ((new Date() as unknown as number) -
      (new Date(
        "1/1/" + new Date().getFullYear().toString()
      ) as unknown as number)) /
      (24 * 60 * 60 * 1000)
  );
  if (
    (current_year % 4 === 0 && current_year % 100 !== 0) ||
    current_year % 400 === 0
  ) {
    full_day = 366;
  } else {
    full_day = 365;
  }
  return { full_day, current_day };
}
const useStyles = makeStyles({
  root: {
    backgroundColor: (props: Props) => {
      switch (props.time) {
        case "past":
          return "rgba(33, 150, 83, 0.83)";
        case "current":
          return "rgba(33, 150, 83, 1)";
        case "future":
          return "rgba(211, 234, 221, 1)";
        default:
          return "blue";
      }
    },
    height: "16px",
    width: "16px",
    margin: "3px",
    borderRadius: "50%",
    filter: (props: Props) => (props.time === "current" ? "blur(2px)" : "none"),
    animationName: "$fadeIn,$hidden,$blingbling",
    animationTimingFunction: "ease-in-out,inline,inline",
    animationDuration: (props: Props) =>
      `2s,${(props.delay / 365) * 4 * props.random}s,${
        props.time === "current" ? "2s" : "0s"
      }`,
    animationDelay: (props: Props) =>
      `${(props.delay / 365) * 4 * props.random}s,0s,${
        (props.delay / 365) * 4 * props.random + 4
      }s`,
    animationIterationCount: "1,1,infinite",
    animationDirection: "normal,normal,alternate",
  },

  "@keyframes blingbling": {
    "0%": {
      transform: "scale(0.5)",
    },
    "50%": {
      transform: "scale(1.1)",
    },
    "100%": {
      transform: "scale(0.5)",
    },
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translate3d(-2000%, 0, 0)",
    },
    to: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    },
  },
  "@keyframes hidden": {
    "0%": {
      opacity: 0,
    },
    "99.99%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
});
function DayBox(props: Props & Omit<MuiBoxProps, keyof Props>) {
  const { time, delay, random, ...other } = props;
  const classes = useStyles(props);
  return <Box className={classes.root} {...other} />;
}
export default function Banner() {
  const { full_day, current_day } = getCalendar();
  const full_year = [...new Array(full_day).keys()];
  return (
    <>
      <Box>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "700px",
              mx: "auto",
              mt: 3,
            }}
          >
            {full_year.map(day => {
              if (day < current_day) {
                return (
                  <DayBox
                    random={Math.random()}
                    key={day}
                    delay={day}
                    time="past"
                  />
                );
              }
              if (day === current_day) {
                return (
                  <DayBox
                    key={day}
                    random={Math.random()}
                    delay={day}
                    time="current"
                  />
                );
              }
              if (day > current_day) {
                return (
                  <DayBox
                    random={Math.random()}
                    key={day}
                    delay={day}
                    time="future"
                  />
                );
              }
              return null;
            })}
          </Box>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "background.paper", my: 3, overflow: "hidden" }}>
        <Container>
          <Box
            sx={{
              textAlign: "center",
              fontSize: "h6.fontSize",
              fontWeight: "500",
              my: 4,
            }}
          >
            今天是{new Date().getFullYear()}年的第{current_day + 1}天
          </Box>
        </Container>
      </Box>
    </>
  );
}
