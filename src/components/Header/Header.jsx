import { AppBar, IconButton, Toolbar, Typography, makeStyles, MenuItem, Menu, Button } from '@material-ui/core'
import {Home as HomeIcon} from '@material-ui/icons'
import AccountCircle from '@material-ui/icons/AccountCircle'
import React from 'react'
import { Link } from 'react-router-dom';

import useAuth from '../../Hooks/useAuth';


export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {
    auth,rmAuth,
  } = useAuth()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    rmAuth()
  }

  return (
    <div className={classes.root}>
      
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" component={Link} to={'/'} className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} >
             Programação Web 2
          </Typography>
          {auth && (
            <div>
              <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu id="menu-appbar" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right', }} transformOrigin={{ vertical: 'top', horizontal: 'right', }}>
                    <MenuItem component={Link} to={'/profile'} onClick={handleClose}>  Profile  </MenuItem>
                    <MenuItem component={Link} to={'/manutencoes'} onClick={handleClose}> Manutenções</MenuItem>
                    <MenuItem component={Link} to={'/'} onClick={handleLogout}> Logout</MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (
              <div>
                  <Button component={Link} to={'/login'} color="inherit">Login</Button>
              </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
    },
    menuButton:{
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow:1,
        color:'white',
        textDecoration: 'none'
    },
}))
