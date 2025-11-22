const Select = ({ label, options = [], value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-gray-600">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select…</option>
        {options.map((op, i) => (
          <option key={i} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
