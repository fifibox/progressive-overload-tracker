import SetForm from './SetForm.jsx';
import React, { useEffect } from 'react';
import { Plus } from 'lucide-react';

function ExerciseForm({ sets = [], onSetsChange }) {
  // 初始渲染时自动添加一个 set
  useEffect(() => {
    if (sets.length === 0) {
      onSetsChange([{ rep: '', weight: '', volume: 0 }]);
    }
    // 只在初始渲染时运行
    // eslint-disable-next-line
  }, []);

  const addSet = () => {
    onSetsChange([...sets, { rep: '', weight: '', volume: 0 }]);
  };

  const handleSetChange = (idx, set) => {
    const newSets = sets.map((item, i) => (i === idx ? set : item));
    onSetsChange(newSets);
  };

  // 计算总 volume
  const totalVolume = sets.reduce((sum, s) => sum + (Number(s.volume) || 0), 0);

  return (
    <div className='bg-gray-300 p-4 rounded-lg mb-4'>
      {sets.map((set, idx) => (
        <SetForm
          key={idx}
          value={set}
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
          Add Set
        </button>
        <div className='bg-red-100 px-3 py-1.5 rounded-md'>
          <span className='text-blue-700'> Total Volume: {totalVolume.toFixed(0) + ' kg'}</span>
        </div>
      </div>
    </div>
  );
}

export default ExerciseForm;