import { AppBar, IconButton, Toolbar, Typography, makeStyles, MenuItem, Menu, Button } from '@material-ui/core'
import {Home as HomeIcon, Menu as MenuIcon, SyncAlt } from '@material-ui/icons'

import AccountCircle from '@material-ui/icons/AccountCircle'
import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import useAuth from '../../Hooks/useAuth';


export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorMenu, setAnchorMenu] =useState(null)
  const LoginMenuOpen = Boolean(anchorEl)
  const pageMenuOpen =Boolean(anchorMenu)
  
  const {
    auth,rmAuth,
  } = useAuth()

  const handleLoginMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePageMenu =(event)=>{
    setAnchorMenu(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorMenu(null)
  };

  const handleLogout=()=>{
    rmAuth()
  }

  return (
    <div className={classes.root}>
      
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={handlePageMenu} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Menu id="menuPage" anchorEl={anchorMenu} keepMounted open={pageMenuOpen} onClose={handleClose}>
            <MenuItem component={Link} to={'/'}> <HomeIcon/> Home </MenuItem>
            <MenuItem component={Link} to={'/ThermoConverter'}>Cº <SyncAlt/>Fº</MenuItem>
          </Menu>

          <Typography variant="h6" className={classes.title} >
             Programação Web 2 Site
          </Typography>
          {auth && (
            <div>
              <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleLoginMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu id="menu-login" anchorEl={anchorEl} keepMounted open={LoginMenuOpen} onClose={handleClose}
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
