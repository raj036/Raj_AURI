import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MapComponent from "./MapComponent"; // Leaflet map
import locationIcon from "../assets/location.png";

const LocationDialog = ({
  open,
  onClose,
  allAppointments,
  liveAppointments,
  title,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => setTabValue(newValue);

  // Example: week days for Jan 1–8, 2025
  const weekDays = [
    { day: "Mon", date: 6 },
    { day: "Tue", date: 7 },
    { day: "Wed", date: 8 },
    { day: "Thu", date: 9 },
    { day: "Fri", date: 10 },
    { day: "Sat", date: 11 },
    { day: "Sun", date: 12 },
  ];

  // Choose which appointments to display
  const displayedAppointments =
    tabValue === 0 ? allAppointments : liveAppointments;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={false} // disable MUI maxWidth
      PaperProps={{
        sx: { width: 700 }, // fixed width
      }}
    >
      <DialogContent>
        {/* Title */}
        <p style={{ marginBottom: 16, fontSize: "20px", fontWeight: "500" }}>
          Indoor Pest Control Spray{" "}
        </p>

        {/* Date range with border */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={2}
          padding="8px"
          border="1px solid #ddd"
          borderRadius="8px"
        >
          <Button>{"<"}</Button>
          <Box flex={1} textAlign="center">
            Jan 1, 2025 – Jan 8, 2025
          </Box>
          <Button>{">"}</Button>
        </Box>

        {/* Week days */}
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          {weekDays.map((day, idx) => (
            <Box
              key={idx}
              textAlign="center"
              padding="8px"
              style={{
                width: 140,
                border: "1px solid #ddd",
                backgroundColor: day.date === 10 ? "#1976d2" : "transparent",
                color: day.date === 10 ? "#fff" : "#000",
              }}
            >
              <div style={{ fontSize: 12 }}>{day.day}</div>
              <div style={{ fontWeight: 600 }}>{day.date}</div>
            </Box>
          ))}
        </Box>

        {/* Tabs with border */}
        <Box
          border="1px solid #ddd"
          borderRadius="8px"
          marginBottom={2}
          overflow="hidden"
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#1976d2",
              },
            }}
          >
            <Tab label="All Day" />
            <Tab label="Live location" />
          </Tabs>
        </Box>

        {/* Main content */}
        <Box display="flex" gap={2}>
          {/* Left: appointment cards */}
          <Box flex={1} display="flex" flexDirection="column">
            {displayedAppointments.map((appt, idx) => (
              <Box
                key={idx}
                padding="12px"
                border="1px solid #ddd"
                borderRadius="12px"
                marginBottom="12px"
                boxShadow="0 1px 3px rgba(0,0,0,0.1)"
              >
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {appt.title}
                </div>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  marginBottom={2}
                >
                  <img src={locationIcon} width={16} />
                  <span style={{ fontSize: 14 }}>{appt.address}</span>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <img src={locationIcon} width={16} />
                  <span style={{ fontSize: 14 }}>{appt.time}</span>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Right: Map */}
          <Box flex={1} height={400} borderRadius="12px" overflow="hidden">
            <MapComponent appointments={displayedAppointments} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
