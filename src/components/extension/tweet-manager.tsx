import type { XConfig } from '@src/hooks/useCardStore';
import { Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SortableList, SortableListItem, type Item, type SortableListProps } from '../sortableList';
import { useTweetsStore } from './use-tweet-collection';
import toast from 'react-hot-toast';


const LockOverlay = ({ onRemoveItem }) => {

    const handleLockClick = () => {
        onRemoveItem?.();
    };

    return (

        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: 'blur(5px)', // 磨砂玻璃效果
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 20,
            }}
        >
            <svg

                onClick={handleLockClick}
                style={{ cursor: 'pointer' }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>

    );
};


const TweetManager: React.FC<{
    tweetInfos: XConfig[];
    onRemoveItem?: (tweetInfos: XConfig[]) => void;
    onReset?: (tweetInfos: XConfig[]) => void;
    onDragEnd?: (tweetInfos) => void;
}> = ({ tweetInfos, onRemoveItem, onReset, onDragEnd }) => {
    const isActivated = useTweetsStore((state) => state.isActivated);
    const tweets = useTweetsStore(state => state.tweets);
    const setTweets = useTweetsStore(state => state.setTweets);
    const setShowCodeDialog = useTweetsStore(state => state.setShowCodeDialog);

    const [items, setItems] = useState<(
        XConfig & {
            id: number;
        }
    )[]>(tweetInfos.map((tweet, index) => ({
        ...tweet,
        id: index,
    })
    ));

    // sync the tweets with the items
    useEffect(() => {
        setItems(tweets.map(
            (tweet, index) => ({
                ...tweet,
                id: index,
            })
        ));
    }, [tweets]);


    const handleRemoveItem = (order: number) => {
        // at least one item should be there
        if (tweets.length === 1) {
            toast("At least one tweet should be there", {
                duration: 1000,
            });
            onRemoveItem?.(items);
            return;
        }
        const newItems = [...tweets];
        newItems.splice(order, 1);
        setTweets(newItems);
        onRemoveItem?.(newItems);
    }

    const renderItem: SortableListProps<XConfig>['renderItem'] = (
        item,
        order,
        onRemoveItem,
    ) => (
        <SortableListItem
            key={item.id}
            item={item}
            onRemoveItem={onRemoveItem}
            handleDrag={() => { }}
            renderExtra={(item) => {
                return (
                    <div className='flex items-center space-x-3 h-10 bg-[#313131]  p-1.5 mb-2 rounded-xl  shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)] cursor-grab w-full'>
                        {/* <span className="font-mono text-xs pl-1 text-white/50">{index}</span> */}
                        <div className='flex-grow w-full'>
                            <span className="tracking-tighter text-base  text-white/70 line-clamp-1 break-words">{item.text.slice(0, 20)}</span>
                        </div>
                        <button
                            className="inline-flex h-8 items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium  transition-colors duration-150   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            onClick={() => handleRemoveItem(order)}
                        >
                            <Trash className="h-4 w-4 text-red-400 transition-colors duration-150 fill-red-400/60 " />
                        </button>
                    </div>
                )
            }}
            onDragEnd={() => {
                setTweets(items);
                // onDragEnd?.(items);
            }}
            order={order} />
    )

    return (
        <div className=" "
            style={{ position: 'relative' }}
        >
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-white text-md font-bold">Tweet Collection</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            setItems(tweetInfos.map(
                                (tweet, index) => ({
                                    ...tweet,
                                    id: index,
                                })
                            ));
                            onReset?.(tweetInfos);
                        }}
                        className="text-gray-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>
            {!isActivated && (<LockOverlay onRemoveItem={() => {
                setShowCodeDialog(true);
            }} />)}

            <SortableList<XConfig>
                items={items}
                setItems={setItems}
                renderItem={renderItem}
            />
        </div>
    )
};

export default TweetManager;