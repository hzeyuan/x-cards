import React, { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';
import { useTweetsStore } from './use-tweet-collection';
const Tabs: React.FC<{
  tabs: { label: string; value: string, isLocked?: boolean }[];
  defaultTab?: string;
}> = ({ tabs }) => {

  const activeTab = useTweetsStore(state => state.activeTab);
  const setActiveTab = useTweetsStore(state => state.setActiveTab);


  const handleTabClick = (tabValue) => {
    setActiveTab(tabValue);
  };

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      width: "100%",
      background: '#313131',
      padding: "4px",
      height: "36px",
      boxSizing: "border-box",
      borderRadius: "0.375rem",
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            transition:
              "background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s",
            outline: "none",
            color: "white",
            cursor: "pointer",
            border: "none",
            padding: '4px',
            background: 'unset',
            ...(activeTab === tab.value ? { background: 'black' } : {}),

          }}
          onClick={() => handleTabClick(tab.value)}
        >
          {tab?.isLocked && <Lock className='  w-4 h-4 mr-2 text-gray-400  ' />}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default React.memo(Tabs);