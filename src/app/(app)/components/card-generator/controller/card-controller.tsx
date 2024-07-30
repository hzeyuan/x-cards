import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { ColorPicker } from "@components/ui/color-picker";
import { ColorSelect } from "../color";
import { Switch } from "@components/ui/switch";
import { useCardStore } from "@src/hooks/useCardStore";
import { Slider } from "@components/ui/slider";
import { Input } from "@components/ui/input";
import { Select } from "@components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

export const BackgroundController = (props) => {

    const tabConfig = useCardStore((state) => state.tabConfig);
    const setTabConfig = useCardStore((state) => state.setTabConfig);
    const backgroundStyles = useCardStore((state) => state.backgroundStyles);
    const updateBackgroundStyles = useCardStore((state) => state.updateBackgroundStyles);


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => updateBackgroundStyles({
                backgroundImage: e.target.result as string,
            })
            reader.readAsDataURL(file);
        }
    };

    return (
        <AccordionItem value={'background'}>
            <AccordionTrigger>Background</AccordionTrigger>
            <AccordionContent>
                {/* preset color */}
                <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                    <span className=" text-[13px]">Preset Color</span>
                    <div className=" w-full">
                        <ColorSelect></ColorSelect>
                    </div>
                </label>
                {/* custom Color */}
                <div>
                    <label className="flex min-h-[40px] flex-row items-center justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                        <span className="grow-[2] text-[13px]">Custom Color</span>
                        <div className="inline-flex">
                            <Switch checked={tabConfig.openCustomColor}
                                onCheckedChange={v => setTabConfig({ openCustomColor: v })}
                            />
                        </div>
                    </label>
                    <AnimatePresence>
                        {tabConfig?.openCustomColor && <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="py-2">
                                <ColorPicker className=" w-[20px] h-[20px]" value={backgroundStyles.backgroundColor}
                                    onChange={(v) => {
                                        updateBackgroundStyles({
                                            backgroundColor: v,
                                        });
                                    }}
                                ></ColorPicker>
                            </div>
                            {/* Background Opacity */}
                            <label className="flex flex-col gap-y-2">
                                <span className="text-[13px]">Background Opacity</span>
                                <div className="py-2">
                                    <Slider
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        value={[backgroundStyles.backgroundOpacity]}
                                        onValueChange={(value) => {
                                            updateBackgroundStyles({
                                                backgroundOpacity: value,
                                            })
                                        }}
                                    />
                                </div>
                            </label>
                            {/* Background Blur  */}
                            <label className="flex flex-col gap-y-2">
                                <span className="text-[13px]">Background Blur</span>
                                <div className="py-2">
                                    <Slider
                                        min={0}
                                        max={20}
                                        step={1}
                                        value={[backgroundStyles.backgroundBlur]}
                                        onValueChange={(value) => updateBackgroundStyles({
                                            backgroundBlur: value,
                                        })}
                                    />
                                </div>
                            </label>
                        </motion.div>}
                    </AnimatePresence>


                    {/* Background Gradient */}
                    <label className="flex min-h-[40px] flex-row items-center justify-start transition-opacity duration-[0.15s] ease-[ease-in-out] py-1">
                        <span className="grow-[2] text-[13px]">Use Gradient</span>
                        <div className="inline-flex">
                            <Switch
                                checked={backgroundStyles.useGradient}
                                onCheckedChange={(v) => updateBackgroundStyles({ useGradient: v })}
                            />
                        </div>
                    </label>
                    <AnimatePresence>
                        {backgroundStyles.useGradient && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <label className="flex flex-col gap-y-2">
                                    <span className="text-[13px]">Gradient Angle</span>
                                    <div className="py-2">
                                        <Slider
                                            min={0}
                                            max={360}
                                            step={1}
                                            value={[backgroundStyles.backgroundGradientAngle]}
                                            onValueChange={(value) => updateBackgroundStyles({ backgroundGradientAngle: value[0] })}
                                        />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-y-2">
                                    <span className="text-[13px]">Gradient Start Color</span>
                                    <ColorPicker
                                        value={backgroundStyles.backgroundStartColor}
                                        onChange={(v) => updateBackgroundStyles({ backgroundStartColor: v })}
                                    />
                                </label>
                                <label className="flex flex-col gap-y-2">
                                    <span className="text-[13px]">Gradient End Color</span>
                                    <ColorPicker
                                        value={backgroundStyles.backgroundEndColor}
                                        onChange={(v) => updateBackgroundStyles({ backgroundEndColor: v })}
                                    />
                                </label>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                {/* image */}
                <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                    <span className=" text-[13px]">Image</span>
                    <div className=" w-full">
                        <Input
                            onChange={handleImageUpload}
                            accept="image/*"
                            type="file"></Input>
                    </div>
                </label>


                {/* <label className="flex flex-col gap-y-2">
                    <span className="text-[13px]">Background Position</span>
                    <Select
                        value={backgroundStyles.backgroundPosition}
                        onValueChange={(value) => updateBackgroundStyles({ backgroundPosition: value })}
                    >
                        <Select.Option value="center center">Center</Select.Option>
                        <Select.Option value="top left">Top Left</Select.Option>
                        <Select.Option value="top right">Top Right</Select.Option>
                        <Select.Option value="bottom left">Bottom Left</Select.Option>
                        <Select.Option value="bottom right">Bottom Right</Select.Option>
                    </Select>
                </label> */}

                {/* Background Repeat */}
                <label className="flex min-h-[40px] flex-row items-center justify-start transition-opacity duration-[0.15s] ease-[ease-in-out] py-1">
                    <span className="grow-[2] text-[13px]">Background Repeat</span>
                    <div className="inline-flex">
                        <Switch
                            checked={backgroundStyles.backgroundRepeat === 'repeat'}
                            onCheckedChange={(v) => updateBackgroundStyles({ backgroundRepeat: v ? 'repeat' : 'no-repeat' })}
                        />
                    </div>
                </label>




                {/* Background Width */}
                <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                    <span className=" text-[13px]">Width</span>
                    <div className=" w-full">
                        <Slider step={1}
                            value={[backgroundStyles.backgroundWidth]}
                            max={100}
                            min={50}
                            onValueChange={(v) => {
                                updateBackgroundStyles({
                                    backgroundWidth: v[0],
                                });
                            }}

                        ></Slider>
                    </div>
                </label>
                {/* <label className="flex min-h-[40px] flex-row items-center justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                    <span className="grow-[2] text-[13px]">Noise</span>
                    <div className="inline-flex">
                        <Switch checked={cardStyles.hasNoiseTexture}
                            onCheckedChange={v => updateCardStyles({ hasNoiseTexture: v })}
                        />
                    </div>
                </label>
                <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                    <span className=" text-[13px]">Opacity</span>
                    <div className=" w-full">
                        <Slider step={0.01}
                            value={[cardStyles.noiseTextureOpacity]}
                            max={1}
                            min={0}
                            onValueChange={(v) => {
                                console.log('v', v);
                                updateCardStyles({
                                    noiseTextureOpacity: v[0],
                                });
                            }}

                        ></Slider>
                    </div>
                </label>
                <label className="flex min-h-[40px] flex-row items-center justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                    <span className="grow-[2] text-[13px]">Noise</span>
                    <SelectBackgroundPosition onChange={v => {
                        updateCardStyles({
                            texturePosition: v,
                        });
                    }}></SelectBackgroundPosition>
                </label> */}
            </AccordionContent>
        </AccordionItem>
    )
}