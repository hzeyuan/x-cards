import { AccordionContent, AccordionItem, AccordionTrigger } from "@components/ui/accordion";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useCardStore } from "@src/hooks/useCardStore";

export const InputController = () => {
    const xConfig = useCardStore(state => state.xConfig);
    return (
        <div>
            <AccordionItem value={'Input'}>
                <AccordionTrigger>Input</AccordionTrigger>
                <AccordionContent className="">
                    <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                        <span className=" text-[13px]">username</span>
                        <div className=" px-1.5">
                            <Input maxLength={200} minLength={2} value={xConfig.username} onChange={(e) => {
                                useCardStore.setState({
                                    xConfig: {
                                        ...xConfig,
                                        username: e.target.value
                                    }
                                })
                            }}></Input>
                        </div>
                    </label>
                    <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                        <span className=" text-[13px]">text</span>
                        <div className=" px-1.5">
                            <Textarea rows={10} value={xConfig.text} onChange={(e) => {
                                useCardStore.setState({
                                    xConfig: {
                                        ...xConfig,
                                        text: e.target.value
                                    }
                                })
                            }}></Textarea>
                        </div>
                    </label>
                  
                    <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                        <span className=" text-[13px]">replies</span>
                        <div className=" px-1.5">
                            <Input type="number" value={xConfig.replies} onChange={(e) => {
                                useCardStore.setState({
                                    xConfig: {
                                        ...xConfig,
                                        replies: Number(e.target.value)
                                    }
                                })
                            }}></Input>
                        </div>
                    </label>
                    <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                        <span className=" text-[13px]">shares</span>
                        <div className=" px-1.5">
                            <Input type="number" value={xConfig.shares} onChange={(e) => {
                                useCardStore.setState({
                                    xConfig: {
                                        ...xConfig,
                                        shares: Number(e.target.value)
                                    }
                                })
                            }}></Input>
                        </div>
                    </label>
                    <label className="flex min-h-[40px] flex-col gap-y-2  justify-start transition-opacity duration-[0.15s] ease-[ease-in-out]  py-1">
                        <span className=" text-[13px]">shares</span>
                        <div className=" px-1.5">
                            <Input type="number" value={xConfig.likes} onChange={(e) => {
                                useCardStore.setState({
                                    xConfig: {
                                        ...xConfig,
                                        likes: Number(e.target.value)
                                    }
                                })
                            }}></Input>
                        </div>
                    </label>
                </AccordionContent>
            </AccordionItem>
        </div>
    )
}