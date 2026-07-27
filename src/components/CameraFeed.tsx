import type { DetectionEvent } from "../types";

interface Props{
    event: DetectionEvent;
}

export function CameraFeed({ event }: Props) {
    return(
        <section className="panel camera-feed">
            <header className="panel-header">
                <h2>Live Camera Feed</h2>
                <span className="live-dot" aria-label="live"></span>
            </header>
            <div className="camera-frame">
                <img src={event.frameUrl} alt={`camera frame ${event.id}`}></img>
            </div>
        </section>
    );
}