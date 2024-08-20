import React, { useState } from 'react';
import { Activity, Clock, Heart, Twitter, User } from 'lucide-react';
import { useTweetsStore, type TweetControlState } from '../use-tweet-collection';
import LabelWithIcon from '../label-with-icon';



interface TweetControlProps {
  onChange: (state: TweetControlState) => void;
}

const TweetControl: React.FC<TweetControlProps> = ({ onChange }) => {
  const isActivated = useTweetsStore((state) => state.isActivated);
  const [state, setState] = useState<TweetControlState>({
    showUser: true,
    showActions: true,
    showTime: true,
    showFooter: true,
    showLogo: true,
  });

  const toggleOption = (option: keyof TweetControlState) => {
    const newState = { ...state, [option]: !state[option] };
    if (!isActivated) {
      useTweetsStore.getState().setShowCodeDialog(true);
      return;
    }
    setState(newState);
    onChange(newState);
  };

  return (
    <div className=" ">
      <LabelWithIcon
        label="CONTROLS"
        isActivated={isActivated}
        className='mb-2'
      />

      <div className="grid grid-cols-4 gap-1">
        <ControlOption
          label='user'
          active={state.showUser}
          onClick={() => toggleOption('showUser')}
        />
        <ControlOption
          label='response'
          active={state.showActions}
          onClick={() => toggleOption('showActions')}
        />
        <ControlOption
          label='footer'
          active={state.showFooter}
          onClick={() => toggleOption('showFooter')}
        />
        <ControlOption
          label='logo'
          active={state.showLogo}
          onClick={() => toggleOption('showLogo')}
        />
      </div>
    </div>
  );
};

interface ControlOptionProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const ControlOption: React.FC<ControlOptionProps> = ({ label, active, onClick, }) => {
  const getIcon = () => {
    switch (label) {
      case 'user':
        return <User className="w-4 h-4" />;
      case 'response':
        return <Heart
          className="w-4 h-4" />;
      case 'time':
        return <Clock className="w-4 h-4" />;
      case 'footer':
        return <Activity className="w-4 h-4" />
      case 'logo':
        return <Twitter className="w-4 h-4" />
    }
  };

  return (
    <div
      className='flex flex-col items-center gap-y-2'
      onClick={onClick}
    >
      <div
        className={`flex items-center p-2.5 rounded-lg cursor-pointer transition-colors duration-300 ${active ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
      >{getIcon()}</div>
      <div className="text-sm ">{label}</div>
    </div>
  );
};
export default TweetControl;