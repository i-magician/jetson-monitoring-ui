import type { CloudStatus, QueueStatus } from '../types'
import { WifiHighIcon, WifiSlashIcon } from '@phosphor-icons/react';

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
                <div className={`pill ${cloud.connected ? 'ok' : 'down'}`} >
                    {cloud.connected ? <WifiHighIcon size={20}/> : <WifiSlashIcon size={20}/>}
                    {cloud.connected ? 'Connected' : 'Disconnected'}
                </div>
                <span className="status-meta">synced {cloud.lastSyncSeconds}s ago</span>
            </div>
                {queues.map((q) => (
                    <div key={q.name} className={`pill queue-pill ${q.healthy ? 'ok' : 'down'}`}>
                        <span className="queue-name">{q.name}</span>
                        <span className="queue-depth">{q.depth} msgs</span>
                    </div>
                ))}
        </section>
    )
}