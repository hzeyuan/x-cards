import { AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";

import { toPng, toJpeg, toSvg } from 'html-to-image';
import { Button } from "@components/ui/button";
import { useEffect } from "react";
import { useCardStore, type XConfig } from "@src/hooks/useCardStore";
import { exportImage } from "@src/app/utils";
export const ExportTab = () => {








    return (
        <AccordionItem value={'export'} className=" border  border-destructive ">
            <AccordionTrigger className="">Export </AccordionTrigger>
            <AccordionContent className=" ">
                <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                    <span className=" text-[13px]">image type</span>
                    <div className="mt-4 flex space-x-2">
                        <Button className="" size="sm" onClick={() => exportImage('png')}>As PNG</Button>
                        <Button size="sm" onClick={() => exportImage('jpeg')}>As JPEG</Button>
                        <Button size="sm" onClick={() => exportImage('svg')}>As SVG</Button>
                    </div>
                </label>

            </AccordionContent>
        </AccordionItem>
    )
}