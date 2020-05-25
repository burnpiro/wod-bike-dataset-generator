# wod-bike-dataset-generator

## Path generation
To generate csv file with paths you need to have `./network/nodes_locations.csv` file already available.

Execute notebook (watch out, it's memory consuming, and takes ages ~7h):
```
OSMNX - path generation.ipynb
```

File with paths should be in `./networks/paths.csv`

## WebApp installation

```bash
cd application
npm install
npm run start
```

### Deployment
```bash
npm run deploy
```

## Mapped network nodes on Wroclaw map
![alt text](./assets/2019-03-with-degrees.png)

more visualizations in `./assets/`