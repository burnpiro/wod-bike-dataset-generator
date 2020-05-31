import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Divider from "@material-ui/core/Divider";
import Layout from "../Layout/Layout";
import Network from "../Network/Network";
import "./App.css";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "absolute",
    height: "calc(100% - 64px)",
    marginTop: "64px",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(6),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  menuContainer: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  formElement: {
    marginTop: theme.spacing(2),
  },
}));

const nodeMetrics = [
  {
    name: "Degree",
    value: "k",
  },
  {
    name: "In Degree",
    value: "ik",
  },
  {
    name: "Out Degree",
    value: "ok",
  },
  {
    name: "PageRank",
    value: "p",
  },
  {
    name: "Degree trend",
    value: "trend",
  },
];

const pathOptions = [
  {
    name: 20,
    value: 20,
  },
  {
    name: 50,
    value: 50,
  },
  {
    name: 80,
    value: 80,
  },
  {
    name: 100,
    value: 100,
  },
  {
    name: 150,
    value: 150,
  },
  {
    name: 300,
    value: 300,
  },
]

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showNodes, setShowNodes] = React.useState(true);
  const [showPaths, setShowPaths] = React.useState(true);
  const [nodeMetric, setNodeMetric] = React.useState(nodeMetrics[0].value);
  const [numOfPaths, setNumOfPaths] = React.useState(50);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleShowNodes = (event) => {
    setShowNodes(event.target.checked);
  };
  const handleShowPaths = (event) => {
    setShowPaths(event.target.checked);
  };
  const handleNodeMetric = (event) => {
    setNodeMetric(event.target.value);
  };
  const handleNumOfPaths = (event) => {
    setNumOfPaths(event.target.value);
  };

  return (
    <Layout>
      <Drawer
        variant="permanent"
        classes={{
          paper:
            classes.drawerPaper + " " + (!open ? classes.drawerPaperClose : ""),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          {open && (
            <IconButton onClick={handleDrawerClose}>&#x276E;</IconButton>
          )}
          {!open && (
            <IconButton onClick={handleDrawerOpen}>&#x276F;</IconButton>
          )}
        </div>
        <Divider />
        {open && (
          <Container className={classes.menuContainer}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Display Option</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showNodes}
                      onChange={handleShowNodes}
                      name="nodes"
                    />
                  }
                  label="Show Nodes?"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showPaths}
                      onChange={handleShowPaths}
                      name="paths"
                    />
                  }
                  label="Show Paths?"
                />
              </FormGroup>
            </FormControl>
            <FormControl className={classes.formElement}>
              <InputLabel id="nodeMetric-label">Node Metric</InputLabel>
              <Select
                labelId="nodeMetric-label"
                id="nodeMetric"
                value={nodeMetric}
                onChange={handleNodeMetric}
              >
                {nodeMetrics.map((metric) => (
                  <MenuItem key={metric.value} value={metric.value}>
                    {metric.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formElement}>
              <InputLabel id="numOfNodes-label">Max num. of paths</InputLabel>
              <Select
                labelId="numOfNodes-label"
                id="numOfNodes"
                value={numOfPaths}
                onChange={handleNumOfPaths}
              >
                {pathOptions.map((numData) => (
                  <MenuItem key={numData.value} value={numData.value}>
                    {numData.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Be careful it might affect performance</FormHelperText>
            </FormControl>
          </Container>
        )}
      </Drawer>
      <Network showNodes={showNodes} showPaths={showPaths} nodeMetric={nodeMetric} maxNumOfPaths={numOfPaths}/>
    </Layout>
  );
}

export default App;
