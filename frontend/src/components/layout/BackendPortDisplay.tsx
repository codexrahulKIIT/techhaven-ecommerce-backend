import { useEffect, useState } from 'react';

export default function BackendPortDisplay() {
  const [port, setPort] = useState<number | null>(null);

  useEffect(() => {
    fetch('/backend-port.json')
      .then(res => res.json())
      .then(data => setPort(data.port))
      .catch(err => console.error('Could not load backend port:', err));
  }, []);

  return (
    <div className="text-sm text-gray-600">
      {port ? `Backend is running on port: ${port}` : 'Loading backend port...'}
    </div>
  );
}
