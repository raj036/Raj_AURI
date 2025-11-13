// import React from "react";

// const MetricCard = ({ title, value, suffix }) => {
//   return (
//     <div className="metric-card">
//       <h4>{title}</h4>
//       <p>{value}{suffix}</p>
//     </div>
//   );
// };

// export default MetricCard;

import React from "react";

const MetricCard = ({ label, value, color }) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex flex-col items-center">
      <span className={`text-lg font-bold ${color}`}>{value}</span>
      <span className="text-gray-600">{label}</span>
    </div>
  );
};

export default MetricCard;
