import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import api from "../../Utils/api.js";
import { fetchShipmentsById, deleteShipments } from "../../Utils/apiServices";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const users = [
  {
    shipmentid: "SHIP001",
    packageid: "PKG001",
    carriername: "DHL",
    trackingnumber: "DHL123456789",
    shipmentdate: "26/03/2025",
    expecteddelivery: "30/03/2025",
    status: "Packed",
  },
  {
    shipmentid: "SHIP002",
    packageid: "PKG002",
    carriername: "FedEx",
    trackingnumber: "FDX987654321",
    shipmentdate: "25/08/2025",
    expecteddelivery: "29/08/2025",
    status: "Dispatched",
  },
  {
    shipmentid: "SHIP003",
    packageid: "PKG003",
    carriername: "UPS",
    trackingnumber: "UPS564738291",
    shipmentdate: "16/05/2025",
    expecteddelivery: "20/05/2025",
    status: "Returned",
  },
  {
    shipmentid: "SHIP004",
    packageid: "PKG004",
    carriername: "BlueDart",
    trackingnumber: "BD456123789",
    shipmentdate: "17/05/2025",
    expecteddelivery: "21/05/2025",
    status: "Returned",
  },
  {
    shipmentid: "SHIP005",
    packageid: "PKG005",
    carriername: "Delhivery",
    trackingnumber: "DLV789123456",
    shipmentdate: "18/05/2025",
    expecteddelivery: "22/05/2025",
    status: "Returned",
  },
  {
    shipmentid: "SHIP006",
    packageid: "PKG006",
    carriername: "India Post",
    trackingnumber: "IP123987654",
    shipmentdate: "19/05/2025",
    expecteddelivery: "25/05/2025",
    status: "Returned",
  },
  {
    shipmentid: "SHIP007",
    packageid: "PKG007",
    carriername: "XpressBees",
    trackingnumber: "XPB654321789",
    shipmentdate: "20/05/2025",
    expecteddelivery: "24/05/2025",
    status: "Returned",
  },
  {
    shipmentid: "SHIP008",
    packageid: "PKG008",
    carriername: "Ecom Express",
    trackingnumber: "ECX852741963",
    shipmentdate: "21/05/2025",
    expecteddelivery: "26/05/2025",
    status: "Returned",
  },
  {
    shipmentid: "SHIP009",
    packageid: "PKG009",
    carriername: "Amazon Logistics",
    trackingnumber: "AMZ369258147",
    shipmentdate: "22/05/2025",
    expecteddelivery: "27/05/2025",
    status: "Returned",
  },
];

const columns = [
  { header: "Shipment ID", accessor: "shipmentId" },
  { header: "Package ID", accessor: "packageId" },
  { header: "Carrier Name", accessor: "carrierName" },
  { header: "Tracking Number", accessor: "trackingNumber" },
  { header: "Shipment Date", accessor: "shipmentDate" },
  { header: "Expected Delivery", accessor: "expectedDeliveryDate" },
  { header: "Status", accessor: "shipmentStatus" },
];
const Shipments = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenMenu(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpload = () => {
    console.log("Uploading file...");
    setOpenDialog(false);
  };

  //fetch shipment from API
  const fetchShipments = async () => {
    try {
      setLoading(true);
      const res = await fetchShipmentsById(2);
      console.log("✅ Shipments fetched:", res.data);
      // setShipments(data);
      const apiData = res.data?.dto ? [res.data.dto] : [];
      const formatted = apiData.map((item) => ({
        rawData: item,
        shipmentId: item.shipmentId,
        packageid: item.packageid,
        carrierName: item.carrierName,
        trackingNumber: item.trackingNumber,
        shipmentDate: new Date(item.shipmentDate).toLocaleString(),
        expectedDeliveryDate: new Date(
          item.expectedDeliveryDate
        ).toLocaleString(),
        shipmentStatus: item.shipmentStatus || "",
      }));

      setShipments(formatted);
    } catch (error) {
      console.error(
        "❌ Error fetching shipments:",
        error.response?.data || error
      );
      throw error.response?.data || error;
    } finally {
      setLoading(false);
    }
  };

  //Delete shipment by ID
  const handleDeleteShipment = async (row) => {
    const id = row.dto?.shipmentId || row.shipmentId;
    if (!id) return alert("Shipment ID not found");

    try {
      const res = await deleteShipments(id);
      console.log("✅ Shipment deleted:", res.data);
      //remove deleted shipment locally
      setShipments((prev) =>
        prev.filter(
          (shipment) => shipment.id !== id && shipment.shipmentid !== id
        )
      );
      alert("Shipment deleted successfully!");
    } catch (error) {
      console.error("Error deleting shipment: ", error);
      alert("Failed to delete shipment.");
    }
  };

  //fetch data when component mount
  useEffect(() => {
    fetchShipments();
  }, []);

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Filter data safely
  // const filteredData = useMemo(() => {
  //   return shipments.filter((branch) =>
  //     [branch?.name, branch?.email, branch?.role, branch?.status]
  //       .filter(Boolean)
  //       .some((field) =>
  //         field.toLowerCase().includes(debouncedQuery.toLowerCase())
  //       )
  //   );
  // }, [debouncedQuery]);

  const filteredData = useMemo(() => {
    return shipments.filter((item) =>
      [item.carrierName, item.trackingNumber, item.shipmentStatus]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
    );
  }, [debouncedQuery, shipments]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="Shipments Management"
          subtitle="Add edit and manage Shipments"
          breadcrumb="Shipments Management"
          actions={
            <PrimaryButton
              label="+ Add Shipment"
              onClick={() => navigate("/add-shipment")}
            />
          }
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
            resetSelectionOnFilter
            onDelete={handleDeleteShipment}
            onEdit={(row) => {
              console.log("📝 Editing row:", row.rawData);
              navigate("/add-shipment", { state: { rowData: row.rawData } });
            }}
            deleteTitle="Delete Shipment"
            deleteParagraph="Are you sure you want to delete this shipment? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default Shipments;
