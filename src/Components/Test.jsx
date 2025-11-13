// // // ServicePerformance.jsx
// // import React, { useMemo, useState } from "react";
// // import Select, { components } from "react-select";
// // import { Line } from "react-chartjs-2";

// // /**
// //  * ServicePerformance
// //  * - Safe: avoids `.map` on undefined by providing defaults
// //  * - UI: react-select multi with checkboxes + Days tabs
// //  * - Chart: builds datasets from provided branchData or falls back to sample data
// //  *
// //  * Usage:
// //  * <ServicePerformance
// //  *   branches={["HSR","Kormangala","Rajaji Nagar"]}
// //  *   branchData={{
// //  *     "HSR": [400,420,440,...],
// //  *     "Kormangala": [200,210,230,...],
// //  *     ...
// //  *   }}
// //  * />
// //  *
// //  * If you don't pass props it will use internal sample data.
// //  */

// // // ----------------- DaysTabs -----------------
// // const DaysTabs = ({ value, onChange }) => {
// //   const [active, setActive] = useState(value ?? "30");

// //   const tabs = [
// //     { label: "Today", value: "1" },
// //     { label: "7 days", value: "7" },
// //     { label: "30 days", value: "30" },
// //     { label: "6 months", value: "180" },
// //     { label: "12 months", value: "365" },
// //   ];

// //   const handleClick = (val) => {
// //     setActive(val);
// //     onChange && onChange(val);
// //   };

// //   return (
// //     <div className="d-flex gap-2">
// //       {tabs.map((tab) => (
// //         <button
// //           key={tab.value}
// //           onClick={() => handleClick(tab.value)}
// //           className={`px-3 py-1 rounded border fw-semibold ${
// //             active === tab.value
// //               ? "bg-primary text-white border-primary"
// //               : "bg-white text-muted border"
// //           }`}
// //         >
// //           {tab.label}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // };

// // // ----------------- Custom Option for react-select -----------------
// // const Option = (props) => {
// //   return (
// //     <components.Option {...props}>
// //       <input
// //         type="checkbox"
// //         checked={props.isSelected}
// //         onChange={() => null}
// //         style={{ marginRight: 8 }}
// //       />
// //       <label>{props.label}</label>
// //     </components.Option>
// //   );
// // };

// // // ----------------- Main Component -----------------
// // const Test = ({
// //   branches: branchesProp,
// //   branchData: branchDataProp,
// //   initialSelected = [],
// // }) => {
// //   // default branches if none passed
// //   const defaultBranches = [
// //     "HSR",
// //     "Kormangala",
// //     "Rajaji Nagar",
// //     "BTM",
// //     "HSR Sec 2",
// //     "Hightech City",
// //   ];

// //   // default branch numeric data (12 months) if none passed
// //   const defaultBranchData = {
// //     HSR: [420, 430, 450, 460, 470, 480, 500, 520, 540, 530, 550, 560],
// //     Kormangala: [280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390],
// //     "Rajaji Nagar": [180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290],
// //     BTM: [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230],
// //     "HSR Sec 2": [90, 100, 110, 120, 125, 130, 140, 150, 160, 165, 170, 175],
// //     "Hightech City": [60, 70, 80, 90, 95, 100, 110, 120, 130, 140, 150, 160],
// //   };

// //   // use provided or defaults (guards against undefined)
// //   const branchesList = Array.isArray(branchesProp)
// //     ? branchesProp
// //     : defaultBranches;

// //   const branchData = branchDataProp && typeof branchDataProp === "object"
// //     ? branchDataProp
// //     : defaultBranchData;

// //   // react-select options (safe)
// //   const options = useMemo(
// //     () => (branchesList || []).map((b) => ({ value: b, label: b })),
// //     [branchesList]
// //   );

// //   // selected branches state: store as array of option objects
// //   const [selectedOptions, setSelectedOptions] = useState(
// //     // initialize from initialSelected values (strings) if provided
// //     Array.isArray(initialSelected) && initialSelected.length
// //       ? options.filter((o) => initialSelected.includes(o.value))
// //       : [options[0], options[1]].filter(Boolean) // default two selected if available
// //   );

// //   // days range state (not used to filter data here but provided)
// //   const [range, setRange] = useState("30");

