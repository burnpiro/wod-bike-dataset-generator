import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Plot from "react-plotly.js";
import spacetime from "spacetime";
import useFetchNodes from "../../hooks/useFetchNodes";
import useTimer from "../../hooks/useTimer";
import { makeStyles } from "@material-ui/core/styles";
import useFetchData from "../../hooks/useFetchData";
import {generateRandomFile, fillPathsWithData} from "../../helpers";

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vw",
    paddingTop: "25%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
}));

const layout = {
  dragmode: "zoom",
  mapbox: {
    style: "open-street-map",
    center: { lat: 51.11, lon: 17.03 },
    margin: { r: 0, t: 0, b: 0, l: 0 },
    zoom: 11,
  },
  autosize: true,
  showlegend: false,
  updatemenus: [
    {
      buttons: [
        {
          method: "update",
          args: ["play"],
          label: "Play",
        },
        {
          method: "update",
          args: ["pause"],
          label: "Pause",
        },
      ],
      name: "action",
      direction: "left",
      pad: { t: 10 },
      showactive: true,
      type: "buttons",
      x: 0.0,
      xanchor: "left",
      y: 1.1,
      yanchor: "top",
    },
    {
      buttons: [
        {
          args: [3, 31],
          label: "March",
          method: "update",
        },
        {
          args: [4, 30],
          label: "April",
          method: "update",
        },
        {
          args: [5, 31],
          label: "May",
          method: "update",
        },
        {
          args: [6, 30],
          label: "June",
          method: "update",
        },
        {
          args: [7, 31],
          label: "July",
          method: "update",
        },
        {
          args: [8, 31],
          label: "August",
          method: "update",
        },
        {
          args: [9, 30],
          label: "September",
          method: "update",
        },
        {
          args: [10, 31],
          label: "October",
          method: "update",
        },
        {
          args: [11, 30],
          label: "November",
          method: "update",
        },
        {
          args: [12, 31],
          label: "December",
          method: "update",
        },
      ],
      name: "month",
      direction: "down",
      pad: { t: 10 },
      showactive: true,
      type: "dropdown",
      x: 0.0,
      xanchor: "left",
      y: 1.15,
      yanchor: "top",
      active: 0,
      font: { color: "#5072a8" },
    },
  ],
  sliders: [
    {
      pad: { t: 5, b: 10 },
      x: 0.15,
      y: 1.11,
      len: 0.85,
      currentvalue: {
        visible: true,
        xanchor: "right",
        prefix: "Hour: ",
        font: {
          color: "#888",
          size: 20,
        },
      },
      active: 0,
      name: "Hour",
      steps: Array(1440 / 15)
        .fill(0)
        .map((val, id) => ({
          label: `${Math.floor((id * 15) / 60)}:${
            (id * 15) % 60 === 0 ? "00" : (id * 15) % 60
          }`,
          args: [id],
          method: "update",
        })),
    },
  ],
};

const Network = () => {
  const classes = useStyles();
  const [frames, setFrames] = useState([]);
  const [frameId, setFrameId] = useState(0);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState({ num: 7, days: 31 });
  const [{ nodes, paths }, isLoading, isError] = useFetchNodes();
  const [
    { data: monthData, isLoading: isMonthLoading },
    doFetchMonth,
  ] = useFetchData("07.json", []);
  const randomFile = generateRandomFile();
  const { time, start, pause, reset, isRunning } = useTimer({
    endTime: 1440 / 15,
    initialTime: frameId,
  });
  layout.sliders[0].active = time;
  layout.sliders[1] = {
    pad: { t: 5, b: 10 },
    x: 0.15,
    y: 1.22,
    len: 0.85,
    currentvalue: {
      visible: true,
      xanchor: "right",
      prefix: "Day: ",
      font: {
        color: "#888",
        size: 12,
      },
    },
    active: day - 1,
    name: "Day",
    steps: Array(month.days)
      .fill(0)
      .map((val, id) => ({
        label: id + 1,
        args: [id + 1],
        method: "update",
      })),
  };

  useEffect(() => {
    if(monthData.length !== 0) {
      setFrames(
        Array(1440 / 15)
          .fill(0)
          .map((val, id) => [...nodes.list, ...randomFile[day][id*15].map(fillPathsWithData(paths.obj))])
      );

    } else {
      setFrames(
        Array(1440 / 15)
          .fill(0)
          .map((val, id) => [...nodes.list])
      );
    }
  }, [isLoading, isMonthLoading, day]);
  const data = frames[time] || [];
  const buttonClick = ({menu: {name}, button: {args}}) => {
    if(name === 'month') {
      setFrameId(0);
      reset(0);
      setMonth({num: args[0], days: args[1]})
      setDay(1)
    } else {
      switch (args[0]) {
        case "play":
          start();
          break;
        case "pause":
          pause();
          break;
        default:
          console.log(args[0]);
          break;
      }
    }
  };
  const sliderChange = ({ slider: { name }, step: { args } }) => {
    if (name === "Hour") {
      setFrameId(args[0]);
      reset(args[0]);
    }
    if (name === "Day") {
      setDay(args[0]);
      setFrameId(0);
      reset(0);
    }
  };
  return (
    <React.Fragment>
      <Plot
        data={data}
        layout={layout}
        frames={Array(frames.length)
          .fill(0)
          .map((i, id) => ({
            name: id,
          }))}
        onButtonClicked={buttonClick}
        onSliderChange={sliderChange}
        useResizeHandler={true}
        style={{ width: "100%", minHeight: "calc(100vh - 70px)" }}
      />
      {(isLoading) && (
        <div className={classes.overlay}>
          <CircularProgress color="secondary" size={80} thickness={4} />
          <h1>Network data is loading... Please wait :)</h1>
        </div>
      )}
    </React.Fragment>
  );
};

export default Network;
