import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import { fetchServices, deleteServices } from "../../Utils/apiServices";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { faCaretSquareRight } from "@fortawesome/free-regular-svg-icons";

const services = [
  {
    serviceid: "SRV001",
    servicename: "Website Development",
    description: "Full-stack website development with React & Node.js",
    price: "₹50,000",
    status: "Active",
    category: "IT Services",
    createdby: "Admin",
    lastmodified: "2025-08-15",
  },
  {
    serviceid: "SRV002",
    servicename: "Digital Marketing",
    description: "SEO, SEM, and social media marketing package",
    price: "₹30,000",
    status: "Active",
    category: "Marketing",
    createdby: "Admin",
    lastmodified: "2025-08-20",
  },
  {
    serviceid: "SRV003",
    servicename: "Cloud Hosting",
    description: "AWS cloud hosting and server management",
    price: "₹15,000",
    status: "Inactive",
    category: "Hosting",
    createdby: "Admin",
    lastmodified: "2025-08-10",
  },
  {
    serviceid: "SRV004",
    servicename: "UI/UX Design",
    description: "Mobile app and web UI/UX design",
    price: "₹25,000",
    status: "Active",
    category: "Design",
    createdby: "Designer",
    lastmodified: "2025-08-25",
  },
  {
    serviceid: "SRV005",
    servicename: "Cybersecurity Audit",
    description: "Complete security assessment & penetration testing",
    price: "₹60,000",
    status: "Active",
    category: "Security",
    createdby: "Security Team",
    lastmodified: "2025-08-18",
  },
];
const columns = [
  { header: "Service ID", accessor: "serviceId" },
  { header: "Service Name", accessor: "serviceName" },
  { header: "Description", accessor: "serviceDescription" },
  { header: "Price", accessor: "servicePrice" },
  { header: "Status", accessor: "serviceStatus" },
  { header: "Category", accessor: "serviceCategory" },
  { header: "Created At", accessor: "createdAt" },
  { header: "Last Modified At", accessor: "lastModifiedAt" },
];
const Services = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [services, setServices] = useState([]);
  // const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Fetch all services on mount

  const fetchSevices = async () => {
    try {
      console.log("fetchicng service data");
      const res = await fetchServices();
      console.log("Fetched services: ", res.data);
      // setServices(res.data || []);

      const apiData = res.data?.data?.results || [];
      const formatted = apiData.map((item) => ({
        serviceId: item.serviceId,
        serviceName: item.serviceName,
        serviceDescription: item.serviceDescription,
        servicePrice: `₹${item.servicePrice}`,
        serviceStatus: item.serviceStatus || "",
        serviceCategory: item.serviceCategory || "",
        createdAt: new Date(item.createdAt).toLocaleString(),
        lastModifiedAt: new Date(item.lastModifiedAt).toLocaleString(),
      }));

      setServices(formatted);
    } catch (error) {
      console.error("Failed to fetch services: ", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleDeleteServices = async (row) => {
    console.log("🗑️ Deleting service:", row);
    try {
      await deleteServices({ id: row.serviceId }); // ✅ row has id, taxName, etc.
      setServices((prev) =>
        prev.filter((service) => service.serviceId !== row.serviceId)
      );

      console.log("✅ Service deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting service:", error);
    }
  };
  useEffect(() => {
    // setLoading(true);
    fetchSevices();
  }, []);

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Filter data safely
  const filteredData = useMemo(() => {
    if (!debouncedQuery) return services; // show all if empty

    return services.filter((service) =>
      Object.values(service)
        .filter(Boolean)
        .some((field) =>
          field.toString().toLowerCase().includes(debouncedQuery.toLowerCase())
        )
    );
  }, [debouncedQuery, services]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="All Services"
          subtitle="Add, edit, and manage your services"
          breadcrumb="Services"
          actions={
            <PrimaryButton
              label="+ Add Service"
              onClick={() => navigate("/add-services")}
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
            onEdit={(row) =>
              navigate("/add-services", {
                state: { rowData: { ...row, id: row.serviceId } },
              })
            }
            onDelete={(row) => handleDeleteServices(row)}
            deleteTitle="Delete Service"
            deleteParagraph="Are you sure you want to delete this service? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default Services;
