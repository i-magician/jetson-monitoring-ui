import { useState } from 'react';
import { useMockStream } from './useMockStream';
import { Header } from './components/Header';
import { StatusBar } from './components/StatusBar'
import { CameraFeed } from './components/CameraFeed';
import { DetectionResult } from './components/DetectionResult';
import { MessageLog } from './components/MessageLog';
import './App.css'


function App() {
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.6);
  const [playbackIntervalMs, setPlaybackIntervalMs] = useState(1500);

  const { current, history, queues, cloud } = useMockStream(playbackIntervalMs);
  return (
    <div className="app-shell">
      <Header />
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
