import React from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './NavBar.css'


export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <div >
      <AppBar id="NavBar" position="static">
        <Toolbar>
        
          {/* <Button color="inherit">Login</Button> */}
          <li className="nav logo"><Link to='/'><img id="logo" alt="logo" src={require('../../assets/logo.png')}></img></Link></li>
          
          <IconButton id="nav-menu-button" className="nav" edge="end" color="inherit" aria-controls="simple-menu" aria-label="menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div id="navMenu">
        <MenuItem onClick={handleClose} className="nav"><Link className="navlink"  to='/'>Rate Anxiety</Link></MenuItem>
        <MenuItem onClick={handleClose} className="nav"><Link className="navlink"  to='/charts'>Anxiety Tracker</Link></MenuItem>
        <MenuItem onClick={handleClose} className="nav"><Link className="navlink"  to='/interventions'>Interventions</Link></MenuItem>
        <MenuItem onClick={handleClose} className="nav"><Link className="navlink"  to='/journal'>Create Journal Entry</Link></MenuItem>
        <MenuItem onClick={handleClose} className="nav"><Link className="navlink" to='/journal/entries'>My Journal Entries</Link></MenuItem>
        </div>
      </Menu>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}