// //   // months labels (12 months) - chart uses these
// //   const months = [
// //     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
// //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
// //   ];

// //   // color palette
// //   const palette = [
// //     "#2563eb", // blue
// //     "#10b981", // green
// //     "#f97316", // orange
// //     "#ef4444", // red
// //     "#8b5cf6", // purple
// //     "#06b6d4", // teal
// //   ];

// //   // build datasets safely from selected options, fallback to a small placeholder if none selected
// //   const datasets = (selectedOptions || []).map((opt, idx) => {
// //     // try to find data for this branch (array of numbers). If missing, fallback to default or generate small array
// //     const dataArray =
// //       (branchData && branchData[opt.value]) ||
// //       defaultBranchData[opt.value] ||
// //       // fallback random-ish but stable pattern
// //       months.map((_, i) => Math.round((Math.sin((idx + 1) * (i + 1) / 3) + 1) * 200 + 100));

// //     return {
// //       label: opt.label,
// //       data: dataArray,
// //       borderColor: palette[idx % palette.length],
// //       backgroundColor: palette[idx % palette.length],
// //       tension: 0.25,
// //       pointRadius: 0,
// //       pointHoverRadius: 6,
// //       pointHoverBackgroundColor: "#fff",
// //       pointHoverBorderColor: palette[idx % palette.length],
// //       borderWidth: 2,
// //     };
// //   });

// //   // if no selected options, create a subtle placeholder dataset to avoid Chart errors
// //   const finalDatasets = datasets.length ? datasets : [{
// //     label: "No branches selected",
// //     data: months.map(() => 0),
// //     borderColor: "#E5E7EB",
// //     backgroundColor: "#E5E7EB",
// //     pointRadius: 0,
// //     tension: 0.25,
// //   }];

// //   // line chart data object (safe)
// //   const lineChartData = {
// //     labels: months,
// //     datasets: finalDatasets,
// //   };

// //   // chart options (basic)
// //   const lineChartOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: { display: selectedOptions.length > 0 },
// //       tooltip: { mode: "index", intersect: false },
// //     },
// //     interaction: { mode: "nearest", axis: "x", intersect: false },
// //     scales: {
// //       x: {
// //         grid: { color: "#f0f0f0", drawBorder: false, drawTicks: false },
// //       },
// //       y: {
// //         beginAtZero: true,
// //         grid: { color: "#f8f8f8" },
// //       },
// //     },
// //   };

// //   // handler
// //   const handleBranchSelect = (selected) => {
// //     // selected may be null -> set empty array
// //     setSelectedOptions(selected || []);
// //   };

// //   const removeBranch = (branchValue) => {
// //     setSelectedOptions((prev = []) => prev.filter((o) => o.value !== branchValue));
// //   };

// //   return (
// //     <div className="border rounded p-4">
// //       {/* header */}
// //       <div className="d-flex justify-content-between align-items-start">
// //         <div>
// //           <p className="fw-bold mb-1">Service Performance</p>
// //           <small className="text-muted">Compare branches over months</small>
// //         </div>

// //         <div style={{ width: 360, minWidth: 220 }}>
// //           <Select
// //             isMulti
// //             closeMenuOnSelect={false}
// //             hideSelectedOptions={false}
// //             components={{ Option }}
// //             options={options}
// //             value={selectedOptions}
// //             onChange={handleBranchSelect}
// //             placeholder="Select Branch to compare"
// //             classNamePrefix="branch-select"
// //             styles={{
// //               menu: (provided) => ({ ...provided, zIndex: 9999 })
// //             }}
// //           />
// //         </div>
// //       </div>

// //       {/* selected chips + days tabs row */}
// //       <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-3">
// //         <div className="d-flex gap-2 align-items-center flex-wrap">
// //           {(selectedOptions || []).map((opt) => (
// //             <span
// //               key={opt.value}
// //               className="px-2 py-1 bg-light border rounded d-flex align-items-center"
// //             >
// //               <span className="me-2">{opt.label}</span>
// //               <button
// //                 onClick={() => removeBranch(opt.value)}
// //                 className="btn btn-sm btn-light border-0"
// //                 aria-label={`remove ${opt.label}`}
// //                 style={{ lineHeight: 1 }}
// //               >
// //                 ×
// //               </button>
// //             </span>
// //           ))}
// //         </div>

