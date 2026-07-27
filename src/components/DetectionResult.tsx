import { useState } from 'react';
import type { DetectionEvent } from '../types';
import { ControlPanel } from './ControlPanel';

interface Props{
    event: DetectionEvent; 
    confidenceThreshold: number; 
    onThresholdChange: (v: number) => void; 
    playbackIntervalMs: number; 
    onIntervalChange: (v: number) => void; 
}

export function DetectionResult({
    event, 
    confidenceThreshold, 
    onThresholdChange, 
    playbackIntervalMs, 
    onIntervalChange
}: Props) {
    const [showControls, setShowControls] = useState(false); 

    //Surface anomaly if model's confidence clears operator-set threshold. 
    const isAnomaly = event.anomalyClass !== null && event.confidence >= confidenceThreshold; 
    return (
    <section className="panel detection-result">
      <header className="panel-header">
        <h2>Detection Result</h2>
      </header>

      <div className={`result-body ${isAnomaly ? 'is-anomaly' : 'is-clear'}`}>
        {isAnomaly ? (
          <>
            <span className="result-label">Anomaly Detected</span>
            <span className="result-class">{event.anomalyClass}</span>
          </>
        ) : (
          <span className="result-label">No Anomaly</span>
        )}
        <span className="result-confidence">
          confidence {(event.confidence * 100).toFixed(1)}%
        </span>
      </div>

      <button
        type="button"
        className="control-toggle"
        onClick={() => setShowControls((v) => !v)}
        aria-expanded={showControls}
      >
        {showControls ? '▲ Hide controls' : '▼ Adjust controls'}
      </button>

      {showControls && (
        <ControlPanel
          confidenceThreshold={confidenceThreshold}
          onThresholdChange={onThresholdChange}
          playbackIntervalMs={playbackIntervalMs}
          onIntervalChange={onIntervalChange}
        />
      )}
    </section>
  );
}