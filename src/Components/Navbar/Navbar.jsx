import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from './ecommerce-icon.png';
import { authContext } from "../../Contexts/AuthContext";
import { useContext } from "react";
import { cartContext } from "../../Contexts/CartContext";

export default function Navbar(){
    const {userIsLoggedIn, setUserIsLoggedIn} = useContext(authContext)
    const {cartNo} = useContext(cartContext)
    const navigate = useNavigate()

    function logOut(){
        setUserIsLoggedIn(false)
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to={''}>
            <img src={Logo} width="40" height="40" alt="Logo"/>
            <h4 className="d-inline mb-0 ms-2">E-Commerce</h4>
        </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
        
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userIsLoggedIn && <ul className="navbar-nav me-auto">
                <li className="nav-item active">
                    <Link to='home' className="nav-link" href="#">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to='cart' className="nav-link" href="#">Cart</Link>
                </li>
                <li className="nav-item">
                    <Link to='products' className="nav-link" href="#">Products</Link>
                </li>
                <li className="nav-item">
                    <Link to='categories' className="nav-link" href="#">Categories</Link>
                </li>
                <li className="nav-item">
                    <Link to='brands' className="nav-link" href="#">Brands</Link>
                </li>
                <li className="nav-item">
                    <Link to='allorders' className="nav-link" href="#">Orders</Link>
                </li>
                <li className="nav-item">
                    <Link to='wishlist' className="nav-link" href="#">Wishlist</Link>
                </li>
            </ul>}
            <ul className="navbar-nav ms-auto">
                {userIsLoggedIn && <li className="nav-item">
                    <Link to={'/cart'} className="nav-link" href="#"><i className="fa-solid fa-cart-shopping fa-2x position-relative "><span className="position-absolute top-0 start-100 translate-middle bg-success p-2 rounded-circle font-sm">{cartNo?.numOfCartItems || 0}</span></i></Link>
                </li>}
                <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa-brands fa-instagram"></i></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa-brands fa-facebook"></i></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa-brands fa-tiktok"></i></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa-brands fa-twitter"></i></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa-brands fa-linkedin"></i></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa-brands fa-youtube"></i></a>
                </li>
                {userIsLoggedIn ? <li className="nav-item">
                    <Link to='#' onClick={logOut} className="nav-link" href="#">Logout</Link>
                </li>
                :
                <>
                <li className="nav-item">
                    <Link to='login' className="nav-link" href="#">Login</Link>
                </li>
                <li className="nav-item">
                    <Link to='register' className="nav-link" href="#">Register</Link>
                </li>
                </>
                }
                
                
            </ul>
            </div>
        </div>
    </nav>        
    )
}