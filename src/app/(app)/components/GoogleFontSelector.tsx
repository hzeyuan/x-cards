import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCardStore } from '@src/hooks/useCardStore';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
// import { Label } from '@radix-ui/react-select';

const googleFonts = [
    { name: 'Default', value: 'sans-serif' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Open Sans', value: 'Open Sans' },
    { name: 'Lato', value: 'Lato' },
    { name: 'Montserrat', value: 'Montserrat' },
    { name: 'Noto Sans SC', value: 'Noto Sans SC' },
    { name: 'Playfair Display', value: 'Playfair Display' },
    { name: 'Merriweather', value: 'Merriweather' },
    { name: 'Source Sans Pro', value: 'Source Sans Pro' },
    { name: 'PT Sans', value: 'PT Sans' },
    { name: 'Raleway', value: 'Raleway' },
    { name: 'Oswald', value: 'Oswald' },
    { name: 'Nunito', value: 'Nunito' },
    { name: 'Ubuntu', value: 'Ubuntu' },
    { name: 'Poppins', value: 'Poppins' },
    { name: 'Quicksand', value: 'Quicksand' },
    { name: 'Rubik', value: 'Rubik' },
    { name: 'Work Sans', value: 'Work Sans' },
    { name: 'Fira Sans', value: 'Fira Sans' },
    { name: 'Noto Serif', value: 'Noto Serif' },
    // 中文字体
    { name: 'Noto Sans SC', value: 'Noto Sans SC' },
    { name: 'Noto Serif SC', value: 'Noto Serif SC' },
    { name: 'ZCOOL XiaoWei', value: 'ZCOOL XiaoWei' },
    { name: 'ZCOOL QingKe HuangYou', value: 'ZCOOL QingKe HuangYou' },
    { name: 'Ma Shan Zheng', value: 'Ma Shan Zheng' },
];

export default function GoogleFontSelector({ onFontChange }) {
    // const [selectedFont, setSelectedFont] = useState('sans-serif');
    const setFontStyles = useCardStore((state) => state.updateCardStyles);
    const fontFamily = useCardStore((state) => state.cardStyles.fontFamily);


    const loadFont = (fontName) => {
        if (fontName === 'sans-serif') return;
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@400;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    };

    useEffect(() => {
        // 动态加载谷歌字体
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Roboto&family=Open+Sans&family=Lato&family=Montserrat&family=Noto+Sans+SC&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);


    const handleFontChange = (value) => {
        setFontStyles({
            fontFamily: value
        })
        loadFont(value);
        onFontChange?.(value);
    };


    return (
        <div className="">
            <RadioGroup value={fontFamily} onValueChange={handleFontChange}>
                {googleFonts.map((font) => (
                    <div key={font.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={font.value} id={font.value} />
                        <span>{font.name}</span>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}