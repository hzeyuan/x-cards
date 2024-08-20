import type { XConfig } from '@src/hooks/useCardStore';
import { Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { SortableList, SortableListItem, type Item, type SortableListProps } from '../sortableList';
import { useTweetsStore } from './use-tweet-collection';
import toast from 'react-hot-toast';


const TweetManager: React.FC<{
    tweetInfos: XConfig[];
    onRemoveItem?: (tweetInfos: XConfig[]) => void;
    onReset?: (tweetInfos: XConfig[]) => void;
    onDragEnd?: (tweetInfos) => void;
}> = ({ tweetInfos, onRemoveItem, onReset, onDragEnd }) => {
    const isActivated = useTweetsStore((state) => state.isActivated);
    const tweets = useTweetsStore(state => state.tweets);
    const setTweets = useTweetsStore(state => state.setTweets);

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
        >

            <div className=' relative'>
                <SortableList<XConfig>
                    items={items}
                    setItems={setItems}
                    renderItem={renderItem}
                />
            </div>

        </div>
    )
};

export default TweetManager;