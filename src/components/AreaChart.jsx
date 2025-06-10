import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function VolumeAreaChart({ data, exerciseName }) {
  return (
    <AreaChart
      width={500}
      height={230}
      data={data}
      margin={{ top: 20, right: 40, left: 10 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip content={<SmallTooltip />} />
      <Legend />
      <Area
        type="monotone"
        dataKey="exercise.volume"
        name={exerciseName}
        stroke="#8884d8"
        fillOpacity={1} 
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
}

function SmallTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.95)',
        border: '1px solid #ccc',
        borderRadius: 4,
        padding: '2px 8px',
        fontSize: 12,
        minWidth: 80
      }}
    >
      <div style={{ fontWeight: 500 }}>{label}</div>
      <div>
        {payload.map((entry, idx) => (
          <div key={idx} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </div>
        ))}
      </div>
    </div>
  );
}