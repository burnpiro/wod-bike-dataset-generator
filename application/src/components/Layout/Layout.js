import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import logo from './logo.svg'
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  main: {
    minHeight: 'calc(100vh - 70px)',
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
}));

export default function Layout({children}) {
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
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        { children }
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
