// import React from "react";
// import data from "../../data/dashboardData.json";
// import Avatar from "../../assets/Avatar.png";
// import { Bar } from "react-chartjs-2";
// import { useState, useMemo } from "react";
// import Select, { components } from "react-select";
// import BranchFilter from "./BranchFilter";

// const ProductListItem = ({ item, rightLabel, rightLabelClass }) => (
//   <div className="prod-item d-flex align-items-start">
//     <div className=" flex-grow-1 d-flex align-items-center border-bottom py-2">
//       <img src={Avatar} alt="Avatar logo" height={50} width={50} />
//       <div className="d-flex justify-content-between flex-grow-1 ms-2 align-items-center">
//         <div className="d-flex flex-column align-items-start">
//           <div className="prod-title fw-semibold">{item.title}</div>
//           <div className="text-muted small d-flex flex-column ">
//             {item.brand} &nbsp; <span className="sku">{item.sku}</span>
//           </div>
//         </div>

//         <div
//           className={`prod-badge border rounded-pill px-2 ${
//             rightLabelClass || ""
//           }`}
//         >
//           {rightLabel}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Reusable Inventory Card Wrapper
// const InventoryCard = ({ title, children }) => (
//   <div className="col-lg-4 col-12 mb-3">
//     <div className="card h-100 shadow-sm rounded-3">
//       <div className="d-flex flex-column">
//         <div className="d-flex justify-content-between align-items-center">
//           <h6 className="fw-bold p-3 mb-0">{title}</h6>
//           <span className="material-symbols-outlined text-muted">
//             more_vert
//           </span>
//         </div>
//         <div className="task-scroll flex-grow-1 p-3">{children}</div>
//       </div>
//     </div>
//   </div>
// );

// function BranchInventoryDashboard({
//   branches: branchesProp,
//   branchData: branchDataProp,
//   initialSelected = [],
// }) {
//   const [selectedDate, setSelectedDate] = useState("Today");
//   const { dateTabs } = data;

//   const chartData2 = {
//     labels: [
//       "HSR",
//       "BTM",
//       "Rajaji Nagar",
//       "BTM",
//       "HSR Sec 2",
//       "Koramnagala",
//       "HSR",
//       "BTM",
//       "Belendur",
//       "Hightech City",
//       "Vega City",
//     ],
//     datasets: [
//       {
//         label: "Profit",
//         data: [100, 110, 90, 95, 85, 100, 110, 105, 100, 95, 105],
//         backgroundColor: "#2E90FA",
//         maxBarThickness: 40,
//       },
//     ],
//   };

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
//     "Rajaji Nagar": [
//       180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290,
//     ],
//     BTM: [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230],
//     "HSR Sec 2": [90, 100, 110, 120, 125, 130, 140, 150, 160, 165, 170, 175],
//     "Hightech City": [60, 70, 80, 90, 95, 100, 110, 120, 130, 140, 150, 160],
//   };

//   const branchesList = Array.isArray(branchesProp)
//     ? branchesProp
//     : defaultBranches;
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

//   const handleBranchSelect1 = (selected) => setSelectedOptions(selected || []);

//   // const Option = (props) => {
//   //   return (
//   //     <components.Option {...props}>
//   //       <input
//   //         type="checkbox"
//   //         checked={props.isSelected}
//   //         onChange={() => null}
//   //         style={{ marginRight: 8 }}
//   //       />
//   //       <label>{props.label}</label>
//   //     </components.Option>
//   //   );
//   // };

//   return (
//     <div className="card inventory-card shadow-sm rounded-3 mb-4">
//       <div className="card-body p-4">
//         <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-3">
//           <div>
//             <h5 className="fw-bold mb-1">Inventory Dashboard</h5>
//           </div>
//         </div>

//         {/* three nested cards */}
//         <div className="row mt-4">
//           <InventoryCard title="Top 5 Consumed Products">
//             {(data.inventory?.topConsumed || []).map((it, idx) => (
//               <ProductListItem
//                 key={idx}
//                 item={it}
//                 rightLabel={`${it.qty ?? ""} Qty`}
//                 rightLabelClass="qty-pill"
//               />
//             ))}
//           </InventoryCard>

//           <InventoryCard
//             title={`Low Stock Alerts (${
//               data.inventory?.lowStock?.length || 0
//             })`}
//           >
//             {(data.inventory?.lowStock || []).map((it, idx) => (
//               <ProductListItem
//                 key={idx}
//                 item={it}
//                 rightLabel={`${it.qty ?? ""} Qty`}
//                 rightLabelClass="qty-pill low text-danger border-danger bg-danger-subtle"
//               />
//             ))}
//           </InventoryCard>

