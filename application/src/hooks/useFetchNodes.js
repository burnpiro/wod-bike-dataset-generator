import React, { useState, useEffect } from "react";
import useFetchData from "./useFetchData";

const preprocessNodes = (nodes = []) => {
  const lat = nodes.map((row) => row["lat"]);
  const lng = nodes.map((row) => row["lng"]);
  const ids = nodes.map((row) => row["id"]);
  const names = nodes.map((row) => row["name"]);
  return [
    {
      type: "scattermapbox",
      lat: lat,
      lon: lng,
      ids: ids,
      mode: "markers",
      marker: {
        size: 14,
        color: "blue",
      },
      hoverinfo: "text",
      text: names,
    },
  ];
};

const preprocessPaths = (paths = []) => {
  return paths.map((row) => ({
    type: "scattermapbox",
    lat: row.lng,
    lon: row.lat,
    mode: "lines",
    line: {width: 4, color: "red"},
    id: row.id,
    text: `Connection between ${row.id}`,
  }));
};

const useFetchNodes = () => {
  const [
    { data: nodesData, isLoading: isNodesLoading, isError: isNodesError },
    doFetchNodes,
  ] = useFetchData("nodes_list.json", []);
  const [
    { data: pathsData, isLoading: isPathsLoading, isError: isPathsError },
    doFetchPaths,
  ] = useFetchData("paths_reduced-e7.json", []);

  return [
    {
      nodes: preprocessNodes(nodesData),
      paths: preprocessPaths(pathsData),
    },
    isNodesLoading || isPathsLoading,
    isNodesError || isPathsError,
  ];
};

export default useFetchNodes;
