import React from "react";
import style from './Footer.module.css'
import img1 from '../../Assets/images/MasterCard_Logo.svg.webp'
import img2 from '../../Assets/images/PayPal-Logo.png'
import img3 from '../../Assets/images/American-Express-Logo-PNG-Image.png'
import img4 from '../../Assets/images/Amazon_Pay-Logo.wine.png'
export default function footer () {
    return <>
        <div className="container py-5">
        <div className="Footer bg-main-light w-100 p-5">
            <h3 className="">Get the Fresh Cart App</h3>
            <p>We will send you a link, open it in your phone to download the app</p>
            <div className="d-flex justify-content-evenly align-items-center">
            <div className="col-md-9 col-sm-8">
            <input className="input-width form-control" type="email" placeholder="Email..." />
            </div>
            <div className="col-md-2 col-sm-4">
            <button className="btn w-100 fs-6 bg-main text-white">Share App Link</button>
            </div>
            </div>
            <hr />
            <div className="d-flex align-items-center">
            <h4 className="h5 fw-bolder">payment Partners</h4>
            <div className=" col-sm-6 col-md-3 d-flex mx-2 justify-content-between align-items-center ">
                <div className="w-25 mx-2">
                <img className="w-100" src={img4} alt="" />
                </div>
                <div className="w-25 mx-2">
                <img className="w-100" src={img2} alt="" />
                </div>
                <div className="w-25 mx-2">
                <img className="w-100" src={img3} alt="" />
                </div>
                <div className="w-25 mx-2">
                <img className="w-100" src={img1} alt="" />
                </div>
            </div>
            </div>
            <hr />
            
        </div>
        </div>
    </>;
}
