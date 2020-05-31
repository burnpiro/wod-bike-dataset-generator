export const preprocessPaths = (paths = {}) => {
  return paths.map((row) => ({
    type: "scattermapbox",
    lat: row.lng,
    lon: row.lat,
    mode: "lines",
    line: { width: 4, color: "red" },
    id: row.id,
    text: `Connection between ${row.id}`,
  }));
};

export const preprocessNodes = (nodes = {}) => {
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

export const generateRandomFile = () => {
  return Array(31)
    .fill(1)
    .reduce((acc, value, index) => {
      acc[index + 1] = Array(1440 / 15)
        .fill(0)
        .reduce((dayAcc, dayVal, dayId) => {
          dayAcc[dayId * 15] = Array(Math.floor(Math.random() * 15) + 1)
            .fill(1)
            .map((el, index) => {
              const org = Math.floor(Math.random() * 202)
              const dest = Math.floor(Math.random() * 204)
              return {
                o: org,
                d: org === dest ? dest + 1 : dest,
                c: Math.floor(Math.random() * 30) + 1,
              }
            });
          dayAcc[dayId * 15].sort((a, b) => b.c - a.c)
          return dayAcc;
        }, {});
      return acc;
    }, {});
};

export const fillPathsWithData = (paths = {}, nodes = {}) => {
  return (pathData = {}) => {
    const path = paths[`${pathData["o"]}-${pathData["d"]}`];
    return {
      type: "scattermapbox",
      lat: path == null ? [] : path.lng,
      lon: path == null ? [] : path.lat,
      mode: "lines",
      line: { width: pathData["c"]*2, color: "rgba(255,0,0,0.5)" },
      id: path == null ? [] : path.id,
      text: path == null ? 'unknown' : `"${nodes[pathData["o"]].name}" do "${nodes[pathData["d"]].name}" rowery: ${pathData["c"]}`,
    };
  };
};

const scl = [[0, 'rgb(0, 0, 200)'],[0.25,'rgb(0, 25, 255)'],[0.375,'rgb(0, 152, 255)'],[0.5,'rgb(44, 255, 150)'],[0.625,'rgb(151, 255, 0)'],[0.75,'rgb(255, 234, 0)'],[0.875,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

export const fillNodesMetricData = (metrics = {}, metricKey = 'k', usePrev = false, prevMetrics, prevMetricTwo) => {
  return (node = {}) => {
    return {
      type: "scattermapbox",
      lat: node.lat,
      lon: node.lon,
      ids: node.ids,
      mode: "markers",
      marker: {
        size: node.ids.map(id => {
          const currMetric = metrics.find(metr => metr.o === id)
          if(currMetric == null) {
            return 4;
          }
          const metricValue = metricKey === 'p' ? Math.max((7*8 + Math.ceil(Math.log2(currMetric[metricKey]))*7)/3, 1) : currMetric[metricKey];
          return Math.ceil(Math.log2(metricValue))*8
        }),
        color: node.ids.map(id => {
          const currMetric = metrics.find(metr => metr.o === id)
          if(currMetric == null) {
            return 'blue';
          }
          const metricValue = metricKey === 'p' ? Math.max((9*8 + Math.ceil(Math.log2(currMetric[metricKey]))*9)/3, 0) : currMetric[metricKey];
          if(usePrev) {
            const prev = prevMetrics.find(metr => metr.o === id) || currMetric
            const prev2 = prevMetricTwo.find(metr => metr.o === id) || currMetric
            const avg = [currMetric, prev, prev2].reduce((acc, val, id, arr) => {
              if(metricKey === 'p') {
                acc += Math.max((9*8 + Math.ceil(Math.log2(val['p']))*9)/3, 0)/arr.length
              } else {
                acc += val[metricKey]/arr.length
              }
              return acc
            }, 0)

            return (metricValue - avg)*2 + 5
          }
          return metricValue
        }),
        colorscale: scl,
        cmin: 0,
        cmax: 15,
        opacity: 0.8,
      },
      hoverinfo: "text",
      text: node.text,
    };
  };
};
