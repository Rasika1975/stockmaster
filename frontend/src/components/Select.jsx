const Select = ({ label, options = [], value, onChange, name }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-gray-600">{label}</label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        className="w-full p-2 border rounded"
      >
        
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
