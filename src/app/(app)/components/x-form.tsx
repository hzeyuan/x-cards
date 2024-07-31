import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useCardStore, type XConfig } from "@src/hooks/useCardStore";
import { useState } from "react";

interface XFormProps {
}

export const XForm = (props: XFormProps) => {

    const [url, setUrl] = useState<string>('');
    const setXconfig = useCardStore(state => state.setXConfig);
    const handleGetX = async (url: string) => {
        const res = await fetch(`/api/x?url=${url}`, {
            method: 'GET',
        })
        const data = await res.json();
        console.log('res', res);
        setXconfig({
            ...data.data,
            images: [data.data.imageUrl]
        } as XConfig)
    }



    return (
        <div className="flex w-full  pt-8 items-center space-x-2">
            <Input onChange={(e) => {
                setUrl(e.target.value);
            }} value={url} type="url" placeholder="input X url" />
            <Button type="submit" onClick={() => {
                handleGetX(url);
            }}>Get Tweet →</Button>
        </div>
    )
}