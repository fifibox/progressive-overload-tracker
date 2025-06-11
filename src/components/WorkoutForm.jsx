import React, { useState } from 'react';
import ExerciseForm from './ExerciseForm.jsx';
import { Dumbbell, Plus, X } from 'lucide-react';

const defaultExerciseOptions = [
  'Squat',
  'Bench Press',
  'Deadlift',
  'Biceps Curl',
  'Triceps Extension',
  'Lat Pulldown',
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
  const [exerciseOptions, setExerciseOptions] = useState(() => {
    const local = localStorage.getItem('exerciseOptions');
    return local ? JSON.parse(local) : defaultExerciseOptions;
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [pendingIdx, setPendingIdx] = useState(null);
  const [newExerciseName, setNewExerciseName] = useState('');

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

    // 查找是否有同一天
    const existingIdx = prev.findIndex(w => w.date === workout.date);

    if (existingIdx !== -1) {
      // 合并exercise
      const existingWorkout = prev[existingIdx];
      workout.exercises.forEach(newEx => {
        const existExIdx = existingWorkout.exercises.findIndex(ex => ex.name === newEx.name);
        if (existExIdx !== -1) {
          // 合并sets
          existingWorkout.exercises[existExIdx].sets = [
            ...existingWorkout.exercises[existExIdx].sets,
            ...newEx.sets
          ];
        } else {
          // 新exercise，直接加进去
          existingWorkout.exercises.push(newEx);
        }
      });
      prev[existingIdx] = existingWorkout;
      localStorage.setItem('workouts', JSON.stringify(prev));
    } else {
      // 没有同一天，直接新增
      localStorage.setItem('workouts', JSON.stringify([...prev, workout]));
    }

    resetForm(setExercises, setDate);
    alert('Workout saved!');
  };

  // 打开弹窗
  const handleAddNewExercise = (idx) => {
    setPendingIdx(idx);
    setNewExerciseName('');
    setShowAddModal(true);
  };

  // 确认添加
  const handleConfirmAdd = () => {
    if (
      newExerciseName &&
      !exerciseOptions.includes(newExerciseName.trim())
    ) {
      const updated = [...exerciseOptions, newExerciseName.trim()];
      setExerciseOptions(updated);
      localStorage.setItem('exerciseOptions', JSON.stringify(updated));
      handleNameChange(pendingIdx, newExerciseName.trim());
    }
    setShowAddModal(false);
  };

  // 取消添加
  const handleCancelAdd = () => {
    setShowAddModal(false);
  };

  return (
    <>
      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
            <button
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-700"
              onClick={handleCancelAdd}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-3 text-blue-900">Add New Exercise</h2>
            <input
              type="text"
              className="w-full border-b-2 border-blue-300 focus:border-blue-500 outline-none px-2 py-1 mb-4"
              placeholder="Enter exercise name"
              value={newExerciseName}
              onChange={e => setNewExerciseName(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-700"
                onClick={handleCancelAdd}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold disabled:bg-blue-200"
                onClick={handleConfirmAdd}
                disabled={!newExerciseName.trim() || exerciseOptions.includes(newExerciseName.trim())}
                type="button"
              >
                Add
              </button>
            </div>
            {exerciseOptions.includes(newExerciseName.trim()) && (
              <div className="text-xs text-red-500 mt-2">This exercise already exists.</div>
            )}
          </div>
        </div>
      )}

      {/* 原有表单内容 */}
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
              <div key={idx} className="mb-4 pt-4 pb-4 px-4 bg-white/80 rounded-xl shadow flex flex-col gap-2 border border-slate-100">
                <label className="mr-2 pl-2 font-semibold text-blue-900">
                  Exercise {idx + 1}:
                </label>
                <select
                  className="border-b-2 border-dashed border-slate-300 px-2 py-1 mr-4 bg-transparent focus:outline-none focus:border-blue-400 transition-colors"
                  value={exercise.name}
                  onChange={e => {
                    if (e.target.value === '__add_new__') {
                      handleAddNewExercise(idx);
                    } else {
                      handleNameChange(idx, e.target.value);
                    }
                  }}
                  required
                >
                  <option value="" disabled>Select exercise</option>
                  {exerciseOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                  <option value="__add_new__">+ Add new exercise</option>
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
    </>
  );
}

export default WorkoutForm;