import React from "react";
import { Footer } from "../pattern-library/Footer";
import { AboutMe } from "./AboutMe";
import { FAQ } from "./FAQ";
import { Features } from "./Features";
import { Header } from "./Header";
import { Testimonial } from "./Testimonial";

export const LandingPage = () => {
    return (
        <>
            <Header/>
            <Features/>
            <Testimonial/>
            <AboutMe/>
            <FAQ/>
            <Footer/>
        </>
    );
}