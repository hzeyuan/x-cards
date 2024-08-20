import { Button } from "@components/ui/button";
import { useCallback, useMemo, useState } from "react";
import { useTweetsStore } from "../use-tweet-collection";
import { Input } from "@components/ui/input";

const paddingMap = {
    sm: 0,
    md: 10,
    lg: 25,
    xl: 50
};

const PaddingControl = () => {
    const [selectedPadding, setSelectedPadding] = useState('sm');
    const setCardConfig = useTweetsStore(state => state.setCardConfig);
    const [customPadding, setCustomPadding] = useState('');


    const handleSelectPadding = useCallback((paddingKey) => {
        setSelectedPadding(paddingKey);
        setCardConfig({
            padding: paddingMap[paddingKey]
        });
        setCustomPadding('');
    }, []);

    const renderPaddingControl = useMemo(() => {
        return (
            <div className="grid grid-cols-4 gap-1">
                {Object.keys(paddingMap).map(paddingKey => (
                    <Button
                        key={paddingKey}
                        size="sm"
                        className={selectedPadding === paddingKey ? 'bg-primary' : 'bg-[#262626]'}
                        onClick={() => handleSelectPadding(paddingKey)}
                    >
                        {paddingKey}
                    </Button>
                ))}
            </div>
        );
    }, [selectedPadding, customPadding]);

    return (
        <div>
            <h3 className="text-sm font-semibold mb-2">PADDING</h3>
            {renderPaddingControl}
        </div>
    );
};

export default PaddingControl;
