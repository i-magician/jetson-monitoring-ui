interface Props {
    confidenceThreshold: number; 
    onThresholdChange: (v: number) => void; 
    playbackIntervalMs: number; 
    onIntervalChange: (v: number) => void; 
}

export function ControlPanel({
    confidenceThreshold, 
    onThresholdChange, 
    playbackIntervalMs, 
    onIntervalChange
}:Props) {
    return(
        <div className="control-panel">
            <label className="control-row">
                <span>Confidence threshold</span>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={confidenceThreshold}
                    onChange={(e) => onThresholdChange(Number(e.target.value))}>
                    </input>
                <span className="control-value">{confidenceThreshold.toFixed(2)}</span>
            </label>

            <label className="control-row">
                <span>Playback speed</span>
                <input
                    type="range"
                    min={250}
                    max={4000}
                    step={250}
                    value={playbackIntervalMs}
                    onChange={(e) => onIntervalChange(Number(e.target.value))}>
                    </input>
                <span className="control-value">{playbackIntervalMs}</span>
            </label>
        </div>
    );
}