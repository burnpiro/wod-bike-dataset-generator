# wod-bike-dataset-generator

## Mapped network nodes on Wroclaw map
![alt text](./assets/wrm_map.png)

## Map for 03 2019, scaled base on edge weight and node degree
![alt text](./assets/2019-03-with-degrees.png)
### only display edges with weight > 20
![alt text](./assets/2019-03-filtered.png)


### Animated network 2019
![Full network animation](./assets/full_map.gif)
### Networks month/month 2019
[Full networks](./assets/2019-full-images.zip)

### Animated network 2019 (degree only)
![Full network animation](./assets/degree_map.gif)

### Degree distribution change
![alt text](./assets/degree.gif)

### Clustering Coefficent distribution change
![alt text](./assets/cc.gif)

### Closeness distribution change
![alt text](./assets/closeness.gif)

### Betweenness distribution change
![alt text](./assets/betw.gif)

### Generating files

To generate edges weights and metrics for all nodes in each interval you have to run generate_groupby_intervals_datasets.py and then run generate_all_metrics.py. Generated files with weighted edges already are in groupedby_intervals directory. Files containing metrics for nodes (.*metrics.csv) and bikes usage (.*bikes_usage.csv) are in metrics directory.


### Json coding
```
{"interval_start":"s","rental_place":"o","return_place":"d","number_of_trips":"c"}
```
