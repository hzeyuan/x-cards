import { Accordion, } from "@components/ui/accordion";
import { Display } from "./display";
import { useCardStore } from "@src/hooks/useCardStore";
import { BackgroundController } from "./controller/background-controller";
import { FontController } from "./controller/font-controller";
import { ExportTab } from "./export-tab";
import { Button } from "@components/ui/button";
import { InputController } from "./controller/input-controller";
import { TemplateList } from "../template-list";
import { SaveAsTemplateButton } from "../save-as-template-button";
import { CardController } from "./controller/card-controller";

export const CardGenerator = () => {

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
                <div className="w-[320px]  h-[578px] px-4 pb-4 overflow-auto  sm:block hidden ">
                    <div className="py-2 flex gap-x-2">
                        <Button onClick={() => resetAll()} size="sm" variant="secondary">Reset</Button>
                        <SaveAsTemplateButton></SaveAsTemplateButton>

                    </div>
                    <Accordion type="multiple" className="w-full">
                        <ExportTab></ExportTab>
                        <InputController></InputController>
                        <BackgroundController></BackgroundController>

                        <CardController></CardController>
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