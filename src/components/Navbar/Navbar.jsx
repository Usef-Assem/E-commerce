import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from './Navbar.module.css'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export default function Navbar () {
  let {UserToken , setUserToken} = useContext(UserContext)
  let navigate = useNavigate()
  function Logout(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate("/Login")
  }
    return <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
        <img src={logo} alt="freshMarket logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {UserToken !== null ? <>
          <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/WishList">Wishlist</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Brands">Brands</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/allorders">All orders</Link>
        </li>
        </> : " "}
        
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="d-flex align-items-center">
            <i className="fab fa-facebook mx-2 cursor-pointer"></i>
            <i className="fab fa-twitter mx-2 cursor-pointer"></i>
            <i className="fab fa-linkedin mx-2 cursor-pointer"></i>
            <i className="fab fa-instagram mx-2 cursor-pointer"></i>
            <i className="fab fa-tiktok mx-2 cursor-pointer"></i>
            <i className="fab fa-youtube mx-2 cursor-pointer"></i>
        </li>
        {UserToken !== null ? <>
          <li className="nav-item">
          <span onClick={()=>Logout()} className="nav-link active cursor-pointer" aria-current="page" >Logout</span>
        </li>
        </> : <>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Register">Register</Link>
        </li>
        </> }


      </ul>
    </div>
  </div>
</nav>    </>;
}
