import { AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";

import { Button } from "@components/ui/button";
import { copyImage, generateImage } from "@src/app/utils";
import { exportImage } from "@src/app/utils/export";
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
                    {/* <Button size="sm" onClick={async () => {
                            try {
                                const imageDataUrl = await generateImage({
                                    format: 'png',
                                });
                                // Extract MIME type and base64 data from the data URL
                                const [, mimeType, base64Data] = imageDataUrl.match(/^data:(.+);base64,(.+)$/);

                                // Convert base64 to Blob more efficiently
                                const blob = await fetch(imageDataUrl).then(res => res.blob());

                                // Copy to clipboard
                                await navigator.clipboard.write([
                                    new ClipboardItem({
                                        [mimeType]: blob
                                    })
                                ]);

                                console.log('Image copied to clipboard successfully');
                                return imageDataUrl;
                            } catch (err) {
                                console.error('Failed to copy image:', err);
                            }
                        }}>Copy Png</Button> */}
                </label>

            </AccordionContent>
        </AccordionItem>
    )
}