"use client"

// npx shadcn-ui@latest add checkbox
// npm  i react-use-measure
import { type Dispatch, type ReactNode, type SetStateAction, useState } from "react"
import {
    AnimatePresence,
    LayoutGroup,
    Reorder,
    motion,
    useDragControls,
} from "framer-motion"
import useMeasure from "react-use-measure"

import { cn } from "@/lib/utils"

export type Item<T> = T & {
    id: number
}

interface SortableListItemProps<T> {
    item: Item<T>
    order: number
    onCompleteItem?: (id: number) => void
    onRemoveItem?: (id: number) => void
    renderExtra?: (item: Item<T>) => React.ReactNode
    isExpanded?: boolean
    className?: string
    handleDrag: () => void
    onDragEnd?: () => void
}

function SortableListItem<T>({
    item,
    order,
    onRemoveItem,
    renderExtra,
    handleDrag,
    isExpanded,
    className,
    onDragEnd
}: SortableListItemProps<T>) {
    let [ref, bounds] = useMeasure()
    const [isDragging, setIsDragging] = useState(false)
    const [isDraggable, setIsDraggable] = useState(true)
    const dragControls = useDragControls()

    const handleDragStart = (event: any) => {
        setIsDragging(true)
        dragControls.start(event, { snapToCursor: true })
        handleDrag()
    }

    const handleDragEnd = () => {
        setIsDragging(false)
        onDragEnd?.()
    }

    return (
        <motion.div className={cn("", className)} key={item.id}>
            <div className="flex w-full items-center">
                <Reorder.Item
                    value={item}
                    className={cn(
                        "relative z-auto grow",
                        "h-full rounded-xl bg-[#161716]/80",
                        "shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]",
                        !isDragging ? "w-7/10" : "w-full"
                    )}
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        height: bounds.height > 0 ? bounds.height : undefined,
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.4,
                        },
                    }}
                    exit={{
                        opacity: 0,
                        transition: {
                            duration: 0.05,
                            type: "spring",
                            bounce: 0.1,
                        },
                    }}
                    layout
                    layoutId={`item-${item.id}`}
                    // dragListener={!item.checked}
                    dragControls={dragControls}
                    onDragEnd={handleDragEnd}
                    style={
                        isExpanded
                            ? {
                                zIndex: 9999,
                                marginTop: 10,
                                marginBottom: 10,
                                position: "relative",
                                overflow: "hidden",
                            }
                            : {
                                position: "relative",
                                overflow: "hidden",
                            }
                    }
                    whileDrag={{ zIndex: 9999 }}
                >
                    <div ref={ref} className={cn(isExpanded ? "" : "", "z-20 ")}>
                        <motion.div
                            layout="position"
                            className="flex items-center justify-center "
                        >
                            {renderExtra && renderExtra(item)}
                        </motion.div>
                    </div>
                    <div
                        onPointerDown={isDraggable ? handleDragStart : undefined}
                        style={{ touchAction: "none" }}
                    />
                </Reorder.Item>
            </div>
        </motion.div>
    )
}

SortableListItem.displayName = "SortableListItem"

export interface SortableListProps<T> {
    items: Item<T>[]
    setItems: Dispatch<SetStateAction<Item<T>[]>>
    renderItem: (
        item: Item<T>,
        order: number,
        onRemoveItem: (id: number) => void
    ) => ReactNode,
    onDragEnd?: () => void
    onRemoveItem?: (id: number) => void
}

function SortableList<T>({
    items,
    setItems,
    renderItem,
    onDragEnd,
    onRemoveItem,
}: SortableListProps<T>) {
    if (items) {
        return (
            <LayoutGroup>
                <Reorder.Group
                    axis="y"
                    values={items}
                    onReorder={setItems}
                    onDragEnd={onDragEnd}
                    className="flex flex-col"
                >
                    <AnimatePresence>
                        {items?.map((item, index) =>
                            renderItem(item, index, (id: number) => {
                                setItems((items) => items.filter((item) => item.id !== id));
                                onRemoveItem?.(id);
                            }
                            )
                        )}
                    </AnimatePresence>
                </Reorder.Group>
            </LayoutGroup>
        )
    }
    return null
}

SortableList.displayName = "SortableList"

export { SortableList, SortableListItem }