//           <InventoryCard
//             title={`Expiring Chemicals (${
//               data.inventory?.expiring?.length || 0
//             })`}
//           >
//             {(data.inventory?.expiring || []).map((it, idx) => (
//               <ProductListItem
//                 key={idx}
//                 item={it}
//                 rightLabel={it.date}
//                 rightLabelClass="date-pill text-danger border-danger bg-danger-subtle"
//               />
//             ))}
//           </InventoryCard>
//         </div>

//         <div className="card-body border p-4 rounded-4">
//           <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
//             <div>
//               <h4 className="fw-bold mb-1">Consumption of chemicals</h4>
//               <p className="text-muted mb-0">Comparison of branches</p>
//             </div>
//             <div style={{ width: 360, minWidth: 220 }}>
//               {/* <p className="mb-1">Select Branch to compare</p> */}
//               {/* <Select
//                 isMulti
//                 closeMenuOnSelect={false}
//                 hideSelectedOptions={false}
//                 components={{ Option }}
//                 options={options}
//                 value={selectedOptions}
//                 onChange={handleBranchSelect1}
//                 placeholder="Select Branch to compare"
//                 classNamePrefix="branch-select"
//                 styles={{
//                   menu: (provided) => ({ ...provided, zIndex: 9999 }),
//                 }}
//               /> */}

//               <BranchFilter
//   options={options}
//   selectedOptions={selectedOptions}
//   onChange={handleBranchSelect1}
// />
//             </div>
//           </div>
//           {/* <BranchBarChartPlaceholder data={branchComparison.data} /> */}
//           <Bar
//             data={chartData2}
//             options={{
//               scales: {
//                 x: {
//                   stacked: true,
//                   grid: { display: false },
//                   ticks: {
//                     autoSkip: true, // allow skipping only when needed
//                     maxRotation: 45, // 👈 force labels to stay straight
//                     minRotation: 0, // 👈 prevent automatic rotation
//                     padding: 16,
//                   },
//                   title: {},
//                 },
//                 y: {
//                   stacked: true,
//                   title: {
//                     display: true,
//                     text: "Branch Performance in (₹)",
//                     font: { size: 13 },
//                   },
//                   ticks: {
//                     // 👇 Custom tick label formatting
//                     callback: function (value) {
//                       return `₹${value.toFixed(0)}L`; // adds “L” after each tick label
//                     },
//                   },
//                 },
//               },
//               elements: { bar: { borderRadius: 6 } },
//               plugins: {
//                 legend: {
//                   position: "top",
//                   align: "end",
//                   labels: {
//                     usePointStyle: true,
//                     pointStyle: "circle",
//                     boxWidth: 5,
//                     boxHeight: 5,
//                   },
//                 },
//                 tooltip: {
//                     backgroundColor: "#102A56",
//                     titleFont: { size: 13 },
//                     bodyFont: { size: 12 },
//                     padding: 10,
//                     displayColors: false,
//                     callbacks: {
//                         // 👇 Customize tooltip label
//                         label: function (context) {
//                             const label = context.dataset.label || "";
//                             const value = context.parsed.y;
//                             return `Chemicals used : ₹${value}L`;
//                         },
//                     },
//                 },
//               },
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BranchInventoryDashboard;

import React, { useState, useMemo } from "react";
import data from "../../data/dashboardData.json";
import Avatar from "../../assets/Avatar.png";
import { Bar } from "react-chartjs-2";
import BranchFilter from "./BranchFilter";

const ProductListItem = ({ item, rightLabel, rightLabelClass }) => (
  <div className="prod-item d-flex align-items-start">
    <div className="flex-grow-1 d-flex align-items-center border-bottom py-2">
      <img src={Avatar} alt="Avatar logo" height={50} width={50} />
      <div className="d-flex justify-content-between flex-grow-1 ms-2 align-items-center">
        <div className="d-flex flex-column align-items-start">
          <div className="prod-title fw-semibold">{item.title}</div>
          <div className="text-muted small d-flex flex-column">
            {item.brand} &nbsp; <span className="sku">{item.sku}</span>
          </div>
        </div>

        <div
          className={`prod-badge border rounded-pill px-2 ${
            rightLabelClass || ""
          }`}
        >
          {rightLabel}
        </div>
      </div>
    </div>
  </div>
);

// Reusable Inventory Card Wrapper
const InventoryCard = ({ title, children }) => (
  <div className="col-lg-4 col-12 mb-3">
    <div className="card h-100 shadow-sm rounded-3">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fw-bold p-3 mb-0">{title}</h6>
          <span className="material-symbols-outlined text-muted">
            more_vert
          </span>
        </div>
        <div className="task-scroll flex-grow-1 p-3">{children}</div>
      </div>
    </div>
  </div>
);

