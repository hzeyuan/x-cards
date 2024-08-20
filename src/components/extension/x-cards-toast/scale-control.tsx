import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'; // Assuming you're using Radix UI
import { useTweetsStore } from '../use-tweet-collection';
import LabelWithIcon from '../label-with-icon';

interface ScaleControlProps {
    value: number;
    onChange: (value: number) => void;
}

const ScaleControl: React.FC<ScaleControlProps> = ({ value, onChange }) => {
    const isActivated = useTweetsStore((state) => state.isActivated);

    return (
        <div>
            <LabelWithIcon
                label="IMAGE QUALITY"
                isActivated={isActivated}
                className='mb-2'
            />
            <Tabs className='w-full' value={String(value)} onValueChange={(value) => onChange(Number(value))}>
                <TabsList className='grid grid-cols-4 justify-center items-center bg-[#262626]'>
                    <TabsTrigger className='text-gray-400' value='1'>1x</TabsTrigger>
                    <TabsTrigger className='text-gray-400' value='2'>2x</TabsTrigger>
                    <TabsTrigger className='text-gray-400' value='3'>3x</TabsTrigger>
                    <TabsTrigger className='text-gray-400' value='4'>4x</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

    );
};

export default ScaleControl;