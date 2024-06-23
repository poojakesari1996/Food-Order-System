import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
            {/* Add more NavLinks here if needed */}
          </Nav>
          <Badge badgeContent={4} color="primary"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
            <FontAwesomeIcon icon={faCartShopping} className="text-light" style={{ fontSize: 25, cursor: "pointer" }} />
          </Badge>
        </Container>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       <div className="card_details d-flex justify-content-center align-items-center" style={{width:"24rem",padding:10,position:"relative"}}>
        <i className='fas fa-close smallclose' style={{position:"absolute",top:2, right:20,fontSize:23,cursor:"pointer"}} onClick={handleClose}></i>
       <p style={{fontSize:22}}>Your Cart is empty</p>
       <img src="./cart.gif" className="emptycart_img" style={{width:"5rem",padding:10}}/>
       </div>
      </Menu>
      </Navbar>
    </>
  );
};

export default Header;
