// import Index from "./components";

export async function generateStaticParams() {
    return [{ slug: 'independent' }]
}

import dynamic from 'next/dynamic'

const Index = dynamic(() => import('./components'), {
    ssr: false,
});


const Page = () => {
    return (
        <div className="relative h-full w-full bg-white">
            <div className="pt-12 ">
                <Index></Index>
            </div>
        </div>
    );
}

export default Page;