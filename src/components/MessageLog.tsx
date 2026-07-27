import type { DetectionEvent } from '../types';

interface Props {
  events: DetectionEvent[];
}

export function MessageLog({ events }: Props) {
  return (
    <section className="panel message-log">
      <header className="panel-header">
        <h2>Data Log Feed</h2>
      </header>

      <div className="message-table-wrap">
        <table className="message-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Anomaly</th>
              <th>Confidence</th>
              <th>Queue</th>
            </tr>
          </thead>
          <tbody>
            {events.map((evt) => (
              <tr key={evt.id} className={evt.anomalyClass ? 'row-anomaly' : ''}>
                <td>{new Date(evt.timestamp).toLocaleTimeString()}</td>
                <td>{evt.anomalyClass ?? '—'}</td>
                <td>{(evt.confidence * 100).toFixed(1)}%</td>
                <td>{evt.queue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
