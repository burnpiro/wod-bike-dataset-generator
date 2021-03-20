import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Plot from "react-plotly.js";
import useFetchNodes from "../../hooks/useFetchNodes";
import useTimer from "../../hooks/useTimer";
import { makeStyles } from "@material-ui/core/styles";
import useFetchData from "../../hooks/useFetchData";
import {
  fillPathsWithData,
  fillNodesMetricData,
} from "../../helpers";
import Navigation from "../Navigation/Navigation";

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
    zoom: 11,
  },
  margin: { r: 0, t: 0, b: 0, l: 0 },
  autoexpand: true,
  autosize: true,
  automargin: true,
  showlegend: false,
};

const Network = ({
  showNodes = true,
  showPaths = true,
  nodeMetric = "k",
  maxNumOfPaths = 50,
  useTrend = false,
  onUsageChange = () => {},
  pathPrec,
}) => {
  const classes = useStyles();
  const [frames, setFrames] = useState([]);
  const [frameId, setFrameId] = useState(0);
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState({ num: 4, days: 30 });
  // eslint-disable-next-line
  const [{ nodes, paths }, isLoading, isError, doFetchPaths] = useFetchNodes(
    pathPrec
  );
  const [
    { data: monthData, isLoading: isMonthLoading },
    doFetchMonth,
  ] = useFetchData(`${month.num}-paths.json`, {});
  const [
    { data: monthMetricsData, isLoading: isMonthMetricsLoading },
    doFetchMonthMetrics,
  ] = useFetchData(`${month.num}-metrics.json`, {});
  const [
    { data: monthUsageData, isLoading: isMonthUsageLoading },
    doFetchUsageMetrics,
  ] = useFetchData(`${month.num}-usage.json`, {});
  const { time, start, pause, reset } = useTimer({
    endTime: 1440 / 15,
    initialTime: frameId,
  });

  useEffect(() => {
    doFetchPaths(pathPrec)
    // eslint-disable-next-line
  }, [pathPrec])

  useEffect(() => {
    if (
      monthData != null &&
      monthData["1"] != null &&
      monthMetricsData != null &&
      monthMetricsData["1"] != null
    ) {
      setFrames(
        Array(1440 / 15)
          .fill(0)
          .map((val, id) => [
            ...(showNodes ? nodes.list : []).map(
              fillNodesMetricData(
                monthMetricsData[day][id * 15] || [],
                nodeMetric,
                useTrend,
                monthMetricsData[day][id * 15 - 15] || [],
                monthMetricsData[day][id * 15 - 30] || []
              )
            ),
            ...(showPaths ? monthData[day][id * 15] || [] : [])
              .map(fillPathsWithData(paths.obj, nodes.obj))
              .slice(0, maxNumOfPaths),
          ])
      );
    } else {
      setFrames(
        Array(1440 / 15)
          .fill(0)
          .map((val, id) => [...nodes.list])
      );
    }
    // eslint-disable-next-line
  }, [
    isLoading,
    isMonthLoading,
    isMonthMetricsLoading,
    day,
    showNodes,
    showPaths,
    nodeMetric,
    maxNumOfPaths,
    useTrend,
  ]);

  useEffect(() => {
    if (time === 1440 / 15 && day < month.days) {
      setDay(day + 1);
      start(1);
    }

    if (monthUsageData != null && monthUsageData["1"] != null) {
      const usageData = monthUsageData[day][time * 15];
      onUsageChange({
        rent: usageData ? usageData[0].bu : 0,
        total: usageData ? usageData[0].bt : 0,
        percentage: usageData ? Math.round(usageData[0].bp * 100) : 0,
      });
    }
    // eslint-disable-next-line
  }, [time, day, isMonthUsageLoading]);

  const data = frames[time] || [];
  const handleAnimationChange = (action) => {
    switch (action) {
      case "play":
        start();
        break;
      case "pause":
        pause();
        break;
      default:
        console.log(action);
        break;
    }
  };
  const onMonthChange = (month) => {
    setFrameId(0);
    reset(0);
    setMonth({ num: month.num, days: month.days });
    if(month.days < day) {
      setDay(1);
    }
    doFetchMonth(`${month.num}-paths.json`);
    doFetchMonthMetrics(`${month.num}-metrics.json`);
    doFetchUsageMetrics(`${month.num}-usage.json`);
  };
  const onHourChange = (hour) => {
    setFrameId(hour);
    reset(hour);
  };
  const onDayChange = (day) => {
    setDay(day);
  };
  return (
    <React.Fragment>
      <Navigation
        onDayChange={onDayChange}
        onHourChange={onHourChange}
        onMonthChange={onMonthChange}
        onAnimationChange={handleAnimationChange}
        day={day}
        time={time}
      />
      <Plot
        data={data}
        layout={layout}
        useResizeHandler={true}
        style={{ width: "100%", minHeight: "calc(100vh - 220px)" }}
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
