export const CardButton = ({ title, onClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded-xl p-4 mb-3 cursor-pointer hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">{title}</span>
        <span className="text-sm text-blue-600 font-semibold">›</span>
      </div>
    </div>
  );
};