// //         <div>
// //           <DaysTabs value={range} onChange={(val) => setRange(val)} />
// //         </div>
// //       </div>

// //       {/* chart */}
// //       <div className="mt-4" style={{ height: 320 }}>
// //         <Line data={lineChartData} options={lineChartOptions} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Test;

// // import React, { useState } from "react";
// // import Select, { components } from "react-select";
// // import { Line } from "react-chartjs-2";

// // const branches = [
// //   "HSR",
// //   "Kormangala",
// //   "Rajaji Nagar",
// //   "BTM",
// //   "HSR Sec 2",
// //   "Hightech City",
// // ];

// // // Custom option with checkbox
// // const Option = (props) => {
// //   return (
// //     <components.Option {...props}>
// //       <input
// //         type="checkbox"
// //         checked={props.isSelected}
// //         onChange={() => null}
// //         style={{ marginRight: 8 }}
// //       />
// //       <label>{props.label}</label>
// //     </components.Option>
// //   );
// // };

// // const Test = () => {
// //   const [selectedBranches, setSelectedBranches] = useState([]);

// //   const handleBranchSelect = (selectedOptions) => {
// //     setSelectedBranches(selectedOptions || []);
// //   };

// //   const lineChartData = {
// //     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
// //     datasets: selectedBranches.map((branch, idx) => ({
// //       label: branch.label,
// //       data: Array.from({ length: 9 }, () =>
// //         Math.floor(Math.random() * 900 + 100)
// //       ),
// //       borderColor: ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"][
// //         idx % 5
// //       ],
// //       borderWidth: 2,
// //       fill: false,
// //       tension: 0.3,
// //     })),
// //   };

// //   const lineChartOptions = {
// //     responsive: true,
// //     plugins: {
// //       legend: { display: true, position: "bottom" },
// //       tooltip: { mode: "index", intersect: false },
// //     },
// //     interaction: { mode: "nearest", axis: "x", intersect: false },
// //     scales: {
// //       y: { beginAtZero: true },
// //     },
// //   };

// //   return (
// //     <div className="border rounded p-4">
// //       <div className="d-flex justify-content-between align-items-start">
// //         <p className="fw-bold">Service Performance</p>
// //         <div style={{ width: "300px" }}>
// //           <Select
// //             isMulti
// //             closeMenuOnSelect={false}
// //             hideSelectedOptions={false}
// //             components={{ Option }}
// //             options={branches.map((b) => ({ value: b, label: b }))}
// //             value={selectedBranches}
// //             onChange={handleBranchSelect}
// //             placeholder="Select Branch to compare"
// //             classNamePrefix="branch-select"
// //           />
// //         </div>
// //       </div>

// //       <div className="mt-4" style={{ height: "300px" }}>
// //         <Line data={lineChartData} options={lineChartOptions} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Test;

// // ServicePerformance.jsx
// import React, { useMemo, useState } from "react";
// import Select, { components } from "react-select";
// import { Line } from "react-chartjs-2";

// // ----------------- DaysTabs -----------------
// const DaysTabs = ({ value, onChange }) => {
//   const [active, setActive] = useState(value ?? "30");

//   const tabs = [
//     { label: "Today", value: "1" },
//     { label: "7 days", value: "7" },
//     { label: "30 days", value: "30" },
//     { label: "6 months", value: "180" },
//     { label: "12 months", value: "365" },
//   ];

//   const handleClick = (val) => {
//     setActive(val);
//     onChange && onChange(val);
//   };

//   return (
//     <div className="d-flex gap-2">
//       {tabs.map((tab) => (
//         <button
//           key={tab.value}
//           onClick={() => handleClick(tab.value)}
//           className={`px-3 py-1 rounded border fw-semibold ${
//             active === tab.value
//               ? "bg-primary text-white border-primary"
//               : "bg-white text-muted border"
//           }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// // ----------------- Custom Option for react-select -----------------
// const Option = (props) => {
//   return (
//     <components.Option {...props}>
//       <input
//         type="checkbox"
//         checked={props.isSelected}
//         onChange={() => null}
//         style={{ marginRight: 8 }}
//       />
//       <label>{props.label}</label>
//     </components.Option>
//   );
// };

