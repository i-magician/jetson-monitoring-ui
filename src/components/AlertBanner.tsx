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
                (Low-confidence anomaly (<strong>{anomalyClass}</strong> at{' '}
                {(confidence * 100).toFixed(1)}%) fell below the {(threshold * 100).toFixed(0)}%
                threshold and was not flagged.
            </span>
            <button type="button" className="alert-dismiss" onClick={onDismiss} aria-label="Dismiss">
                <XIcon size={20} />
            </button>
        </div >
    )
}