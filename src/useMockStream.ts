import { useEffect, useRef, useState } from 'react';
import type { DetectionEvent, QueueStatus, CloudStatus } from './types';
import { MOCK_SCENARIOS } from './mockScenarios';


const QUEUES = ['anomaly.detected', 'frame.archive', 'threshold.exceeded'];

/**
 * clamp01 makes sure a number is in the range of 0-1
 *
 * @param n 
 * @returns number in range of 0-1
 */
function clamp01(n: number) {
    return Math.min(1, Math.max(0, n));
}

/**
 * 
 * @param index 
 * @returns 
 */
function nextEvent(index: number): DetectionEvent {
    const scenario = MOCK_SCENARIOS[index % MOCK_SCENARIOS.length];
    const hasAnomaly = scenario.anomalyClass !== null;
    const confidence = clamp01(scenario.confidence + (Math.random() - 0.5) * 0.06);
    return {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        frameUrl: scenario.frameUrl,
        anomalyClass: scenario.anomalyClass,
        confidence,
        queue: hasAnomaly
            ? QUEUES[Math.floor(Math.random() * 2)] //anomaly-ish queues
            : QUEUES[2 + Math.floor(Math.random() * 2)],
    };
}


/**
 *  Simulating Jetson -> rabbitmq or other broker -> dashboard connection
 *  playIntervalMs controls how often the next frame arrives
 */

export function useMockStream(playbackIntervalMs: number) {
    const indexRef = useRef(0);
    const [current, setCurrent] = useState<DetectionEvent>(() => nextEvent(indexRef.current));
    const [history, setHistory] = useState<DetectionEvent[]>([]);
    const [queues, setQueues] = useState<QueueStatus[]>(
        QUEUES.map((name) => ({ name, healthy: true, depth: 0 }))
    );
    const [cloud, setCloud] = useState<CloudStatus>({ connected: true, lastSyncSeconds: 0 });

    const intervalRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        window.clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
            indexRef.current += 1;
            const evt = nextEvent(indexRef.current);
            setCurrent(evt);
            setHistory((prev) => [evt, ...prev].slice(0, 50));
            setQueues((prev) =>
                prev.map((q) => ({
                    ...q,
                    depth: q.name === evt.queue ? Math.max(0, q.depth + (Math.random() > 0.3 ? 1 : -1)) : q.depth,
                    healthy: Math.random() > 0.02 ? q.healthy : !q.healthy, // rare flap for realism
                }))
            );
            setCloud((prev) => ({
                connected: Math.random() > 0.01 ? prev.connected : !prev.connected,
                lastSyncSeconds: 0,
            }));
        }, playbackIntervalMs);

        return () => window.clearInterval(intervalRef.current);
    }, [playbackIntervalMs]);

    // tick the "seconds since last sync" independently of playback speed
    useEffect(() => {
        const id = window.setInterval(() => {
            setCloud((prev) => ({ ...prev, lastSyncSeconds: prev.lastSyncSeconds + 1 }));
        }, 1000);
        return () => window.clearInterval(id);
    }, []);

    return { current, history, queues, cloud };
}
