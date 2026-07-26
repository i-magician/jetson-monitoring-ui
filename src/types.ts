//Shape for expected data from Jetson
export interface DetectionEvent {
    id: string; 
    timestamp: string; 
    frameUrl: string; //image for camera feed (mocked rn)
    anomalyClass: string | null; //null -> no anomaly
    confidence: number; 
    queue: string; //which queue event will publish to 
}

export interface QueueStatus {
    name: string; 
    healthy: boolean;
    depth: number; //messages currently queued
}

export interface CloudStatus {
    connected: boolean; 
    lastSyncSeconds: number; //seconds since last successful sync
}