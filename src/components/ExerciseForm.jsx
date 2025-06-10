import SetForm from './SetForm.jsx';
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

function ExerciseForm({ onSetsChange }) {
  const [forms, setForms] = useState([0]);
  const [sets, setSets] = useState([{ rep: '', weight: '', volume: 0 }]);

  const addSet = () => {
    setForms(prev => [...prev, prev.length]);
    setSets(prev => [...prev, { rep: '', weight: '', volume: 0 }]);
  };

  // 更新某个 set
  const handleSetChange = (idx, set) => {
    setSets(prev =>
      prev.map((item, i) => (i === idx ? set : item))
    );
  };

  // 每次 sets 变化都传给父组件
  useEffect(() => {
    if (onSetsChange) onSetsChange(sets);
  }, [sets, onSetsChange]);

  // 计算总 volume
  const totalVolume = sets.reduce((sum, s) => sum + (Number(s.volume) || 0), 0);

  return (
    <div className='bg-gray-300 p-4 rounded-lg mb-4'>
      {forms.map((_, idx) => (
        <SetForm
          key={idx}
          value={sets[idx]}
          onChange={value => handleSetChange(idx, value)}
        />
      ))}
      <div className='flex justify-between'>
        <button 
          type="button"
          onClick={addSet}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-white text-sm rounded-lg transition-colors"
        >
          <Plus className="w-3 h-3" />
          Add Rep
        </button>
        <div className='bg-red-100 px-3 py-1.5 rounded-md'>
          <span className='text-blue-700'> Total Volume: {totalVolume.toFixed(0) + ' kg'}</span>
        </div>
      </div>
    </div>
  );
}

export default ExerciseForm;