import { cn } from "@lib/utils"

export const LoadingSpinner = ({ className, isLoading, text }) => {
    {
        return (
            <>
                {isLoading && (
                    <div className={cn("fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 z-50")}>
                        <div className={cn("animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 mb-4")}></div>
                        <p className={cn("text-white")}>{text}</p>
                    </div>
                )}
            </>
        )
    }
}