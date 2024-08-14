import { Accordion, } from "@components/ui/accordion";
import { Display } from "./display";
import { useCardStore } from "@src/hooks/useCardStore";
import { BackgroundController } from "./controller/background-controller";
import { FontController } from "./controller/font-controller";
import { ExportTab } from "./export-tab";
import { Button } from "@components/ui/button";
import { InputController } from "./controller/input-controller";
import { SaveAsTemplateButton } from "../save-as-template-button";
import { CardController } from "./controller/card-controller";

export const CardGenerator = () => {
    const resetAll = useCardStore((state) => state.resetAll);

    return (

        <div className="flex   mx-auto  w-full   md:py-5 px-0 md:px-6">
            <Display></Display>
            <div className="flex-1 min-w-[320px]  h-[578px] px-4 pb-4 overflow-auto  sm:block hidden ">
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
                </Accordion>
            </div>
        </div >
    )
}