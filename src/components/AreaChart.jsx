import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function VolumeAreaChart({ data, exerciseName }) {
  return (
    <div style={{ width: '100%', minWidth: 0, height: 260 }}>
      <ResponsiveContainer width="100%" height={230}>
        <AreaChart
          data={data}
          margin={{ right: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis
            dataKey="date"
            tickFormatter={date => {
              // 假设 date 是 "2024-06-11"，只显示 "06-11"
              if (!date) return '';
              const parts = date.split('-');
              return parts.length === 3 ? `${parts[1]}-${parts[2]}` : date;
            }}
            tick={{ fontSize: 10, angle: -40, textAnchor: 'end',fill: '#94a3b8' }} // 这里设置字体大小
          />
          <YAxis
            width={30}
            domain={['dataMin', 'auto']} // 最小值为数据最小值，不显示0
            tickFormatter={value => value.toLocaleString()}
            tick={{ fontSize: 10, angle: -40, textAnchor: 'end', fill: '#94a3b8' }} // 设置字体大小和角度
          />
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
      </ResponsiveContainer>
    </div>
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