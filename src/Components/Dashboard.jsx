import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TaskDashboard from "../Components/TaskDashboard.jsx"; 
import BranchDashboard from "../Components/Branch-Dashboard/BranchDashboard.jsx";
import AccountDashboard from "../Components/Accounts-Dashboard/AccountDashboard.jsx";
import SalesDashboard from "../Components/Sales-Dashboard/SalesDashboard.jsx";
import SuperAdminDashboard from "../Components/Super-Admin-Dashboard/SuperAdminDashboard.jsx";

const DashboardPage = () => {
  
  const userRole = "Manager"; 
  let DashboardComponent;
  
  switch (userRole) {
    case "Admin":
      DashboardComponent = SuperAdminDashboard;
      break;
    case "Manager":
      DashboardComponent = TaskDashboard; 
      break;
    case "ACCOUNTMANAGER":
      DashboardComponent = AccountDashboard;
      break;
    case "BranchADMIN":
      DashboardComponent = BranchDashboard;
      break;
    case "SalesADMIN":
      DashboardComponent = SalesDashboard;
      break;
    default:
      DashboardComponent = TaskDashboard; 
  }

  return <DashboardComponent />;
};

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
};

export default Dashboard;
