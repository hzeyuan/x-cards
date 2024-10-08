
import chromeSvg from '@assets/chrome.svg';
import Image from "next/image";

const Hero = () => {
    return (
        <>
            <div className='flex flex-col gap-y-8 justify-center'>
                <div className="relative mx-auto flex max-w-2xl flex-col items-center">
                    <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl">
                        X Cards  {' '}
                        <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
                            Native Tweet Card service for X
                        </span>
                    </h2>
                    <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200">
                        Capture and share posts as beautiful images, cards, Markdown, or JSON, making sharing Twitter posts on other platforms more visual and attention-grabbing.
                        {' '}
                    </p>
                    <div className="mt-10 flex gap-4">
                        <a target="_blank" href="https://chromewebstore.google.com/detail/x-card/mbinooofmcjhjklihfejnkkebffceeop"
                            className="p-[3px] relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8F01FF] to-[#FDB83B] rounded-lg" />
                            <div className="px-8 py-2  group-hover:scale-105  flex  gap-x-3   rounded-[6px]  relative group transition duration-200 text-white ">
                                <Image src={chromeSvg} alt="Chrome Extension" className="w-6 h-6" />
                                Download Extension
                            </div>

                        </a>

                    </div>
                    <a
                        className='mt-10'
                        href="https://www.producthunt.com/posts/x-cards?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-x-cards"
                        target="_blank"
                    >
                        <img
                            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=481821&theme=light"
                            alt="X Cards - Simple, Beautiful Tweets with Card Integration on X.com | Product Hunt"
                            style={{ width: 250, height: 54 }}
                            width={250}
                            height={54}
                        />
                    </a>
                </div>
                {/* <VideoSection /> */}

            </div>

        </>

    )
}

export default Hero


