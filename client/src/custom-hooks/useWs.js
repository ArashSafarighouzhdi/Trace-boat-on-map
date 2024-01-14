
import { useEffect, useState, useRef } from 'react';

export const useWs = ( url ) => {
  const [isReady, setIsReady] = useState(false);
  const [val, setVal] = useState(null);

  const ws = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => setIsReady(true);
    socket.onclose = () => setIsReady(false);
    socket.onmessage = (event) =>
    {
      setVal(JSON.parse(event.data));
    }

    ws.current = socket;

    return () => {
      socket.close();
    }
  }, [url]);

  return [isReady, val, ws.current?.send.bind(ws.current)]
}