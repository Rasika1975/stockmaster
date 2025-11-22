const Badge = ({ text, color = "blue" }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-white bg-${color}-600`}>
      {text}
    </span>
  );
};

export default Badge;
