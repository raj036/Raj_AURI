// import React from "react";
// import "./Tabs.css";

// const Tabs = ({ tabs, activeTab, onTabChange }) => {
//   return (
//     <div className="tabs-container">
//       {tabs.map((tab, index) => (
//         <div
//           key={index}
//           className={`tab-item ${activeTab === index ? "active" : ""}`}
//           onClick={() => onTabChange(index)}
//         >
//           {tab}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Tabs;

// import React from "react";

// const Tabs = ({ options, selected, onChange }) => {
//   return (
//     <div className="tabs">
//       {options.map((opt) => (
//         <button
//           key={opt}
//           className={`tab-btn ${selected === opt ? "active" : ""}`}
//           onClick={() => onChange(opt)}
//         >
//           {opt}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Tabs;

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