function BranchInventoryDashboard({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) {
  const [selectedDate, setSelectedDate] = useState("Today");

  // 🔹 Default data fallback
  const defaultBranches = [
    "HSR",
    "Kormangala",
    "Rajaji Nagar",
    "BTM",
    "HSR Sec 2",
    "Hightech City",
    "Praja Nagar",
    "Darbar Nagar",
    "Hightech City 1",
    "HSR Sec 3",
    "BTK",
  ];

  const defaultBranchData = {
    HSR: [100, 110, 90, 95, 85],
    Kormangala: [95, 100, 105, 90, 110],
    "Rajaji Nagar": [85, 90, 95, 100, 105],
    "Praja Nagar": [85, 90, 95, 100, 105],
    "Darbar Nagar": [85, 90, 95, 100, 105],
    BTM: [90, 92, 98, 100, 95],
    "HSR Sec 2": [80, 85, 90, 88, 95],
    "Hightech City": [100, 105, 110, 115, 120],
    BTK: [90, 92, 98, 100, 95],
    "HSR Sec 3": [80, 85, 90, 88, 95],
    "Hightech City 1": [100, 105, 110, 115, 120],
  };

  const branchesList = Array.isArray(branchesProp)
    ? branchesProp
    : defaultBranches;

  const branchData =
    branchDataProp && typeof branchDataProp === "object"
      ? branchDataProp
      : defaultBranchData;

  // 🔹 React-select options
  const options = useMemo(
    () => branchesList.map((b) => ({ value: b, label: b })),
    [branchesList]
  );

  const [selectedOptions, setSelectedOptions] = useState(
    Array.isArray(initialSelected) && initialSelected.length
      ? options.filter((o) => initialSelected.includes(o.value))
      : [options[0], options[1]].filter(Boolean)
  );

  const handleBranchSelect1 = (selected) => setSelectedOptions(selected || []);

  // 🔹 Chart data filtered dynamically
  const filteredLabels = selectedOptions.map((opt) => opt.value);
  const filteredData = filteredLabels.map(
    (label) => branchData[label]?.[0] || 0
  );

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Profit",
        data: filteredData,
        backgroundColor: "#2E90FA",
        maxBarThickness: 40,
      },
    ],
  };

  return (
    <div className="card inventory-card shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-3">
          <h5 className="fw-bold mb-1">Inventory Dashboard</h5>
        </div>

        {/* 🔹 Three summary cards */}
        <div className="row mt-4">
          <InventoryCard title="Top 5 Consumed Products">
            {(data.inventory?.topConsumed || []).map((it, idx) => (
              <ProductListItem
                key={idx}
                item={it}
                rightLabel={`${it.qty ?? ""} Qty`}
                rightLabelClass="qty-pill"
              />
            ))}
          </InventoryCard>

          <InventoryCard
            title={`Low Stock Alerts (${
              data.inventory?.lowStock?.length || 0
            })`}
          >
            {(data.inventory?.lowStock || []).map((it, idx) => (
              <ProductListItem
                key={idx}
                item={it}
                rightLabel={`${it.qty ?? ""} Qty`}
                rightLabelClass="qty-pill low text-danger border-danger bg-danger-subtle"
              />
            ))}
          </InventoryCard>

          <InventoryCard
            title={`Expiring Chemicals (${
              data.inventory?.expiring?.length || 0
            })`}
          >
            {(data.inventory?.expiring || []).map((it, idx) => (
              <ProductListItem
                key={idx}
                item={it}
                rightLabel={it.date}
                rightLabelClass="date-pill text-danger border-danger bg-danger-subtle"
              />
            ))}
          </InventoryCard>
        </div>

        {/* 🔹 Chart section */}
        <div className="card-body border p-4 rounded-4 mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <div>
              <h4 className="fw-bold mb-1">Consumption of Chemicals</h4>
              <p className="text-muted mb-0">Comparison of branches</p>
            </div>

            {/* 🔹 Reusable Filter */}
            <BranchFilter
              options={options}
              selectedOptions={selectedOptions}
              onChange={handleBranchSelect1}
            />
          </div>

          {/* 🔹 Dynamic Chart */}
          <Bar
            data={chartData}
            options={{
              responsive: true,
              elements: { bar: { borderRadius: 6 } },
              plugins: {
                datalabels: {
                  display: false,
                },
                legend: {
                  position: "top",
                  align: "end",
                  labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 5,
                    boxHeight: 5,
                  },
                },
                tooltip: {
                  backgroundColor: "#102A56",
                  titleFont: { size: 13 },
                  bodyFont: { size: 12 },
                  padding: 10,
                  displayColors: false,
                  callbacks: {
                    label: function (context) {
                      const value = context.parsed.y;
                      return `Chemicals used: ₹${value}L`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { padding: 8 },
                },
                y: {
                  title: {
                    display: true,
                    text: "Branch Performance (₹)",
                    font: { size: 13 },
                  },
                  ticks: {
                    callback: function (value) {
                      return `₹${value}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default BranchInventoryDashboard;
