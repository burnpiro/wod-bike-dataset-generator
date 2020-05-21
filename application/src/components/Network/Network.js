import React, {useEffect, useState} from "react";
import Plot from "react-plotly.js";

import nodes from './nodes_locations.csv'

const data = [
  {
    type: "scattermapbox",
    marker: {
      size: [20, 30, 15, 10],
      color: [10, 20, 40, 50],
      cmin: 0,
      cmax: 50,
      colorscale: "Greens",
      colorbar: {
        title: "Some rate",
        ticksuffix: "%",
        showticksuffix: "last",
      },
      line: {
        color: "black",
      },
    },
  },
];

const layout = {
  dragmode: "zoom",
  mapbox: {
    style: "open-street-map",
    center: { lat: 51.11, lon: 17.03 },
    margin: { r: 0, t: 0, b: 0, l: 0 },
    zoom: 11,
  },
  autosize: true,
  showlegend: false
};

const Network = () => {
  const [fetchedCSVData, setFetchedCSVdata] = useState(null);

  useEffect(() => {
    if (!fetchedCSVData) {
      fetch(nodes)
        .then(res => res.text())
        .then(stringData => {
          let lines = stringData.split("\n").map(line => line.split(','));
          let [ idx, ...data] = lines
          setFetchedCSVdata(data.map(point => ({
            type:'scattermapbox',
            lat:[point[2]],
            lon:[point[3]],
            mode:'markers',
            marker: {
              size:14
            },
            text:[point[1]]
          })));
        });
    }
  }, [])
  return (
    <Plot
      data={fetchedCSVData != null ? fetchedCSVData : data}
      layout={layout}
      useResizeHandler={true}
      style={{ width: "100%", minHeight: "calc(100vh - 70px)" }}
    />
  );
}

export default Network;
