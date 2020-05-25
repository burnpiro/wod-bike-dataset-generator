# wod-bike-dataset-generator

## Github Large File Storage

For large file storeage we need to use [Github LFS](https://git-lfs.github.com/). Please follow the instruction and install it on your machine.

## Path generation
To generate csv file with paths you need to have `./network/nodes_locations.csv` file already available.

Execute notebook (watch out, it's memory consuming, and takes ages ~7h):
```
OSMNX - path generation.ipynb
```

File with paths should be separate files depends on accuracy:
 ```markdown
./application/app_data/paths_reduced-e7.json
./application/app_data/paths_reduced-e8.json
./application/app_data/paths_reduced-e9.json
./application/app_data/paths_reduced-e10.json
./application/app_data/paths_reduced-e11.json
./application/app_data/paths_reduced-e12.json
```

Additionally, it will create file with nodes:
```markdown
./application/public/nodes_list.json
```

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


### Json coding
```
{"rental_place":"o","return_place":"d","number_of_trips":"c"}
```

```
{
    <day>: {
           <start_minute>: [
                    {
                            "o": 1,
                            "d": 2,
                            "c": 15,
                    }
             ]
     }
}
```

Example:

```
{
   1: {
           375: [
                    {
                            "o": 1,
                            "d": 2,
                            "c": 15,
                    }
             ]
     }
}
```
