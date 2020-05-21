import React from "react";
import Plot from "react-plotly.js";

const data = [
  {
    type: "scattergeo",
    mode: "markers",
    locations: ["FRA", "DEU", "RUS", "ESP"],
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
    name: "europe data",
  },
];

const layout = {
  geo: {
    scope: "europe",
    resolution: 50,
  },
  autosize: true
};

const config = {
  responsive: true
};

class Network extends React.Component {
  render() {
    return (
      <Plot
        data={data}
        layout={layout}
        useResizeHandler={true}
        style={{width:"100%", minHeight: "calc(100vh - 200px)"}}
      />
    );
  }
}

export default Network;
