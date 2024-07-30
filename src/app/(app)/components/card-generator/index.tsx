import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { Display } from "./display";
import { useCardStore } from "@src/hooks/useCardStore";
import { Slider } from "@components/ui/slider";
import { ColorPicker } from "@components/ui/color-picker";
import { BackgroundController } from "./controller/card-controller";
import { FontController } from "./controller/font-controller";
import { ExportTab } from "./export-tab";
import { Button } from "@components/ui/button";
import { InputController } from "./controller/input-controller";
import { TemplateList } from "../template-list";
import { SaveAsTemplateButton } from "../save-as-template-button";

export const CardGenerator = () => {

    const cardStyles = useCardStore((state) => state.cardStyles);
    const backgroundStyles = useCardStore((state) => state.backgroundStyles);
    console.log('backgroundStyles', backgroundStyles);
    const updateCardStyles = useCardStore((state) => state.updateCardStyles);
    const resetAll = useCardStore((state) => state.resetAll);

    return (

        <div className="flex flex-col  mx-auto  w-full  px-4 md:px-6  md:py-5 px-0 md:px-6"
            style={{
                maxWidth: "1280px"
            }}
        >
            <div>
                <TemplateList></TemplateList>
            </div>
            <div
                className="w-full mx-auto grid lg:grid-cols-[1fr_320px] relative mt-0"

            >
                <Display></Display>
                <div className="w-[320px] h-[578px] px-4 pb-4 overflow-auto  sm:block hidden ">
                    <div className="py-2 flex gap-x-2">
                        <Button onClick={() => resetAll()} size="sm" variant="secondary">Reset</Button>
                        <SaveAsTemplateButton></SaveAsTemplateButton>

                    </div>
                    <Accordion type="multiple" className="w-full">
                        <ExportTab></ExportTab>
                        <InputController></InputController>
                        <BackgroundController></BackgroundController>

                        {/* <AccordionItem value={'frames'}>
                        <AccordionTrigger>Frames</AccordionTrigger>
                        <AccordionContent>
                            <div className="py-2">
                                <div className=" max-w-xl  rounded-xl  flex flex-col">
                                    <div className="max-h-96 overflow-y-auto">
                                        <div className="  grid  grid-cols-3 gap-4  items-center p-4">
                                            <button
                                                name="None"
                                                className="flex flex-col gap-1 justify-center items-center w-10 outline-none text-gray  transition-all ease-in-out active:scale-95 "
                                            >
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth={0}
                                                    viewBox="0 0 16 16"
                                                    className="w-10 h-10"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M2.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM4 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
                                                    <path d="M0 4a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v4a.5.5 0 0 1-1 0V7H1v5a1 1 0 0 0 1 1h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-2V4Zm1 2h13V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2Z" />
                                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-4.854-1.354a.5.5 0 0 0 0 .708l.647.646-.647.646a.5.5 0 0 0 .708.708l.646-.647.646.647a.5.5 0 0 0 .708-.708l-.647-.646.647-.646a.5.5 0 0 0-.708-.708l-.646.647-.646-.647a.5.5 0 0 0-.708 0Z" />
                                                </svg>
                                                <span className="text-sm">None</span>
                                            </button>
                                            <button
                                                name="MacOS"
                                                className="flex flex-col gap-1 justify-center items-center w-10 outline-none text-gray  transition-all ease-in-out active:scale-95 "
                                            >
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth={0}
                                                    viewBox="0 0 16 16"
                                                    className="w-10 h-10"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                                                </svg>
                                                <span className="text-sm">MacOS</span>
                                            </button>
                                            <button
                                                name="Windows"
                                                className="flex flex-col gap-1 justify-center items-center w-10 outline-none text-gray  transition-all ease-in-out active:scale-95 "
                                            >
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth={0}
                                                    viewBox="0 0 16 16"
                                                    className="w-10 h-10"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16V0z" />
                                                </svg>
                                                <span className="text-sm">Windows</span>
                                            </button>
                                            <button
                                                name="Fimojis"
                                                className="flex flex-col gap-1 justify-center items-center w-10 outline-none text-gray  transition-all ease-in-out active:scale-95 "
                                            >
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth={0}
                                                    viewBox="0 0 16 16"
                                                    className="w-10 h-10"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z" />
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z" />
                                                </svg>
                                                <span className="text-sm">Fimojis</span>
                                            </button>
                                            <button
                                                name="Emojis"
                                                className="flex flex-col gap-1 justify-center items-center w-10 outline-none text-gray  transition-all ease-in-out active:scale-95 "
                                            >
                                                <svg
                                                    stroke="currentColor"
                                                    fill="currentColor"
                                                    strokeWidth={0}
                                                    viewBox="0 0 16 16"
                                                    className="w-10 h-10"
                                                    height="1em"
                                                    width="1em"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                                                </svg>
                                                <span className="text-sm">Emojis</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </AccordionContent>
                    </AccordionItem> */}

                        <AccordionItem value={'card'}>
                            <AccordionTrigger>Card</AccordionTrigger>
                            <AccordionContent className="">

                                <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                                    <span className=" text-[13px]">Width</span>
                                    <div className=" w-full">
                                        <Slider step={1}
                                            value={[cardStyles.width]}
                                            max={1048}
                                            min={379}
                                            onValueChange={(v) => {
                                                console.log('v', v);
                                                updateCardStyles({
                                                    width: v[0],
                                                });
                                            }}

                                        ></Slider>
                                    </div>
                                </label>

                                <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                                    <span className=" text-[13px]"> Scale</span>
                                    <div className=" w-full">
                                        <Slider step={1}
                                            value={[cardStyles.scale]}
                                            max={150}
                                            min={1}
                                            onValueChange={(v) => {
                                                console.log('v', v);
                                                updateCardStyles({
                                                    scale: v[0],
                                                });
                                            }}

                                        ></Slider>
                                    </div>
                                </label>


                                <label className="flex min-h-[40px] flex-row items-center justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                                    <span className="grow-[2] text-[13px]">Border Width</span>
                                    <div className=" w-full">
                                        <Slider step={1}
                                            value={[cardStyles.borderWidth]}
                                            max={10}
                                            min={0}
                                            onValueChange={(v) => {
                                                updateCardStyles({
                                                    borderWidth: v[0],
                                                });
                                            }}

                                        ></Slider>
                                    </div>
                                </label>
                                <label className="flex min-h-[40px] flex-row items-center justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                                    <span className="grow-[2] text-[13px]">Border Color</span>
                                    <ColorPicker className=" w-[20px] h-[20px]" value={cardStyles.borderColor}
                                        onChange={(v) => {
                                            updateCardStyles({
                                                borderColor: v,
                                            });
                                        }}
                                    ></ColorPicker>
                                </label>
                                <label className="flex min-h-[40px] flex-row items-center justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                                    <span className="grow-[2] text-[13px]">Border Radius</span>
                                    <Slider step={1}
                                        value={[cardStyles.borderRadius]}
                                        min={0}
                                        onValueChange={(v) => {
                                            updateCardStyles({
                                                borderRadius: v[0],
                                            });
                                        }}

                                    ></Slider>
                                </label>
                            </AccordionContent>
                        </AccordionItem>
                        <FontController></FontController>
                        {/* <AccordionItem value={'border'}>
                        <AccordionTrigger>Border</AccordionTrigger>
                        <AccordionContent className="">
                            <label className="flex min-h-[40px] flex-row items-center justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                                <span className="grow-[2] text-[13px]">Border Color</span>
                                <ColorPicker value={cardStyles.borderColor}
                                    onChange={(v) => {
                                        updateCardStyles({
                                            borderColor: v,
                                        });
                                    }}
                                ></ColorPicker>
                            </label>
                            <label className="flex min-h-[40px] flex-row items-center justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                                <span className="grow-[2] text-[13px]">Border Radius</span>
                                <Slider step={1}
                                    value={[cardStyles.borderRadius]}
                                    max={10}
                                    min={0}
                                    onValueChange={(v) => {
                                        updateCardStyles({
                                            borderRadius: v[0],
                                        });
                                    }}

                                ></Slider>
                            </label>
                        </AccordionContent>
                    </AccordionItem> */}
                    </Accordion>
                </div>
            </div>
        </div >







    )
}