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
          return dayAcc;
        }, {});
      return acc;
    }, {});
};

export const fillPathsWithData = (paths = {}) => {
  return (pathData = {}) => {
    const path = paths[`${pathData["o"]}-${pathData["d"]}`];
    if(path == null) {
      console.log(`${pathData["o"]}-${pathData["d"]}`)
    }
    return {
      type: "scattermapbox",
      lat: path == null ? [] : path.lng,
      lon: path == null ? [] : path.lat,
      mode: "lines",
      line: { width: Math.ceil(pathData["c"]/10), color: "red" },
      id: path == null ? [] : path.id,
      text: `Connection between ${path == null ? 'unknown' : path.id}`,
    };
  };
};
