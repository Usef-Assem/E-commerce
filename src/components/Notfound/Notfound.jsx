import React from "react";
import style from './Notfound.module.css'
import img1 from '../../Assets/images/error.svg'
import { Helmet } from "react-helmet";

export default function notfound () {
    return <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
        </Helmet>
        <div className="d-flex justify-content-center align-items-center">
        <img src={img1} alt="" />
        </div>
    </>;
}
