import { useEffect, useState } from 'react'; 

// Manual clock over third party clock option. Sets real time -> independent from sensor stream playback speed.
export function useClock() {
    const [now, setNow] = useState(() => new Date()); 

    useEffect(() => {
        const id = window.setInterval(() => setNow(new Date()), 1000); 
        return () => window.clearInterval(id); 
    })
    return now; 
}