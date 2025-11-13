import React, { useState, useMemo } from "react";
import data from "../data/dashboardData.json";
import "./Dashboard.css";
import Layout from "./Layout/Layout";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Select, { components } from "react-select";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  elements,
} from "chart.js";
import MetricCard from "./MetricCard";
import Tabs from "./Tabs";
import DateSelector from "./DateSelector";
import BranchSelector from "./BranchSelector";
import QuickActionCard from "./QuickActionCard";
import OverTimeCard from "./OverTimeCard";
import ComplaintCard from "./ComplaintCard";
import SalesTaskCard from "./Sales-Dashboard/SalesTaskCard";
import Avatar from "../assets/Avatar.png";
import ServicePerformance from "./Company-Dashboard/ServicePerformance";
import ActionCard from "./Company-Dashboard/ActionCard";
import CompanyOverview from "./Company-Dashboard/CompanyOverview";
import FinancialDashboard from "./Company-Dashboard/FinancialDashboard";
import InventoryDashboard from "./Company-Dashboard/InventoryDashboard";
import SalesDashboard from "./Company-Dashboard/SalesDashboard";
import BranchPerformance from "./Company-Dashboard/BranchPerformance";
import ForcastDashboard from "./Company-Dashboard/ForcastDashboard";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const TaskDashboard = ({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) => {
  return (
   <Layout>
  <div
    className="p-0"
    style={{
      width: "83vw",
      maxWidth: "100%",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
      overflow: "visible",
    }}
  >
    <ActionCard />
    <SalesTaskCard />
    <CompanyOverview />
    <FinancialDashboard />
    <InventoryDashboard />
    <ServicePerformance data={data.servicePerformance} />
    <SalesDashboard />
    <BranchPerformance />
    <ForcastDashboard />
  </div>
</Layout>

  );
};

export default TaskDashboard;
