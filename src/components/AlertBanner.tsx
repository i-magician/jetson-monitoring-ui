import { XIcon } from '@phosphor-icons/react';

interface Props {
    anomalyClass: string;
    confidence: number;
    threshold: number;
    onDismiss: () => void;
}

export function AlertBanner({ anomalyClass, confidence, threshold, onDismiss }: Props) {
    return (
        <div className="alert-banner" role="alert">
            <span>
                (<strong>High-Confidence anomaly</strong> (<strong>{anomalyClass}</strong> at{' '}
                {(confidence * 100).toFixed(1)}%) is exceeds the <strong>{(threshold * 100).toFixed(0)}%</strong>
                threshold.
            </span>
            <button type="button" className="alert-dismiss" onClick={onDismiss} aria-label="Dismiss">
                <XIcon size={20} />
            </button>
        </div >
    )
}