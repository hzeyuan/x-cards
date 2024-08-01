import Index from "./components";

export async function generateStaticParams() {
    return [{ slug: 'independent' }]
}

const Page = () => {

    return (
        <div className="relative h-full w-full bg-white">
            {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div> */}
            <div className="pt-12 ">
                <Index></Index>
            </div>
        </div>
    );
}

export default Page;