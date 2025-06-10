import React, { useState } from 'react';
import ExerciseForm from './ExerciseForm.jsx';
import { Dumbbell } from 'lucide-react';

const exerciseOptions = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Overhead Press',
  'Barbell Row'
];

// 收集 workout 数据
function collectWorkout(date, exercises) {
  return {
    date,
    exercises: exercises.map(ex => ({
      name: ex.name,
      sets: ex.sets
    }))
  };
}

// 重置表单
function resetForm(setExercises, setDate) {
  setExercises([{ name: '', sets: [] }]);
  setDate(new Date().toISOString().slice(0, 10));
}

function WorkoutForm() {
  const [exercises, setExercises] = useState([{ name: '', sets: [] }]);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  // 更新exercise名称
  const handleNameChange = (idx, newName) => {
    setExercises(prev =>
      prev.map((ex, i) => (i === idx ? { ...ex, name: newName } : ex))
    );
  };

  // 更新每个exercise的sets
  const handleSetsChange = (idx, sets) => {
    setExercises(prev =>
      prev.map((ex, i) => (i === idx ? { ...ex, sets } : ex))
    );
  };

  const addExercise = () => {
    setExercises(prev => [...prev, { name: '', sets: [] }]);
  };

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = collectWorkout(date, exercises);

    // 获取已保存的workouts
    const prev = JSON.parse(localStorage.getItem('workouts') || '[]');
    // 保存新workout
    localStorage.setItem('workouts', JSON.stringify([...prev, workout]));

    resetForm(setExercises, setDate);
    alert('Workout saved!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-6xl mx-auto flex flex-col bg-blue-200">
        {/* Header */}
        <div className="text-center mb-8 mt-5">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Workout Tracker</h1>
          </div>
          <p className="text-slate-400">Track your progressive overload and visualize your gains</p>
        </div>
        <div className="flex flex-col gap-4 width-500 mx-auto">
          {/* 日期选择 */}
          <label className="font-medium flex items-center gap-2">
            Date:
            <input
              type="date"
              className="rounded border px-2 py-1"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>

          <button
            className="bg-amber-100"
            onClick={addExercise}
            type="button"
          >
            Add Exercise to this workout
          </button>

          {exercises.map((exercise, idx) => (
            <div key={idx} className="mb-2">
              <label className="mr-2">Exercise {idx + 1}:</label>
              <select
                className="rounded border px-2 py-1 mr-4 mb-2"
                value={exercise.name}
                onChange={e => handleNameChange(idx, e.target.value)}
                required
              >
                <option value="" disabled>Select exercise</option>
                {exerciseOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <ExerciseForm
                name={exercise.name}
                sets={exercise.sets}
                onSetsChange={sets => handleSetsChange(idx, sets)}
              />
            </div>
          ))}

          {/* Save Button */}
          <button
            type="submit"
            className="py-3 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
          >
            Save Workout
          </button>
        </div>
      </div>
    </form>
  );
}

export default WorkoutForm;