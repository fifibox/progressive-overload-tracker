import React, { useState, useEffect } from 'react';

function History() {
  const [workouts, setWorkouts] = useState([]);

  // 加载本地数据
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('workouts') || '[]');
    setWorkouts(data);
  }, []);

  // 删除
  const handleDelete = idx => {
    const newWorkouts = workouts.filter((_, i) => i !== idx);
    setWorkouts(newWorkouts);
    localStorage.setItem('workouts', JSON.stringify(newWorkouts));
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Your Workouts</h2>
      {workouts.length === 0 && <div className="text-slate-400">No workouts saved.</div>}
      {workouts.map((workout, idx) => (
        <div key={idx} className="border-b py-3 flex flex-col gap-2">
          <div>
            <span className="font-semibold">Date: </span>
            <span>{workout.date}</span>
          </div>
          <div>
            <ul className="ml-4 list-disc">
              {workout.exercises.map((ex, i) => (
                <li key={i}>
                  <span className="font-medium">{ex.name}</span>
                  <ul className="ml-4 list-square text-sm">
                    {ex.sets.map((set, j) => (
                      <li key={j} className="text-slate-500">
                        {set.rep} reps × {set.weight}kg (Volume: {set.volume})
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="mt-2 text-red-600 hover:underline text-sm self-end"
            onClick={() => handleDelete(idx)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default History;