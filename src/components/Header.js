import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { ADD, DLT } from "../redux/actions/Action";  // Make sure you have an ADD action

const Header = () => {
    const getData = useSelector((state) => state.cartreducer.carts);
    const dispatch = useDispatch();
    const[totalprice, setTotalprice] = useState(0);
    console.log(totalprice);

    const dlt = (id) => {
        dispatch(DLT(id));
    };

    const total = ()=>{
        let price = 0;
        getData.map((ele,k)=>{
            price = ele.price + price
        });
        setTotalprice(price)
    }

    // const total = () => {
    //     let price = 0;
    //     getData.map((ele) => {
    //         price += ele.price * ele.qnty;
    //     });
    //     setTotalprice(price);
    // };

    const addItemToCart = (item) => {
        dispatch(ADD(item));  // Make sure you have an ADD action defined in your actions
        Swal.fire({
            icon: 'success',
            title: 'Added to cart!',
            text: `${item.rname} has been added to your cart.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        total();
    }, [total]);

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "60px" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-3">Add to Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
                    </Nav>
                    <Badge badgeContent={getData.length} color="primary"
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
                    {
                        getData.length ?
                            <div className="card_details" style={{ width: "24rem", padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData.map((e) => (
                                                <tr key={e.id}>
                                                    <td className="image-container">
                                                        <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                        <div className="image-wrapper">
                                                                <img src={e.imgdata} alt="" />
                                                                <button className="overlay-button">Click Me</button>
                                                            </div>
                                                        </NavLink>
                                                    </td>
                                                    <td>
                                                        <p>Name: {e.rname}</p>
                                                        <p>Price: ₹{e.price}</p>
                                                        <p>Quantity: {e.qnty}</p>
                                                        <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                            <FontAwesomeIcon icon={faTrash} smalltrash />
                                                        </p>
                                                    </td>
                                                    <td className="mt-5" style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                                                        <FontAwesomeIcon icon={faTrash} largetrash />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        <p className="text-center">Total: ₹{totalprice}</p>
                                    </tbody>
                                </Table>
                            </div> :
                            <div className="card_details d-flex justify-content-center align-items-center" style={{ width: "24rem", padding: 10, position: "relative" }}>
                                <FontAwesomeIcon icon={faTimes} className='smallclose' style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }} onClick={handleClose} />
                                <p style={{ fontSize: 22 }}>Your Cart is empty</p>
                                <img src="./cart.gif" className="emptycart_img" style={{ width: "5rem", padding: 10 }} />
                            </div>
                    }
                </Menu>
            </Navbar>
        </>
    );
};

export default Header;
