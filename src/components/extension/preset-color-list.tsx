import ResultIcon from "@src/app/(app)/components/ResultIcon"
import { presets } from "@src/app/(app)/components/card-generator/color"
import React from "react";

export const PresetColorList = ({ onSelect }) => {

    const [colorIndex, setColorIndex] = React.useState(0);

    return (
        <div className="preset-selector">
            {presets.map((preset, index) => (
                <label key={index} className={`preset-label ${colorIndex === index ? 'selected' : ''}`}>
                    <input
                        className="preset-input"
                        type="radio"
                        name="preset"
                        value={index}
                        checked={colorIndex === index}
                        onChange={() => {
                            setColorIndex(index);
                            onSelect(index);
                        }}
                    />
                    <ResultIcon size={20} isPreview settings={{ ...preset, backgroundRadius: 0 }} />
                </label>
            ))}
            <style jsx>{`
.preset-selector {
display: flex;
flex-wrap: wrap;
gap:8px;
padding: 4px;
}
.preset-label {
position: relative;
overflow: hidden;
width: 20px;
height: 20px;
flex-shrink: 0;
border-radius: 5px;
transition: all 0.2s ease;
}
.preset-label:hover {
transform: scale(1.1);
box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
.preset-label.selected {
box-shadow: 0 0 0 2px #3b82f6;
}
.preset-input {
position: absolute;
width: 100%;
height: 100%;
appearance: none;
opacity: 0;
inset: 0;
cursor: pointer;
}
.preset-label:active {
transform: scale(0.95);
}
`}</style>
        </div>
    )
}