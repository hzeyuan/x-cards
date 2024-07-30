import { AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { Slider } from "@components/ui/slider";
import { useCardStore } from "@src/hooks/useCardStore";
import GoogleFontSelector from "../../GoogleFontSelector";

interface FontControllerProps {

}

const googleFonts = [
    { name: 'Default', value: 'sans-serif' },
    { name: 'Roboto', value: "'Roboto', sans-serif" },
    { name: 'Open Sans', value: "'Open Sans', sans-serif" },
    { name: 'Lato', value: "'Lato', sans-serif" },
    { name: 'Montserrat', value: "'Montserrat', sans-serif" },
    { name: 'Noto Sans SC', value: "'Noto Sans SC', sans-serif" }, // 中文字体
];

export const FontController = (props: FontControllerProps) => {
    const updateCardStyles = useCardStore((state) => state.updateCardStyles);
    const cardStyles = useCardStore((state) => state.cardStyles);
    return (
        <AccordionItem value={'Font'}>
            <AccordionTrigger>Font</AccordionTrigger>
            <AccordionContent className="">
                <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                    <span className=" text-[13px]">font-size</span>
                    <div className=" w-full">
                        <Slider step={0.5}
                            value={[cardStyles.fontSize]}
                            max={24}
                            min={12}
                            onValueChange={(v) => {
                                updateCardStyles({
                                    fontSize: v[0],
                                });
                            }}
                        ></Slider>
                    </div>
                </label>
                <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                    <span className=" text-[13px]">Select Font</span>
                    <div className=" w-full">
                        <GoogleFontSelector></GoogleFontSelector>
                    </div>
                </label>

            </AccordionContent>
        </AccordionItem>
    )
}