import { cn } from "@lib/utils"
import gradientBottomSvg from '@assets/gradient-bottom.svg';
import introPng from '@assets/install_guide/intro.png';
import Image from 'next/image';
import XCardLogo from '@assets/icon.png';
import VideoSection from "@src/app/(app)/components/sections/video";

const WelcomePage = () => {
    return (<div className=" pb-14 min-h-[100vh]   w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
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
        <div className="  mx-auto w-full max-w-7xl px-6 md:px-8">
            <div className="pt-8">

                <div className='flex flex-col opacity-100 gap-y-8 justify-center'>

                    <div className="w-full flex  justify-center">
                        <img
                            src={XCardLogo.src}
                            alt=""
                            className=" h-[64px] w-[64px]"
                        />
                    </div>


                    <div className="relative mx-auto flex  flex-col items-center">
                        <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl mb-10">
                            Welcome to X cards  {' '}
                        </h2>
                        <div className="w-full   pb-10 flex gap-x-10">
                            <div>
                                <div className="relative z-20 pt-10   mx-auto">
                                    <h4 className="text-2xl lg:text-3xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
                                        Now Open x.com,and Generate Cards immediately
                                    </h4>

                                </div>



                                <div className=" py-10">
                                    <Image src={introPng.src} width={768} height={440} alt="xcards intro"></Image>
                                </div>
                                <div className="flex flex-col justify-start space-y-12 text-center ">

                                    <div>
                                        <div style={{ opacity: 1, willChange: "auto", transform: "none" }}>
                                            <span className=" bg-[aquamarine] hover:shadow-xl hover:opacity-80  border  cursor-pointer rounded-lg px-2 py-1 text-5xl font-bold text-black dark:text-white">
                                                Enjoy!!
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <VideoSection />

                        </div>


                        <div className="flex items-center">
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/hzeyuan/x-cards"
                            >
                                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                                    <svg viewBox="0 0 438.549 438.549" className="h-4 w-4">
                                        <path
                                            fill="currentColor"
                                            d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                                        />
                                    </svg>
                                    <span className="sr-only">GitHub</span>
                                </div>
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://x.com/FeigelC35583">
                                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">
                                    <svg
                                        className="h-3 w-3 fill-current"
                                        height={23}
                                        viewBox="0 0 1200 1227"
                                        width={23}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                                    </svg>
                                    <span className="sr-only">Twitter</span>
                                </div>
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://discord.gg/ZwcKez9E">
                                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 w-9 px-0">

                                    <svg
                                        className="icon"
                                        viewBox="0 0 1024 1024"
                                        xmlns="http://www.w3.org/2000/svg"
                                        height={23}
                                        width={23}
                                    >
                                        <path d="M0 512a512 512 0 101024 0A512 512 0 100 512z" fill="#738BD8" />
                                        <path d="M190.915 234.305h642.169v477.288H190.915z" fill="#FFF" />
                                        <path
                                            d="M698.157 932.274L157.288 862.85c-58.43-7.5-55.4-191.167-50.26-249.853l26.034-297.22c5.14-58.686 74.356-120.22 132.7-128.362l466.441-65.085c58.346-8.14 177.24 212.65 176.09 271.548l-8.677 445.108M512 300.373c-114.347 0-194.56 49.067-194.56 49.067 43.947-39.253 120.747-61.867 120.747-61.867l-7.254-7.253c-72.106 1.28-137.386 51.2-137.386 51.2-73.387 153.173-68.694 285.44-68.694 285.44 59.734 77.227 148.48 71.68 148.48 71.68l30.294-38.4c-53.334-11.52-87.04-58.88-87.04-58.88S396.8 645.973 512 645.973c115.2 0 195.413-54.613 195.413-54.613s-33.706 47.36-87.04 58.88l30.294 38.4s88.746 5.547 148.48-71.68c0 0 4.693-132.267-68.694-285.44 0 0-65.28-49.92-137.386-51.2l-7.254 7.253s76.8 22.614 120.747 61.867c0 0-80.213-49.067-194.56-49.067M423.68 462.08c27.733 0 50.347 24.32 49.92 54.187 0 29.44-22.187 54.186-49.92 54.186-27.307 0-49.493-24.746-49.493-54.186 0-29.867 21.76-54.187 49.493-54.187m177.92 0c27.733 0 49.92 24.32 49.92 54.187 0 29.44-22.187 54.186-49.92 54.186-27.307 0-49.493-24.746-49.493-54.186 0-29.867 21.76-54.187 49.493-54.187z"
                                            fill="#738BD8"
                                        />
                                    </svg>
                                    <span className="sr-only">Discord</span>
                                </div>
                            </a>
                        </div>

                    </div>
                    {/* <VideoSection /> */}
                    {/* <FeaturesSection></FeaturesSection> */}
                </div>
            </div>
        </div>
    </div>)
}
export default WelcomePage;