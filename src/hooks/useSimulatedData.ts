import { useState, useEffect, useCallback } from "react";

interface DataPoint {
  time: string;
  bpm: number;
  spo2: number;
}

const randomBpm = () => Math.floor(68 + Math.random() * 20);
const randomSpo2 = () => Math.floor(94 + Math.random() * 5);

function generateHistory(count: number): DataPoint[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const t = new Date(now - (count - i) * 3000);
    return {
      time: t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      bpm: randomBpm(),
      spo2: randomSpo2(),
    };
  });
}

export function useSimulatedData(interval = 3000) {
  const [data, setData] = useState<DataPoint[]>(() => generateHistory(20));
  const [isConnected, setIsConnected] = useState(true);

  const latest = data[data.length - 1];

  useEffect(() => {
    if (!isConnected) return;
    const id = setInterval(() => {
      setData((prev) => {
        const now = new Date();
        const point: DataPoint = {
          time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          bpm: randomBpm(),
          spo2: randomSpo2(),
        };
        return [...prev.slice(-29), point];
      });
    }, interval);
    return () => clearInterval(id);
  }, [interval, isConnected]);

  const toggleConnection = useCallback(() => setIsConnected((c) => !c), []);

  return { data, latest, isConnected, toggleConnection };
}
