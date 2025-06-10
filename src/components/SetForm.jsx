import { useState, useEffect } from 'react';

function SetForm({ value = {}, onChange }) {
  // 初始化 state，包含 rep, weight, volume
  const [set, setSet] = useState({
    rep: value.rep || '',
    weight: value.weight || '',
    volume: value.volume || 0,
  });

  // 只要 rep 或 weight 变化就自动计算 volume，并通知父组件
  useEffect(() => {
    const rep = Number(set.rep);
    const weight = Number(set.weight);
    const validRep = Number.isInteger(rep) && rep > 0;
    const validWeight = !isNaN(weight) && weight > 0;
    const volume = validRep && validWeight ? (rep * weight).toFixed(2) : 0;
    if (set.volume !== volume) {
      setSet(prev => ({ ...prev, volume }));
      if (onChange) onChange({ ...set, volume });
    } else {
      if (onChange) onChange(set);
    }
    // eslint-disable-next-line
  }, [set.rep, set.weight]);

  // 只允许正整数 rep 和正浮点数 weight
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rep') {
      if (/^\d*$/.test(value)) {
        setSet(prev => ({ ...prev, rep: value }));
      }
    } else if (name === 'weight') {
      if (/^\d*\.?\d*$/.test(value)) {
        setSet(prev => ({ ...prev, weight: value }));
      }
    }
  };

  return (
    <div className="flex items-center gap-7 mt-3 mb-3">
      <label>
        <span className="mr-2">Rep:</span>
        <input
          type="number"
          name="rep"
          value={set.rep || ''}
          onChange={handleChange}
          className="px-2 py-1 bg-slate-200 border border-slate-500 rounded-sm"
        />
      </label>
      <label>
        <span className="mr-2">Weight(kg):</span>
        <input
          type="number"
          name="weight"
          value={set.weight || ''}
          onChange={handleChange}
          className="px-2 py-1 bg-slate-200 border border-slate-500 rounded-sm"
        />
      </label>
      <span className='mr-10 text-cyan-700'>Volume: {set.rep && set.weight ? (set.rep * set.weight).toFixed(0) + ' kg' : '  '}</span>
    </div>
  );
}

export default SetForm;