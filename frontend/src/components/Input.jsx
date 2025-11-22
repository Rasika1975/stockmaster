const Input = ({ label, type = "text", value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default Input;
