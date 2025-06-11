import React, { useState } from 'react';
import ExerciseForm from './ExerciseForm.jsx';
import { Dumbbell, Plus } from 'lucide-react';

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
  const [showTip, setShowTip] = useState(true);

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
    setShowTip(false); // 点击后隐藏提示
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
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col">
      <div className="flex-1 px-4 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col bg-blue-200 sm:px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-2 mt-5">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Workout Tracker</h1>
          </div>
          {showTip && (
            <p className="text-slate-400 mb-3">Track your workout and visualize your gains</p>
          )}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex">
          {/* 日期选择 */}
          <label className="font-medium flex items-center gap-1 pr-4 ml-6">
            Date:
            <input
              type="date"
              className="px-1 py-1 w-28 text-sm sm:text-base bg-transparent focus:outline-none focus:border-blue-400 transition-colors"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>

          <button 
            type="button"
            onClick={addExercise}
            className="
            bg-blue-500 hover:bg-blue-600 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed
            flex w-33 items-center gap-2 px-3 py-1.5 text-white text-sm rounded-xl transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Exercise
          </button>
          </div>

          {exercises.map((exercise, idx) => (
            <div key={idx} 
            className="mb-4 pt-4 pb-4 px-4 bg-white/80 rounded-xl shadow flex flex-col gap-2 border border-slate-100"
            >
              <label className="mr-2 pl-2 font-semibold text-blue-900">
                Exercise {idx + 1}:
              </label>
              <select
                  className="border-b-2 border-dashed border-slate-300 px-2 py-1 mr-4 bg-transparent focus:outline-none focus:border-blue-400 transition-colors"
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
                sets={exercise.sets}
                onSetsChange={sets => handleSetsChange(idx, sets)}
              />
            </div>
          ))}

          {/* Save Button */}
          <button
            type="submit"
            className="
            py-3 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
          >
            Save Workout
          </button>
        </div>
      </div>
    </form>
  );
}

export default WorkoutForm;