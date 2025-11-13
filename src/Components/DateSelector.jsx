// import React from "react";

// const DateSelector = ({ onChange }) => {
//   return <input type="date" onChange={(e) => onChange(e.target.value)} />;
// };

// export default DateSelector;

import React from "react";

const DateSelector = ({ onSelect }) => {
  return (
    <button
      className="px-3 py-1 border rounded text-sm"
      onClick={() => onSelect && onSelect()}
    >
      Select dates
    </button>
  );
};

export default DateSelector;
