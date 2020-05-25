import React from "react";
import useFetchData from "./useFetchData";

import {preprocessNodes} from "../helpers";

const useFetchNodes = () => {
  const [
    { data: nodesData, isLoading: isNodesLoading, isError: isNodesError },
    doFetchNodes,
  ] = useFetchData("nodes_list.json", {});
  const [
    { data: pathsData, isLoading: isPathsLoading, isError: isPathsError },
    doFetchPaths,
  ] = useFetchData("paths_reduced-e7.json", {});

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
  ];
};

export default useFetchNodes;
