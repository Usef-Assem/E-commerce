import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import style from './Home.module.css'
import { useQuery } from "react-query";
import { BallTriangle } from "react-loader-spinner";
import Products from "../Products/Products";
import { Helmet } from "react-helmet";
import MainSlider from "../mainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
export default function Home () {
    
    return <>
                <Helmet>
                <meta charSet="utf-8" />
                <title>Fresh Cart Home</title>
                </Helmet>

                <MainSlider/>
                <CategorySlider/>
                <Products/>
    </>
}