// // ----------------- Main Component -----------------
// const Test = ({
//   branches: branchesProp,
//   branchData: branchDataProp,
//   initialSelected = [],
// }) => {
//   const defaultBranches = [
//     "HSR",
//     "Kormangala",
//     "Rajaji Nagar",
//     "BTM",
//     "HSR Sec 2",
//     "Hightech City",
//   ];

//   const defaultBranchData = {
//     HSR: [420, 430, 450, 460, 470, 480, 500, 520, 540, 530, 550, 560],
//     Kormangala: [280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390],
//     "Rajaji Nagar": [180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290],
//     BTM: [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230],
//     "HSR Sec 2": [90, 100, 110, 120, 125, 130, 140, 150, 160, 165, 170, 175],
//     "Hightech City": [60, 70, 80, 90, 95, 100, 110, 120, 130, 140, 150, 160],
//   };

//   const branchesList = Array.isArray(branchesProp) ? branchesProp : defaultBranches;
//   const branchData =
//     branchDataProp && typeof branchDataProp === "object"
//       ? branchDataProp
//       : defaultBranchData;

//   const options = useMemo(
//     () => (branchesList || []).map((b) => ({ value: b, label: b })),
//     [branchesList]
//   );

//   const [selectedOptions, setSelectedOptions] = useState(
//     Array.isArray(initialSelected) && initialSelected.length
//       ? options.filter((o) => initialSelected.includes(o.value))
//       : [options[0], options[1]].filter(Boolean)
//   );

//   const [range, setRange] = useState("30");

//   const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//   ];

//   const palette = ["#2563eb", "#10b981", "#f97316", "#ef4444", "#8b5cf6", "#06b6d4"];

//   const datasets = (selectedOptions || []).map((opt, idx) => {
//     const dataArray =
//       (branchData && branchData[opt.value]) ||
//       defaultBranchData[opt.value] ||
//       months.map((_, i) =>
//         Math.round((Math.sin((idx + 1) * (i + 1) / 3) + 1) * 200 + 100)
//       );

//     return {
//       label: opt.label,
//       data: dataArray,
//       borderColor: palette[idx % palette.length],
//       backgroundColor: palette[idx % palette.length],
//       tension: 0.25,
//       pointRadius: 0,
//       pointHoverRadius: 6,
//       pointHoverBackgroundColor: "#fff",
//       pointHoverBorderColor: palette[idx % palette.length],
//       borderWidth: 2,
//     };
//   });

//   const finalDatasets = datasets.length
//     ? datasets
//     : [
//         {
//           label: "No branches selected",
//           data: months.map(() => 0),
//           borderColor: "#E5E7EB",
//           backgroundColor: "#E5E7EB",
//           pointRadius: 0,
//           tension: 0.25,
//         },
//       ];

//   const lineChartData = { labels: months, datasets: finalDatasets };

//   const lineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: selectedOptions.length > 0 },
//       tooltip: {
//         mode: "nearest",
//         intersect: false,
//         // Only show tooltip for the hovered dataset
//         filter: function (tooltipItem) {
//           return tooltipItem.datasetIndex === tooltipItem.datasetIndex;
//         },
//       },
//     },
//     interaction: { mode: "nearest", axis: "x", intersect: false },
//     scales: {
//       x: { grid: { color: "#f0f0f0", drawBorder: false, drawTicks: false } },
//       y: { beginAtZero: true, grid: { color: "#f8f8f8" } },
//     },
    
//   };

//   const handleBranchSelect = (selected) => setSelectedOptions(selected || []);

//   return (
//     <div className="border rounded p-4">
//       {/* header */}
//       <div className="d-flex justify-content-between align-items-start">
//         <div>
//           <p className="fw-bold mb-1">Service Performance</p>
//           <small className="text-muted">Compare branches over months</small>
//         </div>

//         <div style={{ width: 360, minWidth: 220 }}>
//           <Select
//             isMulti
//             closeMenuOnSelect={false}
//             hideSelectedOptions={false}
//             components={{ Option }}
//             options={options}
//             value={selectedOptions}
//             onChange={handleBranchSelect}
//             placeholder="Select Branch to compare"
//             classNamePrefix="branch-select"
//             styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
//           />
//         </div>
//       </div>

//       {/* days tabs only */}
//       <div className="d-flex justify-content-end mt-3">
//         <DaysTabs value={range} onChange={(val) => setRange(val)} />
//       </div>

