import type { CloudStatus, QueueStatus } from '../types'

interface Props {
    cloud: CloudStatus;
    queues: QueueStatus[];
}

export function StatusBar({ cloud, queues }: Props) {
    return (
        <section className="panel status-bar">
            <header className="panel-header">
                <h2>System Status</h2>
            </header>

            <div className="status-row">
                <span className={`pill ${cloud.connected ? 'ok' : 'down'}`}>
                    {cloud.connected ? 'Cloud Ingestion: Connected' : 'Cloud Ingestion: Disconnected'}
                </span>
                <span className="status-meta">synced {cloud.lastSyncSeconds}s ago</span>
            </div>

            <div className="queue-grid">
                {queues.map((q) => (
                    <div key={q.name} className={`pill queue-pill ${q.healthy ? 'ok' : 'down'}`}>
                        <span className="queue-name">{q.name}</span>
                        <span className="queue-depth">{q.depth} msgs</span>
                    </div>
                ))}
            </div>
        </section>
    )
}