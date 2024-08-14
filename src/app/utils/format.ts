export function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    const formattedHours = hours % 12 || 12;

    // Ensure minutes are two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const day = date.getDate();
    const month = date.toLocaleString('en', { month: 'short' });
    const year = date.getFullYear();

    return `${formattedHours}:${formattedMinutes} ${ampm} · ${day} ${month}, ${year}`;
}