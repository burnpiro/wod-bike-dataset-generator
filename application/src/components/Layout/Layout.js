import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import logo from './logo.svg'
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {" "}
      <a aria-label="Authors" href="https://github.com/burnpiro/wod-bike-dataset-generator#contributors-">Authors</a>
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  main: {
    minHeight: 'calc(100vh - 80px)',
  },
  logo: {
    maxHeight: 32,
    marginRight: theme.spacing(2)
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100vw',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 2),
  },
  currentUsageLabel: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
}));

export default function Layout({children, usage: {rent, percentage}}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <img src={logo} alt="WRM Logo" className={classes.logo}/>
          <Typography variant="h6" color="inherit" noWrap>
            WRM Network
          </Typography>
          <div style={{display: 'flex', flex: 1}} />
          <Typography variant="h5" color="inherit" noWrap id="bikes-in-rent">
            Total bikes in rent: {rent}
          </Typography>
          <Divider orientation="vertical" flexItem  className={classes.currentUsageLabel}/>
          <Typography variant="h5" color="inherit" noWrap>
            Current Usage
          </Typography>
          <Box position="relative" display="inline-flex" id="current-usage">
            <CircularProgress variant="static" value={percentage} color="secondary"
                              size={60}
                              thickness={8}/>
            <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="button" component="div" color="inherit" >{`${percentage}%`}</Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        { children }
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
