import { useClock } from '../useClock'

export function Header() {
    const now = useClock(); 

    const date = now.toLocaleDateString(undefined, {
        year: 'numeric', 
        month: 'short', 
        day: '2-digit'
    }); 

    const time = now.toLocaleTimeString(undefined, {
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
    }); 

    return(
        <header className="app-header">
            <h1>Anomaly Detection UI Mockup</h1>
            <div className="app-clock">
                <span className="clock-date">{date}</span>
                <span className="clock-time">{time}</span>
            </div>
        </header>
    )
}