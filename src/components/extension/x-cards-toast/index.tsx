import * as _ from 'lodash-es';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PresetColorList } from '../preset-color-list';
import { Copy, Download, Loader2, X } from 'lucide-react';
import { sendMessageToIframe } from '@src/app/utils';
import { CardWidths, type XConfig } from '@src/hooks/useCardStore';

import Tabs from '../tabs';
import type { PlasmoCSUIProps } from 'plasmo';
import AdvancedImagePreview from './image-preview';
import TweetManager from '../tweet-manager';
import toast from 'react-hot-toast';
import { cn } from '@lib/utils';
import { InputCode } from '../input-code';
import { AnimatePresence, motion } from 'framer-motion';
import { useTweetsStore } from '../use-tweet-collection';


interface PreviewToastProps {
    tweetInfo: XConfig;
    tweetInfos: XConfig[];
    anchor: PlasmoCSUIProps['anchor'],
    tweetMode: 'single' | 'linear';
}

export const PreviewToast: React.FC<PreviewToastProps> = ({ tweetInfo, tweetInfos, anchor, tweetMode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const srcRef = useRef<string>();
    // const [showCodeDialog, setShowCodeDialog] = useState(false);
    const showCodeDialog = useTweetsStore(state => state.showCodeDialog);
    const setShowCodeDialog = useTweetsStore(state => state.setShowCodeDialog);

    const setImageSrc = useTweetsStore(state => state.setImageSrc);
    const [tweetStyle, setTweetStyle] = useState('posts');
    const cardConfig = useRef({});
    const [selectedFormat, setSelectedFormat] = useState('png');
    const [selectedWidth, setSelectWidth] = useState('md');
    const formats = ['png', 'jpeg', 'svg'];
    const cardStyles = ['posts', 'article',];
    const tweets = useTweetsStore(state => state.tweets);
    const tweetModeRef = useRef<string>(tweetMode || 'single');
    const activeTab = useTweetsStore(state => state.activeTab);
    const isActivated = useTweetsStore((state) => state.isActivated);
    const [isPreview, showIsPreview] = useState(false);


    const tabs = useMemo(() => {
        return [
            { value: 'single', label: 'Single' },
            { value: 'linear', label: 'Linear', isLocked: !isActivated },
        ]
    }, [isActivated])

    const styles = {
        container: {
            display: 'flex',
            // flexDirection: 'column' as const,
            gap: '0.5rem',
            borderRadius: '1rem',
            padding: '12px',
            boxSizing: 'border-box' as const,
            color: 'white',
            pointerEvents: 'visible' as const,
            // maxWidth: '220px',
            maxWidth: '576px',
            background: 'linear-gradient(145deg, rgba(40,39,42,0.9) 0%, rgba(20,19,22,0.9) 100%)',
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1), 0 0 0 2px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            maxHeight: 'calc(100vh - 24px)',
        },
        imageContainer: {
            position: 'relative' as const,
            width: '100%',
            // height: '200px',
            // maxHeight: '489px',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            transition: 'opacity 0.3s ease-in-out',

        },
        loader: {
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

        },
        button: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap' as const,
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s',
            outline: 'none',
            boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#262626',
            color: '#ffffff',
            height: '2.5rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            border: 'none',
            '&:hover': {
                backgroundColor: '#363636',
            },
            '&:focus': {
                boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)',
            },
        },
        widthButtonGridContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem',
            width: '100%',
        },
        widthButton: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap' as const,
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            transition: 'background-color 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s',
            outline: 'none',
            boxShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#262626',
            color: '#ffffff',
            height: '2rem',
            padding: '0.25rem 0.5rem',
            cursor: 'pointer',
            border: 'none',
            '&:hover': {
                backgroundColor: '#363636',
            },
            '&:focus': {
                boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)',
            },
        },
        loading: {
            animation: 'spin 1s linear infinite',
        },
        gridContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
            width: '100%',
        },
        col2: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        col3: {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        activeButton: {
            backgroundColor: '#0066cc',
        },
        label: {
            fontSize: '14px',
            color: 'ghostwhite',
        }
    };

    const keyframes = `
    @keyframes spin {
       to {
        transform: rotate(360deg);
    }
    }
`
    const canPass = () => {
        if (!isActivated && activeTab === 'linear') {
            setShowCodeDialog(true);
            return false;
        }
        return true;
    }

    const handleCopyImage = async () => {
        if (!canPass()) {
            return;
        }
        const imageSrc = useTweetsStore.getState().imageSrc;
        const [, mimeType] = imageSrc.match(/^data:(.+);base64,(.+)$/);
        const blob = await fetch(imageSrc).then(res => res.blob());
        await navigator.clipboard.write([
            new ClipboardItem({
                [mimeType]: blob
            })
        ]);
        toast.success('Image copied to clipboard', {
            duration: 1000,
            position: 'top-center',
        });
    }

    const handleDownloadImage = async () => {
        if (!canPass()) {
            return;
        }
        const xName = 'x-card'  //  tweetInfo.username || 'x-card';
        const imageSrc = useTweetsStore.getState().imageSrc;
        const link = document.createElement('a');
        link.download = `${xName}.${selectedFormat || 'png'}`
        link.href = imageSrc;
        link.click();
    }

    const handlePreview = async (tweetInfo: XConfig, tweetInfos: XConfig[] = []) => {
        // console.log('tweetInfo', tweetInfo);
        let finalTweetInfo = [tweetInfo];
        if (activeTab === 'linear') {
            finalTweetInfo = tweetInfos
        }
        try {
            setIsLoading(true);
            console.time('sendMessageToIframe');
            const value = await sendMessageToIframe('generate-card-local', {
                tweetInfo: finalTweetInfo,
                cardConfig: {
                    ...cardConfig.current,
                }
            });
            console.timeEnd('sendMessageToIframe');
            srcRef.current = value.dataUrl;
            setImageSrc(value.dataUrl);
            return value.dataUrl;
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    }

    const handleColorChange = async (colorIndex: number) => {
        cardConfig.current = {
            ...cardConfig.current,
            colorIndex,
        }
        await handlePreview(tweetInfo, tweets);
    }

    const handleSelectFormat = (format) => {
        cardConfig.current = {
            ...cardConfig.current,
            format: format.toLowerCase(),
        }
        setSelectedFormat(format.toLowerCase());
    }

    const handleSelectWidth = async (width: string) => {
        setSelectWidth(width);
        cardConfig.current = {
            ...cardConfig.current,
            width: CardWidths[width],
        }
        await handlePreview(tweetInfo, tweets);
    }

    const handleSelectCardStyle = async (style: string) => {
        cardConfig.current = {
            ...cardConfig.current,
            style: style.toLowerCase(),
        }
        setTweetStyle(style.toLowerCase());
    }


    const renderTweetManager = useMemo(() => {
        return (
            activeTab === 'linear' && (<TweetManager
                tweetInfos={tweetInfos}
                onRemoveItem={(tweetInfos) => {
                }}
                onDragEnd={(tweetInfos) => {
                    // handlePreview(tweetInfo, tweets);
                }}
                onReset={(tweetInfos) => {
                    // handlePreview(tweetInfo, tweets);
                }}
            ></TweetManager>)
        )
    }, [activeTab])

    const renderPreview = useMemo(() => {
        return (
            <motion.div

                layout
                style={{
                    ...styles.imageContainer,
                    // 400px
                    // height: isPreview ? '200px' : '100%', // Adjust these values as needed
                }}
                className={cn(isLoading ? 'opacity-50' : '', 'min-w-[256px] min-h-[256px]')}
            >
                <motion.div
                    animate={{
                        height: isPreview ? '256px' : '100%',
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                >
                    <AdvancedImagePreview />
                </motion.div>
                {isLoading && (
                    <div style={styles.loader}>
                        <Loader2 size={24} style={styles.loading} />
                    </div>
                )}

            </motion.div>

        )
    }, [isLoading, tweetInfo, tweetInfos, tweets, isPreview])

    const renderControls = <div style={{
        display: 'flex',
        gap: '0.5rem',

        flexDirection: 'column',
    }}>
        <div style={styles.label}>Tweet</div>
        <Tabs tabs={tabs} />
        {renderTweetManager}
        <PresetColorList onSelect={handleColorChange} />
        <div style={styles.label}>Width</div>
        <div style={styles.widthButtonGridContainer}>
            {['sm', 'md', 'lg', 'xl'].map(width => (
                <button style={{
                    ...styles.widthButton,
                    ...(selectedWidth === width ? styles.activeButton : {}),
                }} key={width} onClick={() => handleSelectWidth(width)}>
                    {width}
                </button>
            ))}

        </div>
        <div style={styles.label}>Style</div>
        {/* <div style={styles.gridContainer}>
            {cardStyles.map((style) => (
                <button
                    key={style}
                    style={{
                        ...styles.button,
                        ...(tweetStyle === style ? styles.activeButton : {}),
                    }}
                    onClick={() => handleSelectCardStyle(style)}
                >
                    <span >{style}</span>
                </button>
            ))}
        </div> */}
        <div style={styles.label}>Format</div>
        <div className='grid grid-cols-3 gap-2 w-full'>
            {formats.map((format) => (
                <button
                    className='inline-flex items-center justify-center whitespace-nowrap 
                    text-sm   rounded transition-colors duration-200 outline-none shadow-[0_0_0_2px_rgba(0,0,0,0.2)] bg-[#262626] text-white h-[2.5rem] px-4 py-2 cursor-pointer border-none hover:bg-[#363636]'
                    key={format}
                    style={{
                        ...(selectedFormat === format ? styles.activeButton : {}),
                    }}
                    onClick={() => handleSelectFormat(format)}
                >
                    <span >{format}</span>
                </button>
            ))}
        </div>
        <button style={styles.button} onClick={handleDownloadImage}>
            <Download className=' h-4 w-4 mr-2' />
            Download Image
        </button>
        <button
            className='mb-[32px]'
            style={styles.button} onClick={handleCopyImage}>
            <Copy className=' h-4 w-4 mr-2' />
            Copy Image
        </button>

        <span className='text-xs text-neutral-400 absolute  pt-2 bottom-1 right-4 '>
            <div className='flex justify-between'>
                <button onClick={() => {
                    setShowCodeDialog(true);
                }} className=' text-blue-500 mr-4'>Get License</button>
                <span> DM <a target='_blank' href="https://x.com/IndieDevr" className=' text-blue-500'>@IndieDevr</a>  unlock all features</span>
            </div>
            <div className=' flex  justify-end items-center'>
                {/* <a target='_blank' href="https://github.com/hzeyuan/x-cards/issues" className=' '>submit you issues</a> */}
                <a target="_blank" href="https://discord.gg/Prjas7Qh">
                    <svg
                        className="w-4 h-4 mr-2"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        width={256}
                        height={256}
                    >
                        <path d="M0 512a512 512 0 101024 0A512 512 0 100 512z" fill="#738BD8" />
                        <path d="M190.915 234.305h642.169v477.288H190.915z" fill="#FFF" />
                        <path
                            d="M698.157 932.274L157.288 862.85c-58.43-7.5-55.4-191.167-50.26-249.853l26.034-297.22c5.14-58.686 74.356-120.22 132.7-128.362l466.441-65.085c58.346-8.14 177.24 212.65 176.09 271.548l-8.677 445.108M512 300.373c-114.347 0-194.56 49.067-194.56 49.067 43.947-39.253 120.747-61.867 120.747-61.867l-7.254-7.253c-72.106 1.28-137.386 51.2-137.386 51.2-73.387 153.173-68.694 285.44-68.694 285.44 59.734 77.227 148.48 71.68 148.48 71.68l30.294-38.4c-53.334-11.52-87.04-58.88-87.04-58.88S396.8 645.973 512 645.973c115.2 0 195.413-54.613 195.413-54.613s-33.706 47.36-87.04 58.88l30.294 38.4s88.746 5.547 148.48-71.68c0 0 4.693-132.267-68.694-285.44 0 0-65.28-49.92-137.386-51.2l-7.254 7.253s76.8 22.614 120.747 61.867c0 0-80.213-49.067-194.56-49.067M423.68 462.08c27.733 0 50.347 24.32 49.92 54.187 0 29.44-22.187 54.186-49.92 54.186-27.307 0-49.493-24.746-49.493-54.186 0-29.867 21.76-54.187 49.493-54.187m177.92 0c27.733 0 49.92 24.32 49.92 54.187 0 29.44-22.187 54.186-49.92 54.186-27.307 0-49.493-24.746-49.493-54.186 0-29.867 21.76-54.187 49.493-54.187z"
                            fill="#738BD8"
                        />
                    </svg>
                </a>
            </div>
        </span>
    </div>


    useEffect(() => {
        handlePreview(tweetInfo, tweets);
    }, [activeTab, tweets, tweetStyle])


    return (
        <motion.div className=''
            layout
            initial={{ width: isPreview ? '256px' : '576px' }}
            animate={{ width: isPreview ? '256px' : '576px' }}
            transition={{ duration: 0.3 }}
            style={{
                ...styles.container,
                width: isPreview ? '256px' : '576px',
            }}
            onMouseEnter={() => showIsPreview(false)}
            onMouseLeave={() => showIsPreview(true)}
        >
            <style>{keyframes}</style>

            <button className='absolute right-3 top-3 z-10'>
                <X className=' h-5 w-5 text-neutral-500'
                    onClick={() => {
                        toast.remove('preview-toast');
                    }}
                ></X>
            </button>
            {renderPreview}
            <AnimatePresence>
                {!isPreview && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className='max-w-[220px]'
                    >
                        {renderControls}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showCodeDialog && <InputCode onClose={() => setShowCodeDialog(false)} />}
            </AnimatePresence>



        </motion.div >

    );
};

