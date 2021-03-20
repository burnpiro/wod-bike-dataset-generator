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
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { useCookie } from "@use-hook/use-cookie";
import Tour from "reactour";
import Layout from "../Layout/Layout";
import Network from "../Network/Network";
import { nodeMetrics } from "../../helpers";
import "./App.css";
import { steps } from "./tour_steps";
import Typography from "@material-ui/core/Typography";

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
    display: "flex",
    flexDirection: "column",
  },
  formElement: {
    marginTop: theme.spacing(2),
    flex: 1,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "500px",
    margin: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  iconButton: {
    padding: 10,
  },
  helpContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
}));

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
];

const pathPrecs = [
  {
    label: '3% (fastest) 2MB',
    value: 'paths_reduced-e7.json'
  },
  {
    label: '13% (optimal) 10MB',
    value: 'paths_reduced-e12.json'
  },
  {
    label: '28% (slowest) 27MB!',
    value: [
      'paths_reduced-e15_p1.json',
      'paths_reduced-e15_p2.json'
    ]
  },
]

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [modalId, setModalId] = React.useState(null);
  const [useTrend, setUseTrend] = React.useState(false);
  const [showNodes, setShowNodes] = React.useState(true);
  const [showPaths, setShowPaths] = React.useState(true);
  const [pathPrec, setPathPrec] = React.useState(pathPrecs[1].value);
  const [cookie, setCookie] = useCookie("guide-showed", false);
  const [isTourOpen, setIsTourOpen] = React.useState(!cookie);
  const [nodeMetric, setNodeMetric] = React.useState(nodeMetrics[0].value);
  const [numOfPaths, setNumOfPaths] = React.useState(50);
  const [currentUsage, setCurrentUsage] = React.useState({
    rent: 0,
    total: null,
    percentage: 0,
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleUseTrend = (event) => {
    setUseTrend(event.target.checked);
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
  const handlePathPrec = (event) => {
    setPathPrec(event.target.value);
  };

  const handleStepChange = (curr) => {
    if (steps[curr].menuOpen && !open) {
      setOpen(true);
    }
    if (steps[curr].menuOpen === false && open) {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setModalId(null);
  };

  const handleShowModal = (modalId) => {
    setModalId(modalId);
  };

  const setGuideCookie = () => {
    setCookie(true);
  };

  return (
    <Layout usage={currentUsage}>
      <Drawer
        variant="permanent"
        classes={{
          paper:
            classes.drawerPaper + " " + (!open ? classes.drawerPaperClose : ""),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} id="menu-toggle">
          {open && (
            <IconButton onClick={handleDrawerClose}>&#x276E;</IconButton>
          )}
          {!open && (
            <IconButton onClick={handleDrawerOpen}>&#x276F;</IconButton>
          )}
        </div>
        <Divider />
        {open && (
          <Container className={classes.menuContainer} id="left-menu">
            <FormControl component="fieldset" id="display-options">
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
            <div className={classes.helpContainer}>
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
              <IconButton
                color="primary"
                className={classes.iconButton}
                aria-label="directions"
                onClick={() => handleShowModal(13)}
              >
                ?
              </IconButton>
            </div>
            <div className={classes.helpContainer}>
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
                <FormHelperText>
                  Be careful it might affect performance
                </FormHelperText>
              </FormControl>
              <IconButton
                color="primary"
                className={classes.iconButton}
                aria-label="directions"
                onClick={() => handleShowModal(14)}
              >
                ?
              </IconButton>
            </div>
            <div className={classes.helpContainer}>
              <FormControl className={classes.formElement} id="useTrends">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={useTrend}
                        onChange={handleUseTrend}
                        name="useTrend"
                      />
                    }
                    label="Calculate Trend?"
                  />
                </FormGroup>
              </FormControl>
              <IconButton
                color="primary"
                className={classes.iconButton}
                aria-label="directions"
                onClick={() => handleShowModal(15)}
              >
                ?
              </IconButton>
            </div>

            <FormControl className={classes.formElement} id="path-prec">
              <InputLabel id="prec-label">Path precision</InputLabel>
              <Select
                labelId="prec-label"
                value={pathPrec}
                onChange={handlePathPrec}
              >
                {pathPrecs.map((metric) => (
                  <MenuItem key={metric.value} value={metric.value}>
                    {metric.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Container>
        )}
        <div style={{ flex: 1 }} />
        <IconButton
          color="secondary"
          aria-label="Show guide"
          id="guide-icon"
          onClick={() => setIsTourOpen(true)}
        >
          ?
        </IconButton>
      </Drawer>
      <Network
        showNodes={showNodes}
        showPaths={showPaths}
        nodeMetric={nodeMetric}
        maxNumOfPaths={numOfPaths}
        useTrend={useTrend}
        onUsageChange={setCurrentUsage}
        pathPrec={pathPrec}
      />
      {isTourOpen && (
        <Tour
          steps={steps}
          isOpen={isTourOpen}
          closeWithMask={false}
          getCurrentStep={handleStepChange}
          lastStepNextButton={<Typography variant="h5" noWrap color="secondary">Close</Typography>}
          onRequestClose={() => {
            setIsTourOpen(false);
            setGuideCookie();
          }}
        />
      )}
      {modalId != null && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>{steps[modalId].content({})}</div>
          </Fade>
        </Modal>
      )}
    </Layout>
  );
}

export default App;
