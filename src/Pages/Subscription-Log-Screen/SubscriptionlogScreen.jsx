import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../Components/Button";
import ViewDetailsDialog from "./ViewDetailsDialouge";

const companyData = [
  {
    accountid: "ACC001",
    customername: "Rajesh Mehta",
    customeremail: "info@technova.com",
    status: "Active",
    startdate: "2023-03-20",
    totalpaid: "₹50,000",
    users: "5 Techs / 2 Mgrs",
  },
  {
    accountid: "ACC002",
    customername: "Neha Gupta",
    customeremail: "support@finedgebank.com",
    status: "Active",
    startdate: "2022-09-01",
    totalpaid: "₹1,20,000",
    users: "5 Techs / 2 Mgrs",
  },
  {
    accountid: "ACC003",
    customername: "Amit Singh",
    customeremail: "contact@brightpathlogistics.com",
    status: "Inactive",
    startdate: "2022-01-01",
    totalpaid: "₹70,000",
    users: "5 Techs / 2 Mgrs",
  },
  {
    accountid: "ACC004",
    customername: "Ravi Iyer",
    customeremail: "hello@greentechenergy.com",
    status: "Active",
    startdate: "2023-07-01",
    totalpaid: "₹35,000",
    users: "5 Techs / 2 Mgrs",
  },
  {
    accountid: "ACC005",
    customername: "Priya Sharma",
    customeremail: "info@medicohealth.com",
    status: "Expired",
    startdate: "2020-06-01",
    totalpaid: "₹90,000",
    users: "5 Techs / 2 Mgrs",
  },
];


const columns = [
  { header: "Customer Name", accessor: "customername" },
  { header: "Account ID", accessor: "accountid" },
  {
    header: "Customer Email",
    accessor: "customeremail",
    render: (row) => {
      const email = row.customeremail;
      return email.length > 18 ? email.substring(0, 18) + "..." : email;
    },
  },
  { header: "Status", accessor: "status" },
  { header: "Start Date", accessor: "startdate" },
  { header: "Total Paid", accessor: "totalpaid" },
  { header: "Users", accessor: "users" },
];
const SubscriptionlogScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  const filteredData = useMemo(() => {
    if (!debouncedQuery) return companyData;
    return companyData.filter((company) =>
      Object.values(company)
        .filter(Boolean)
        .some((field) =>
          field.toString().toLowerCase().includes(debouncedQuery.toLowerCase())
        )
    );
  }, [debouncedQuery]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="Subscription Log Screen"
          breadcrumb="Subscription Log Screen"
          actions={<PrimaryButton label="All Status" />}
        />

        <div className="table-container">
          <DataTable
            columns={columns}
            data={filteredData}
            showCheckbox={false}
            showTransferAction={false}
            showActions={true}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            onViewDetails={(row) => setSelectedCustomer(row)}
            resetSelectionOnFilter
          />
        </div>

        {/* View Details Modal */}
        <ViewDetailsDialog
          open={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          customer={selectedCustomer}
        />
      </div>
    </Layout>
  );
};

export default SubscriptionlogScreen;



