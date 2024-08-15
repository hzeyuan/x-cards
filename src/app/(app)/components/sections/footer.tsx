import Link from "next/link";
import Logo from "@assets/icon.png";

export const FooterSection = () => {
    return (
        <footer id="footer" className="container py-24 sm:py-32">
            <div className="p-10 bg-card border border-secondary rounded-2xl">
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
                    <div className="col-span-full xl:col-span-2">
                        <Link href="#" className="flex font-bold items-center">
                            {/* <ChevronsDownIcon className="w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" /> */}
                            <img className="w-9 h-9 mr-2 " src={Logo.src} alt="xcards" ></img>
                            <h3 className="text-2xl">X Cards</h3>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Contact</h3>
                        <div>
                            <Link href="https://github.com/hzeyuan/x-cards" className="opacity-60 hover:opacity-100">
                                Github
                            </Link>
                        </div>

                        <div>
                            <Link href="https://x.com/FeigelC35583" className="opacity-60 hover:opacity-100">
                                Twitter
                            </Link>
                        </div>
                    </div>



                    <div className="flex flex-col gap-2">
                        <h3 className="font-bold text-lg">Socials</h3>

                        <div>
                            <Link href="https://discord.gg/Prjas7Qh" className="opacity-60 hover:opacity-100">
                                Discord
                            </Link>
                        </div>
                    </div>
                </div>

                {/* <Separator className="my-6" /> */}
                <section className="">
                    <h3 className="">
                        &copy; 2024 Designed and developed by
                        <Link
                            target="_blank"
                            href="https://x.com/FeigelC35583"
                            className="text-primary transition-all border-primary hover:border-b-2 ml-1"
                        >
                            Zane Ryan
                        </Link>
                    </h3>
                </section>
            </div>
        </footer>
    );
};