// eslint-disable-next-line
import React from "react";
import useFetchData from "./useFetchData";

import {preprocessNodes} from "../helpers";

const useFetchNodes = (pathsFile = "paths_reduced-e10.json") => {
  const [
    { data: nodesData, isLoading: isNodesLoading, isError: isNodesError },
  ] = useFetchData("nodes_list.json", {});
  const [
    { data: pathsData, isLoading: isPathsLoading, isError: isPathsError },
    doFetchPaths,
  ] = useFetchData(pathsFile, {});

  return [
    {
      nodes: {
        list: preprocessNodes(Object.values(nodesData)),
        obj: nodesData
      },
      paths: {
        obj: pathsData
      },
    },
    isNodesLoading || isPathsLoading,
    isNodesError || isPathsError,
    doFetchPaths
  ];
};

export default useFetchNodes;
