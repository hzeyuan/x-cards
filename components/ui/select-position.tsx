"use client"
import { cn } from "@lib/utils"
import { useState } from "react"

export const SelectBackgroundPosition = ({ onChange }) => {
    const [position, setPosition] = useState('center center')

    const positions = [
        { value: "left top", title: "Top left" },
        { value: "center top", title: "Top center" },
        { value: "right top", title: "Top right" },
        { value: "left center", title: "Left center" },
        { value: "center center", title: "Center" },
        { value: "right center", title: "Right center" },
        { value: "left bottom", title: "Bottom left" },
        { value: "center bottom", title: "Bottom center" },
        { value: "right bottom", title: "Bottom right" }
    ]

    const handleClick = (newPosition) => {
        setPosition(newPosition)
        onChange(newPosition)
    }

    return (
        <div className="relative grid w-12 h-12 grid-cols-3 p-1 bg-white border border-gray-200 rounded-lg dark:border-gray-700 place-content-around place-items-center aspect-square dark:bg-gray-900 shadow hover:scale-[1.4] duration-300 ease-[cubic-bezier(.75,-0.5,0,1.75)]">
            {positions.map(({ value, title }) => (
                <div
                    key={value}
                    onClick={() => handleClick(value)}
                    title={title}
                    className={cn(
                        "w-[8px] h-[8px] rounded-full cursor-pointer",
                        position === value
                            ? "bg-gray-800 dark:bg-gray-200"
                            : "bg-gray-300 hover:bg-gray-500 dark:hover:bg-gray-400 dark:bg-gray-600/50"
                    )}
                />
            ))}
        </div>
    )
}