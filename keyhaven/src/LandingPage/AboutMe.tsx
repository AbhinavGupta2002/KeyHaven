import React from "react";
import headshot from '../img/headshot.jpg'

// icon imports
import {BsLinkedin, BsGithub} from 'react-icons/bs'
import {SiDevpost} from 'react-icons/si'

export const AboutMe = () => {
    return (
        <div className="flex bg-gray-100 justify-center px-4">
            <div className="flex p-20 gap-10 bg-gray-200 mb-20 rounded-xl shadow-xl border border-default1 align-middle justify-between">
                <div className="grid grid-cols-1 items-center place-items-center lg:place-items-start">
                    <h3 className="text-xl sm:text-2xl font-bold mb-8 w-fit text-center lg:text-start">Developed by Abhinav Gupta</h3>
                    <img className="aspect-square w-64 sm:w-80 rounded-lg object-cover lg:hidden mb-14" src={headshot}/>
                    <div className="w-md xs:w-custom12 xl:w-custom1 text-center lg:text-start xs:text-lg">I am a student studying Honours Computer Science at the University of Waterloo who is highly interested in the world of full-stack web development. I am constantly learning new technologies and applying them to my startup and projects - KeyHaven is one such project that arose from such a passion where I learned how to build a platform that is of the highest security! The constant desire to build and engineer something is what has enabled me grow rapidly in my career.</div>
                    <div className="flex gap-5 text-2xl text-default1 mt-12">
                        <a href="https://www.linkedin.com/in/abhinavgupta2002/"><BsLinkedin className="cursor-pointer hover:text-blue-800"/></a>
                        <a href="https://github.com/AbhinavGupta2002"><BsGithub className="cursor-pointer hover:text-blue-800"/></a>
                        <a href="https://devpost.com/AbhinavGupta2002"><SiDevpost className="cursor-pointer hover:text-blue-800"/></a>
                    </div>
                </div>
                <div className="hidden lg:block"><img className="aspect-square w-80 rounded-lg object-cover" src={headshot}/></div>
            </div>
        </div>
    )
}