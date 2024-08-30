import React from "react";
import style from './Layout.module.css'
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useEffect } from "react";
import { Offline } from "react-detect-offline";


export default function Layout () {

    return <>
        <Navbar/>
        <div className="container">
        <Outlet/>
        </div>
             <Offline>
                <div className="network">
             <i className="fas fa-wifi"></i> You are Offline !
                </div>
             </Offline>
        
        <Footer/>
    </>;
}
