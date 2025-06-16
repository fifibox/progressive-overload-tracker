function SetForm({ value = {}, onChange }) {
  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    let newSet = { ...value, [name]: inputValue };

    // Volume calculation
    const rep = Number(newSet.rep);
    const weight = Number(newSet.weight);
    const validRep = Number.isInteger(rep) && rep > 0;
    const validWeight = !isNaN(weight) && weight > 0;
    newSet.volume = validRep && validWeight ? rep * weight : 0;

    if (onChange) onChange(newSet);
  };

  return (
    <div className="flex items-center gap-7 mt-3 mb-3">
      <label>
        <span className="mr-2">Rep:</span>
        <input
          type="number"
          inputMode="numeric"
          name="rep"
          value={value.rep || ''}
          onChange={handleChange}
          required
          min ="1"
          className="w-14 md:w-auto px-2 py-1 bg-slate-200 border border-slate-500 rounded-sm"
        />
      </label>
      <label>
        <span className="mr-2">Weight:</span>
        <input
          type="number"
          inputMode="numeric"
          name="weight"
          value={value.weight || ''}
          onChange={handleChange}
          required
          min="0.1"
          step="0.1"
          className="w-14 sm:w-30 md:w-auto px-2 py-1 bg-slate-200 border border-slate-500 rounded-sm"
        />
      </label>
      <span>kg</span>
      <span className="hidden sm:inline  text-cyan-700">
        Volume: {value.rep && value.weight ? (value.rep * value.weight).toFixed(0) + ' kg' : '  '}
      </span>
    </div>
  );
}

export default SetForm;