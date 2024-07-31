"use client"
import { useRouter } from 'next/navigation';
const Hero = () => {

    return (
        <>
            <div className="relative mx-auto flex max-w-2xl flex-col items-center">
                <h2 className="text-center text-3xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl">
                    X {' '}
                    <span className="animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
                        Cards
                    </span>
                </h2>
                <p className="mt-6 text-center text-lg leading-6 text-gray-600 dark:text-gray-200">
                    Capture and share Twitter posts as beautiful images.  makes sharing Twitter posts on other platforms more visual and attention-grabbing.
                    {' '}
                </p>
                {/* <div className="mt-10 flex gap-4">
                    <a
                        href="https://github.com/ibelick/background-snippets"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                    >
                        <Button>
                            Go to GitHub <ArrowRight className="pl-0.5" size={16} />
                        </Button>{' '}
                    </a>
                </div> */}
            </div>
        </>
    )
}

export default Hero