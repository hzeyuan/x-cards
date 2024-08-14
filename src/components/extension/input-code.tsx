import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { sendToBackground } from '@plasmohq/messaging';
import { useTweetsStore } from './use-tweet-collection';

export const InputCode = ({ onClose }) => {
    const [licenseKey, setLicenseKey] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isActivated = useTweetsStore((state) => state.isActivated);
    const setIsActivated = useTweetsStore((state) => state.setIsActivated);

    useEffect(() => {
        if (isActivated) {
            setMessage('License activated');
        }
    }, [isActivated])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        if (!licenseKey) {
            setMessage('License key is required');
            setIsLoading(false);
            return;
        }

        try {
            const data = await sendToBackground({
                name: 'code',
                body: {
                    licenseKey,
                    action: 'activate'
                }
            })

            if (data.message === 'License activated') {
                setMessage('License activated');
                toast.success('Your license key is valid. Thank you!');
                setIsActivated(true);
                onClose?.();
            } else {
                setMessage('Invalid license key. Please try again.');
                toast.error('Your license key is invalid. Please try again.');
            }
        } catch (error) {
            console.error('Error checking license key:', error);
            toast.error('An error occurred. Please try again.');
            setMessage('An error occurred. Please try again.');
        }

        setIsLoading(false);
    };

    return (
        <motion.div
            animate={{ scale: [0.1, 1] }}
            exit={{ scale: 0 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gray-800 p-8 shadow-lg w-full max-w-md rounded-xl border border-gray-700 relative">
                <button
                    className='absolute right-3 top-3 z-10 hover:bg-gray-700 rounded-full p-1 transition-colors duration-200'
                    onClick={onClose}
                >
                    <X className='h-5 w-5 text-neutral-500 hover:text-white' />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-white">Enter Your License Key</h2>
                <p className="text-white mb-4 text-sm">This key represents a permanent license for this product.</p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={licenseKey}
                        onChange={(e) => setLicenseKey(e.target.value)}
                        placeholder="Please enter your license key"
                        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 placeholder-gray-400"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Activate License'}
                    </button>
                </form>

                {message && (
                    <p className={`mt-4 text-sm text-center ${message.includes('activated') ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </p>
                )}
                <p className="mt-4 text-sm text-gray-400">
                    Need a license key? <a href="https://xcards.gumroad.com/l/x-cards" target="_blank">Visit our Gumroad page , Try our 7-day free trial!</a>
                </p>
                <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
                    <p className="text-sm font-medium text-blue-300 mb-2">
                        Unlock 1 Year Free Access:
                    </p>
                    <div className="flex items-center space-x-2 mb-2">
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        <span className="text-sm text-gray-300">Share on X (Twitter)</span>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-md" onClick={() => {
                        window.open('https://x.com/intent/tweet?url=https://x-cards.net&text=@FeigelC35583 Just discovered an amazing tool! @IndieDevr Check it out!&hashtags=IndieDevTool', '_blank');
                    }}>
                        <p className="text-sm text-gray-300 mb-2" >Click Post this message:</p>
                        <p className="text-sm text-white font-medium">
                            "X Cards: Power Up Your Tweet Marketing on X.com<a href="https://x.com/IndieDevr" target="_blank">@IndieDevr</a> #IndieDevTool"
                        </p>
                    </div>
                    <p className="mt-3 text-sm ">
                        DM <a className='text-blue-300' href="https://x.com/messages/compose?recipient_id=IndieDevr" target="_blank">@IndieDevr</a> with your post link for your 1-year activation code!
                    </p>
                </div>

            </div>
        </motion.div>
    );
};