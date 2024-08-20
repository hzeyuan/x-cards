import React from 'react';
import { LockOpen, Lock } from 'lucide-react';

interface LabelWithIconProps {
    label: string;
    isActivated?: boolean;
    className?: string;
    labelClassName?: string;
}

const LabelWithIcon: React.FC<LabelWithIconProps> = ({ label, isActivated = false, className = '', labelClassName = '' }) => {
    const Icon = isActivated ? LockOpen : Lock;

    return (
        <div className={`flex gap-x-2 items-center ${className}`}>
            <Icon className='w-4 h-4 text-gray-400' />
            <h3 className={`text-sm font-semibold ${labelClassName}`}>{label}</h3>
        </div>
    );
};

export default LabelWithIcon;