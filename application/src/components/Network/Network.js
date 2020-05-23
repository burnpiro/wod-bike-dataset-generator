import React, {useEffect, useState} from "react";
import axios from 'axios'
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
  const [fileProgress, setFileProgess] = useState(1.0)
  const [nodesData, setNodesData] = useState([]);
  const [pathsData, setPathsData] = useState([]);
  console.log(nodesData, pathsData)

  useEffect(() => {
    if (nodesData.length === 0) {
      axios.request( {
        method: "get",
        url: "nodes_list.json",
        onUploadProgress: (p) => {
          console.log(p);
          //this.setState({
          //fileprogress: p.loaded / p.total
          //})
          setFileProgess(p.loaded / p.total)
        }
      }).then (response => {
        const lat = response.data.map(row => row['lat']);
        const lng = response.data.map(row => row['lng']);
        const ids = response.data.map(row => row['id']);
        const names = response.data.map(row => row['name']);
        console.log('aaa')
        setNodesData([{
          type:'scattermapbox',
          lat:lat,
          lon:lng,
          ids:ids,
          mode:'markers',
          marker: {
            size:14,
            color: 'blue'
          },
          hoverinfo: 'text',
          text:names
        }]);
        setFileProgess(1.0)
      })
      axios.request( {
        method: "get",
        url: "paths_reduced-e12.json",
        onUploadProgress: (p) => {
          console.log(p);
          //this.setState({
          //fileprogress: p.loaded / p.total
          //})
        }
      }).then (response => {
        console.log(response)
        //this.setState({
        //fileprogress: 1.0,
        //})
        console.log(response.data[13])

        const paths = response.data.map(row => ({
          type:'scattermapbox',
            lat:row.lng,
            lon:row.lat,
            ids:row.id,
            mode:'lines',
            marker: {
            size:14,
              color: 'red'
          },
          id:row.id,
          text: `Connection between${row.id}`,
        }));
        // const lng = response.data.slice(0,30).map(row => row['lat']);
        // const ids = response.data.slice(0,30).map(row => row['id']);
        // const names = response.data.slice(0,30).map(row => `Connection between${row['id']}`);
        setPathsData(paths);
      })
      // fetch(nodes)
      //   .then(res => res.text())
      //   .then(stringData => {
      //     let lines = stringData.split("\n").map(line => line.split(','));
      //     let [ idx, ...data] = lines
      //     setFetchedCSVdata([{
      //       type:'scattermapbox',
      //       lat:data.map(point => point[2]),
      //       lon:data.map(point => point[3]),
      //       ids:data.map(point => point[0]),
      //       mode:'markers',
      //       marker: {
      //         size:14,
      //         color: 'blue'
      //       },
      //       hoverinfo: 'text',
      //       text:data.map(point => point[1])
      //     }]);
      //   });
    }
  }, [])
  return (
    <Plot
      data={nodesData === [] ? data : [...nodesData, ...pathsData.slice(0,400)]}
      layout={layout}
      useResizeHandler={true}
      style={{ width: "100%", minHeight: "calc(100vh - 70px)" }}
    />
  );
}

export default Network;
