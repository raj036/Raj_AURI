// import React from "react";

// const BranchSelector = ({ branches, selectedBranches, onChange }) => {
//   return (
//     <select
//       multiple
//       value={selectedBranches}
//       onChange={(e) =>
//         onChange([...e.target.selectedOptions].map((o) => o.value))
//       }
//     >
//       {branches.map((branch) => (
//         <option key={branch.name} value={branch.name}>
//           {branch.name}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default BranchSelector;

import React from "react";

const BranchSelector = ({ branches, selectedBranches, onAdd, onRemove }) => {
  return (
    <div className="flex space-x-2 mt-2">
      {selectedBranches.map((branch) => (
        <span
          key={branch}
          className="px-2 py-1 rounded-2 d-flex items-center space-x-1"
        >
          <span>{branch}</span>
          <button onClick={() => onRemove(branch)}>×</button>
        </span>
      ))}
      <select
        onChange={(e) => onAdd(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      >
        <option value="">Add branch...</option>
        {branches.map(
          (b) =>
            !selectedBranches.includes(b) && <option key={b}>{b}</option>
        )}
      </select>
    </div>
  );
};

export default BranchSelector;
