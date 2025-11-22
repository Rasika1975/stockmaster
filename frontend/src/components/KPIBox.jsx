const KPIBox = ({ label, number }) => {
  return (
    <div className="bg-blue-100 p-5 rounded-xl text-center">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-3xl font-bold mt-2">{number}</p>
    </div>
  );
};

export default KPIBox;
