import { useState, useEffect } from 'react';
import { useMockStream } from './useMockStream';
import { Header } from './components/Header';
import { StatusBar } from './components/StatusBar'
import { CameraFeed } from './components/CameraFeed';
import { DetectionResult } from './components/DetectionResult';
import { MessageLog } from './components/MessageLog';
import { AlertBanner } from './components/AlertBanner';
import type { DetectionEvent } from './types';
import './App.css'

function App() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.6);
  const [playbackIntervalMs, setPlaybackIntervalMs] = useState(1500);
  const [pendingAlerts, setPendingAlerts] = useState<DetectionEvent[]>([]);

  const { current, history, queues, cloud } = useMockStream(playbackIntervalMs);

  useEffect(() => {
    const isHighConfidenceAnomaly =
      current.anomalyClass !== null && current.confidence > confidenceThreshold;
    if (!isHighConfidenceAnomaly) return;
    setPendingAlerts((prev) =>
      prev.some((a) => a.id === current.id) ? prev : [...prev, current]
    );
  }, [current, confidenceThreshold]);

  const activeAlert = pendingAlerts[0];

  return (
    <div className="app-shell">
      <Header />
      {activeAlert && activeAlert.anomalyClass && (
        <AlertBanner
          anomalyClass={activeAlert.anomalyClass}
          confidence={activeAlert.confidence}
          threshold={confidenceThreshold}
          onDismiss={() =>
            setPendingAlerts((prev) => prev.filter((a) => a.id !== activeAlert.id))
          }
        />
      )}
      <div className="dashboard">
        <div className="column column-left">
          <CameraFeed event={current} />
          <DetectionResult
            event={current}
            confidenceThreshold={confidenceThreshold}
            onThresholdChange={setConfidenceThreshold}
            playbackIntervalMs={playbackIntervalMs}
            onIntervalChange={setPlaybackIntervalMs}
          />
        </div>

        <div className="column column-right">
          <StatusBar cloud={cloud} queues={queues} />
          <MessageLog events={history} />
        </div>
      </div>
    </div>
  )
}
export default App