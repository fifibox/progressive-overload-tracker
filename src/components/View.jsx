import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import VolumeAreaChart from './AreaChart.jsx';

export default function View() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('workouts') || '[]');
    setData(local);
  }, []);

  // 获取所有不同的exercise名称
  const exerciseNames = Array.from(
    new Set(
      data.flatMap(day => day.exercises.map(ex => ex.name))
    )
  );

  // 计算选中exercise的所有训练记录，并为每个exercise加上volume
  const selectedData = selected
    ? data
        .map(day => {
          const exercise = day.exercises.find(ex => ex.name === selected);
          if (!exercise) return null;
          const volume = exercise.sets.reduce((sum, set) => sum + set.rep * set.weight, 0);
          return {
            date: day.date,
            exercise: { ...exercise, volume }
          };
        })
        .filter(item => item && item.exercise)
    : [];

  return (
    <div className="text-center text-slate-500">
      <div className="mt-4 text-left bg-white rounded shadow p-4 mx-auto max-w-3xl">
        <div className="flex flex-row gap-6 mb-4">
        <p className="mb-8 flex items-center">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <span className="ml-2 text-sm font-semibold sm:text-xl">Volume Progress</span>
        </p>

        {/* Exercise Selector for Graph */}
        <div className="mb-4">
          <select
            className="mb-4 px-3 py-2 rounded border border-slate-300"
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
            {selected === '' && (
              <option value="" disabled hidden>
                Select exercise
              </option>
            )}
            {exerciseNames.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        </div>
        {/* Volume Area Chart */}
         <div className="h-80">
          {selected ? (                    
            <div className='mt-4'>
              <VolumeAreaChart data={selectedData} exerciseName={selected + " volume"} />
            </div>) : (
              <>
                <div className="text-center text-slate-400 p-6 mt-15 bg-slate-100 rounded-full mx-auto mb-6 w-24 h-24">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-70" />  
                </div>
                <p className="text-center">Select an exercise to visualize your gains</p>
              </>
            )}
        </div>


</div>
        {selected && (
          <div className="mt-4 text-left bg-white rounded shadow p-4 mx-auto max-w-3xl">
            <div className="font-semibold mb-2">Workout History:</div>
              {selectedData.map(item => (
                <div key={item.date} className="mb-2">
                  <span className="font-mono text-xs text-slate-400">{item.date}:</span>
                  {item.exercise.sets.map((set, idx) => (
                    <p key={idx} className="ml-2">
                      {set.rep} reps × {set.weight}kg
                    </p>
                  ))}
                  <div className="ml-2 text-amber-700 text-xs">
                    Volume: {item.exercise.volume}
                  </div>
                </div>
              ))}

          </div>
        )}

      </div>

  );

}