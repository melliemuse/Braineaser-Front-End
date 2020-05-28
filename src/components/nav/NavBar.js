import React, {Component} from 'react'
import  '../../assets/logo_sm.png'
import './NavBar.css'

import MaterialUIMenu from './MaterialUIMenu'



class NavBar extends Component {
  // SimpleMenu = () => {
  //   const [anchorEl, setAnchorEl] = React.useState(null);
  
  //   const handleClick = event => {
  //     setAnchorEl(event.currentTarget);
  //   };
  
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };
  // }

render() {
    return(
        <>
        <nav className="navBar">
        {/* <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={this.SimpleMenu.handleClick}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            Rate
          </Typography>
          <Menu
        id="simple-menu"
        anchorEl={this.SimpleMenu.anchorEl}
        keepMounted
        open={Boolean(this.SimpleMenu.anchorEl)}
        onClose={this.SimpleMenu.handleClose}
      >
        <MenuItem onClick={this.SimpleMenu.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.SimpleMenu.handleClose}>My account</MenuItem>
        <MenuItem onClick={this.SimpleMenu.handleClose}>Logout</MenuItem>
      </Menu>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div> */}
              <MaterialUIMenu/>
            {/* <ul> 
                {this.props.user ?
                <>
                <div >
                <Typography className="nav-container">
                <li className="nav logo"><Link to='/'><img id="logo" alt="logo" src={require('../../assets/logos/newLogo.png')}></img></Link></li>
                <li className="nav"><Link className="navlink"  to='/'>Rate Anxiety</Link></li>
                <li className="nav"><Link className="navlink"  to='/charts'>Anxiety Tracker</Link></li>
                <li className="nav"><Link className="navlink"  to='/interventions'>Interventions</Link></li>
                <li className="nav"><Link className="navlink"  to='/journal'>Create Journal Entry</Link></li>
                <li className="nav"><Link className="navlink" to='/journal/entries'>My Journal Entries</Link></li>
                <li className="nav"><IconButton edge="start" color="inherit" aria-controls="simple-menu" aria-haspopup="true" >
            <MenuIcon />
          </IconButton></li>
                </Typography>
                </div>
                </>
                : null}
            </ul>
             */}
        </nav>
        </>
    )
}

}


export default NavBar