import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Plot from "react-plotly.js";
import useFetchNodes from "../../hooks/useFetchNodes";
import useTimer from "../../hooks/useTimer";
import { makeStyles } from "@material-ui/core/styles";

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
          args: [
            'play',
          ],
          label: "Play",
        },
        {
          method: "update",
          args: [
            'pause',
          ],
          label: "Pause",
        },
      ],
      direction: "left",
      pad: { r: 10, t: 10 },
      showactive: true,
      type: "buttons",
      x: 0.0,
      xanchor: "left",
      y: 1.1,
      yanchor: "top",
    },
  ],
  sliders: [
    {
      pad: { t: 5, b: 10 },
      x: 0.15,
      y: 1.1,
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
      active: 2,
      steps: Array(1440 / 15)
        .fill(0)
        .map((val, id) => ({
          label: `${Math.floor(id * 15/60)}:${id*15%60 === 0 ? '00' : id*15%60}`,
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
  const [{ nodes, paths }, isLoading, isError] = useFetchNodes();
  const { time, start, pause, reset, isRunning } = useTimer({
    endTime: 1440 / 15,
    initialTime: frameId,
  });
  layout.sliders[0].active = time;

  useEffect(() => {
    setFrames(
      Array(1440 / 15)
        .fill(0)
        .map((val, id) => [...nodes, ...paths.slice(id * 10, (id + 1) * 10)])
    );
  }, [isLoading]);
  const data = frames[time] || [];
  const buttonClick = ({button}) => {
    switch(button.args[0]) {
      case 'play':
        start()
        break;
      case 'pause':
        pause()
        break;
      default:
        console.log(button.args[0])
        break;
    }
  };
  const sliderChange = ({ step }) => {
    setFrameId(step.args[0]);
    reset(step.args[0])
  };
  return (
    <React.Fragment>
      <Plot
        data={data.length === 0 ? nodes : data}
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
      {isLoading && (
        <div className={classes.overlay}>
          <CircularProgress color="secondary" size={80} thickness={4} />
          <h1>Network data is loading... Please wait :)</h1>
        </div>
      )}
    </React.Fragment>
  );
};

export default Network;
