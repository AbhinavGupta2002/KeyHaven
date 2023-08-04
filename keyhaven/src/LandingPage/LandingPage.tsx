import React, { useState } from "react";
import { Footer } from "../pattern-library/Footer";
import { AboutMe } from "./AboutMe";
import { FAQ } from "./FAQ";
import { Features } from "./Features";
import { Header } from "./Header";
import { Testimonial } from "./Testimonial";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    return (
        <>
            <Header navigate={navigate} isLoading={isLoading} setIsLoading={setIsLoading}/>
            {!isLoading ?
                <>
                    <Features/>
                    <Testimonial/>
                    <AboutMe/>
                    <FAQ/>
                    <Footer/>
                </>
                : <></>
            }
        </>
    );
}