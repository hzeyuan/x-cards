"use client"
import React, { useEffect } from "react"
import * as _ from 'lodash-es';
import Hero from "./components/hero";
import { CardGenerator } from "./components/card-generator";
import { cn } from "@lib/utils";
import gradientBottomSvg from '@assets/gradient-bottom.svg';

const HomePage = () => {

    return (
        <div className=" pb-14  w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">

            <div className="z-0 absolute w-80 h-60 bg-blue-400 blur-[80px] opacity-30 top-40 left-40"></div>
            <div className="z-0 absolute w-80 h-60 bg-purple-400 blur-[80px] opacity-30 top-40 right-40"></div>
            <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#d797e7] to-[#75a6f5] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                    }}
                />
            </div>

            <div
                style={{
                    background: `url('${gradientBottomSvg.src}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 100%',
                }}
                className={cn(
                    "absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
                    ` bg-no-repeat bg-cover bg-[50%_100%]`
                )}></div>
            <div className="  mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
                <div className="pt-8">
                    <Hero />
                </div>
                {/* <XForm></XForm> */}
                <div className="pt-12 ">
                    <CardGenerator></CardGenerator>
                </div>
            </div>
        </div>
    );
};

export default HomePage;