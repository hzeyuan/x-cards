// import { Tabs } from "@src/components/ui/acetenity-tabs";
import { requestTestConnection } from "@src/app/(app)/request";
import { useEffect, useState } from "react";
export const ApiKeyPanel = () => {

    const [apiKey, setApiKey] = useState('');
    const [apiBaseUrl, setApiBaseUrl] = useState('https://api.openai.com/v1');

    useEffect(() => {
        const storedApiKey = localStorage.getItem('apikey');
        if (storedApiKey) {
            setApiKey(storedApiKey.trim());
        }

        const storedApiBaseUrl = localStorage.getItem('apiBaseUrl');
        if (storedApiBaseUrl) {
            setApiBaseUrl(storedApiBaseUrl);
        } else {
            localStorage.setItem('apiBaseUrl', apiBaseUrl.trim());
        }
    }, []);

    const handleTestConnection = async () => {
        const result = await requestTestConnection({
            apiKey,
            apiBaseUrl
        })
        if (result) {
            alert('Connection Successful')
        } else {
            alert('Connection Failed')
        }
    }


    return (
        <div className="py-8 group">
            <div className="rounded-xl border bg-card text-card-foreground shadow  lg:py-4 relative">
                <div className="p-6 pt-0 flex flex-col w-full gap-8 relative md:items-center">
                    <div className="md:text-center space-y-3 pt-4">
                        <h3 className=" flex items-center justify-center  gap-x-2 text-4xl md:text-6xl tracking-tighter font-extrabold text-neutral-900">
                            <svg
                                width={41}
                                height={41}
                                viewBox="0 0 41 41"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 max-sm:mb-48 max-xs:mb-60"
                            >
                                <text x={-9999} y={-9999}>
                                    {"ChatGPT"}
                                </text>
                                <path
                                    d="M37.532 16.87a9.963 9.963 0 00-.856-8.184 10.078 10.078 0 00-10.855-4.835A9.964 9.964 0 0018.306.5a10.079 10.079 0 00-9.614 6.977 9.967 9.967 0 00-6.664 4.834 10.08 10.08 0 001.24 11.817 9.965 9.965 0 00.856 8.185 10.079 10.079 0 0010.855 4.835 9.965 9.965 0 007.516 3.35 10.078 10.078 0 009.617-6.981 9.967 9.967 0 006.663-4.834 10.079 10.079 0 00-1.243-11.813zM22.498 37.886a7.474 7.474 0 01-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 00.655-1.134V19.054l3.366 1.944a.12.12 0 01.066.092v9.299a7.505 7.505 0 01-7.49 7.496zM6.392 31.006a7.471 7.471 0 01-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 001.308 0l9.724-5.614v3.888a.12.12 0 01-.048.103l-8.051 4.649a7.504 7.504 0 01-10.24-2.744zM4.297 13.62A7.469 7.469 0 018.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 00.654 1.132l9.723 5.614-3.366 1.944a.12.12 0 01-.114.01L7.04 23.856a7.504 7.504 0 01-2.743-10.237zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 01.113-.01l8.052 4.648a7.498 7.498 0 01-1.158 13.528v-9.476a1.293 1.293 0 00-.65-1.132zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 00-1.308 0l-9.723 5.614v-3.888a.12.12 0 01.048-.103l8.05-4.645a7.497 7.497 0 0111.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 01-.065-.092v-9.299a7.497 7.497 0 0112.293-5.756 6.94 6.94 0 00-.236.134l-7.965 4.6a1.294 1.294 0 00-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v5l-4.331 2.5-4.331-2.5V18z"
                                    fill="currentColor"
                                />
                            </svg>
                            Setting Your OpenAI
                            <span className='w-2'></span>
                            KEY
                        </h3>
                        <ul>
                            <li className='text-lg pb-3 tracking-tight text-neutral-800 text-pretty max-w-xl leading-5'>You also use your own apikey, we won't save any of your data</li>
                        </ul>
                        <div className='flex flex-col gap-y-1 items-start'>
                            <label>API BASE URL</label>
                            <input
                                placeholder='https://api.openai.com'
                                defaultValue={apiBaseUrl}
                                onChange={(e) => {
                                    localStorage.setItem('apiBaseUrl', e.target.value);
                                    setApiBaseUrl(e.target.value);
                                }}
                                className=' border  border-border flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400'
                            />
                        </div>
                        <div className='flex flex-col gap-y-1 items-start'>
                            <label>
                                <span>API KEY</span>
                            </label>
                            <input
                                type="password"
                                placeholder="sk-your api key"
                                onChange={(e) => {
                                    console.log('e.target.value', e.target.value);
                                    localStorage.setItem('apikey', e.target.value);
                                    setApiKey(e.target.value)
                                }}
                                defaultValue={apiKey}
                                // value={apikey}
                                className='flex border  border-border h-10 w-full  bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] group-hover/input:shadow-none transition duration-400'
                            />
                        </div>

                        <div className="flex items-center gap-[2px]  justify-center bg-black/80 rounded-sm cursor-pointer">
                            <p onClick={handleTestConnection} className="text-white pl-2 py-2">Connect Test</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-arrow-up-right text-white/80 group-hover:w-6 group-hover:h-6 group-hover:rotate-45 transition-all duration-100 ease-in-out"
                            >
                                <path d="M7 7h10v10" />
                                <path d="M7 17 17 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}