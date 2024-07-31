import { cn } from "@lib/utils";
import { ColorChangeHandler, SketchPicker } from "react-color";
import ResultIcon from "../ResultIcon";

import { AccordionContent, AccordionTrigger, AccordionItem } from "@components/ui/accordion";
import { useCardStore } from "@src/hooks/useCardStore";
import { ColorPicker } from "@components/ui/color-picker";

export const presets: PresetType[] = [
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#FF7DB4",
        backgroundEndColor: "#654EA3",
        backgroundAngle: 45,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#8E2DE2",
        backgroundEndColor: "#4A00E0",
        backgroundAngle: 45,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#99F2C8",
        backgroundEndColor: "#1F4037",
        backgroundAngle: 45,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#F953C6",
        backgroundEndColor: "#B91D73",
        backgroundAngle: 45,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#91EAE4",
        backgroundEndColor: "#7F7FD5",
        backgroundAngle: 45,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#F5AF19",
        backgroundEndColor: "#F12711",
        backgroundAngle: 45,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#EAAFC8",
        backgroundEndColor: "#EC2F4B",
        backgroundAngle: 45,
    },

    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#00B4DB",
        backgroundEndColor: "#003357",
        backgroundAngle: 45,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#A8C0FF",
        backgroundEndColor: "#3F2B96",
        backgroundAngle: 90,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#DD1818",
        backgroundEndColor: "#380202",
        backgroundAngle: 135,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#DECBA4",
        backgroundEndColor: "#3E5151",
        backgroundAngle: 45,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#FC466B",
        backgroundEndColor: "#3F5EFB",
        backgroundAngle: 180,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#CCCFE2",
        backgroundEndColor: "#25242B",
        backgroundAngle: 180,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#68AEFF",
        backgroundEndColor: "#003EB7",
        backgroundAngle: 180,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#C9D6FF",
        backgroundEndColor: "#596AA1",
        backgroundAngle: 180,
    },
    {
        backgroundFillType: "Linear",
        backgroundStartColor: "#5C5C5C",
        backgroundEndColor: "#0F1015",
        backgroundAngle: 180,
    },
    {
        backgroundFillType: "Radial",
        backgroundStartColor: "#695BF8",
        backgroundEndColor: "#131308",
        backgroundPosition: "50%,0%",
    },
    {
        backgroundFillType: "Radial",
        backgroundStartColor: "#4d4d4d",
        backgroundEndColor: "#000000",
        backgroundPosition: "50%,0%",
    },
    {
        backgroundFillType: "Radial",
        backgroundStartColor: "#f5af19",
        backgroundEndColor: "#f12711",
        backgroundPosition: "50%,50%",
    },
    {
        backgroundFillType: "Radial",
        backgroundStartColor: "#1D6E47",
        backgroundEndColor: "#041B11",
        backgroundPosition: "50%,0%",
    },
    {
        backgroundFillType: "Radial",
        backgroundStartColor: "#ffffff",
        backgroundEndColor: "#666666",
        backgroundPosition: "50%,100%",
    },
    {
        backgroundFillType: "Radial",
        backgroundStartColor: "#d9f1f8",
        backgroundEndColor: "#002069",
        backgroundPosition: "50%,100%",
    },
    {
        backgroundFillType: "Radial",
        backgroundStartColor: "#f95356",
        backgroundEndColor: "#7e0000",
        backgroundPosition: "50%,50%",
    },
    {
        backgroundFillType: "Radial",
        backgroundStartColor: "#ffbb00",
        backgroundEndColor: "#ffe74b",
        backgroundPosition: "50%,0%",
    },
];

type ColorInputPropTypes = {
    value: string;
    name: string;
    recentColors: string[];
    onChange: ColorChangeHandler;
    disabled?: boolean;
};


export const ColorSelect = () => {

    const colorIndex = useCardStore(state => state.colorIndex);
    const setColorIndex = useCardStore(state => state.setColorIndex);
    const updateCardStyles = useCardStore((state) => state.updateCardStyles);
    // const filStyles = useCardStore(state => state.filStyles);


    return (
        <div className={cn('flex flex-wrap gap-4 px-2 py-2')}>

            {presets.map((preset, index) => {
                return (
                    <label key={index}
                        className={cn(
                            'relative overflow-hidden w-5 h-5 shrink-0 rounded-[5px] ',
                            colorIndex === index ? "dark:ring-primary-500 dark:ring-opacity-100 dark:ring-2 dark:ring-offset-2 dark:ring-offset-gray-700 ring-primary-500 ring-2 ring-offset-2 ring-offset-white  inline-flex  active:scale-95 transition  " : ""

                        )}
                    >
                        <input
                            className={cn(
                                "absolute w-full h-full appearance-none opacity-0 inset-0 cursor-pointer",
                            )}
                            type="radio"
                            name="preset"
                            value={index}
                            checked={colorIndex === index}
                            onChange={() => {
                                setColorIndex(index);
                            }}
                        />

                        <ResultIcon size={20} isPreview settings={{ ...preset, backgroundRadius: 0 }} />
                    </label>
                );
            })}
            {/* <ColorPicker className=" w-[20px] h-[20px]" value={cardStyles.borderColor}
                onChange={(v) => {
                    updateCardStyles({
                        borderColor: v,
                    });
                }}
            ></ColorPicker> */}
        </div>

    )
}