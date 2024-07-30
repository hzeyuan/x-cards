import { Button } from "@components/ui/button";
import { useCardStore } from "@src/hooks/useCardStore";
import { useTemplatesStore } from "@src/hooks/useTemplatesStore";
import { X } from "lucide-react";

export const TemplateList = () => {
    const templates = useTemplatesStore(state => state.templates);
    const delTemplate = useTemplatesStore(state => state.delTemplate);
    const setFontStyles = useCardStore(state => state.setFontStyles);
    const setColorIndex = useCardStore(state => state.setColorIndex);
    const updateBackgroundStyles = useCardStore(state => state.updateBackgroundStyles);
    const updateCardStyles = useCardStore(state => state.updateCardStyles);
    return (
        <div className="flex gap-4 py-4">
            {templates.map((t, index) => {
                return (
                    <Button size="sm" key={index} variant="secondary"
                        onClick={() => {
                            setFontStyles(t.fontStyles)
                            setColorIndex(t.colorIndex)
                            updateBackgroundStyles(t.backgroundStyles)
                            updateCardStyles(t.cardStyles)
                        }
                        }
                        className="hover:shadow-md">
                        <span>
                            <div>
                                <div className="action-btn flex-shrink-0 flex items-center justify-center cursor-pointer rounded-[4px] text-accent-foreground   ">
                                    {t.name}
                                </div>
                            </div>
                        </span>
                        <X className=" cursor-pointer hover:shadw-md ml-1 w-3 h-3" onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            delTemplate(index)

                        }} />
                    </Button>

                )
            })}

        </div>
    )
}