//       {/* chart */}
//       <div className="mt-4" style={{ height: 320 }}>
//         <Line data={lineChartData} options={lineChartOptions} />
//       </div>
//     </div>
//   );
// };

// export default Test;

// import React, { useRef, useEffect } from "react";
// import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler } from "chart.js";

// Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler);

// const CustomerAcquisitionRate = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");

//     // Create gradient fills for each section
//     const gradient1 = ctx.createLinearGradient(0, 0, 0, 180);
//     gradient1.addColorStop(0, "#cfe9ff");
//     gradient1.addColorStop(1, "#cfe9ff");

//     const gradient2 = ctx.createLinearGradient(0, 0, 0, 180);
//     gradient2.addColorStop(0, "#4aa6ff");
//     gradient2.addColorStop(1, "#4aa6ff");

//     const gradient3 = ctx.createLinearGradient(0, 0, 0, 180);
//     gradient3.addColorStop(0, "#0f57d6");
//     gradient3.addColorStop(1, "#0f57d6");

//     const chart = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: ["Lead", "Quotation", "Order"],
//         datasets: [
//           {
//             label: "Customer Acquisition Rate",
//             data: [673, 486, 105],
//             fill: true,
//             borderColor: "transparent",
//             backgroundColor: (context) => {
//               const i = context.dataIndex;
//               if (i === 0) return gradient1;
//               if (i === 1) return gradient2;
//               return gradient3;
//             },
//             tension: 0.6,
//             pointRadius: 0,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//           x: {
//             grid: { display: false },
//             ticks: { color: "#6b7280", font: { size: 14 } },
//           },
//           y: { display: false },
//         },
//         plugins: {
//           legend: { display: false },
//           tooltip: { enabled: false },
//         },
//       },
//     });

//     return () => chart.destroy();
//   }, []);

//   return (
//     <div
//       style={{
//         background: "#fff",
//         borderRadius: "12px",
//         padding: "16px",
//         border: "1px solid #e5e7eb",
//         boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
//       }}
//     >
//       <h6 style={{ fontWeight: 600, color: "#111827" }}>
//         Customer Acquisition Rate
//       </h6>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           padding: "0 8px",
//           marginBottom: "4px",
//         }}
//       >
//         <div style={{ textAlign: "center" }}>
//           <div style={{ fontSize: "20px", fontWeight: "700" }}>673</div>
//           <div style={{ color: "#6b7280" }}>Lead</div>
//         </div>
//         <div style={{ textAlign: "center" }}>
//           <div style={{ fontSize: "20px", fontWeight: "700" }}>486</div>
//           <div style={{ color: "#6b7280" }}>Quotation</div>
//         </div>
//         <div style={{ textAlign: "center" }}>
//           <div style={{ fontSize: "20px", fontWeight: "700" }}>105</div>
//           <div style={{ color: "#6b7280" }}>Order</div>
//         </div>
//       </div>
//       <div style={{ height: "100px", marginTop: "10px" }}>
//         <canvas ref={chartRef}></canvas>
//       </div>
//     </div>
//   );
// };

// export default CustomerAcquisitionRate;

//working code
import React, { useState } from "react";
import "./Dashboard.css";

const ProgressBar = ({ achievedPercent = 74, remaining = "₹ 2,47,886", daysLeft = 54 }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="progress-card shadow-sm rounded-4 d-flex flex-column p-4 gap-3 flex-grow-1">
      <h6 className="progress-title">Progress bar Target vs Actual</h6>

      <div className="progress-bar-container">
        <span className="progress-label">0%</span>
        <div
          className="progress-bar-track"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div
            className="progress-bar-fill"
            style={{ width: `${achievedPercent}%` }}
          >
            {showTooltip && (
              <div className="progress-tooltip">
                <strong>Target Achieved</strong>
                <div>{achievedPercent}%</div>
              </div>
            )}
          </div>
        </div>
        <span className="progress-label">100%</span>
      </div>

      <div className="progress-info">
        <div>
          <p className="progress-subtitle">Remaining</p>
          <h6 className="progress-value">{remaining}</h6>
        </div>
        <div className="text-end">
          <p className="progress-subtitle">Days Left</p>
          <h6 className="progress-value">{daysLeft}</h6>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;



