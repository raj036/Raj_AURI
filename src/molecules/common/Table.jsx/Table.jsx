import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AttendanceTable = () => {
  const [search, setSearch] = useState("");

  const data = [
    {
      name: "Sienna Hewitt",
      username: "@sienna",
      mobile: "+91 76352 64537",
      email: "sienna@AuriFex.com",
      status: "Present",
      inTime: "10:00 am",
      outTime: "5:15 pm",
      totalHours: "8:30 min",
      img: "https://i.pravatar.cc/40?img=1",
    },
    {
      name: "Ammar Foley",
      username: "@ammar",
      mobile: "+91 98765 43210",
      email: "ammar@AuriFex.com",
      status: "Present",
      inTime: "9:50 am",
      outTime: "5:00 pm",
      totalHours: "8:12 min",
      img: "https://i.pravatar.cc/40?img=2",
    },
    {
      name: "Pippa Wilkinson",
      username: "@pippa",
      mobile: "+91 87654 32109",
      email: "pippa@AuriFex.com",
      status: "Absent",
      inTime: "10:05 am",
      outTime: "5:21 pm",
      totalHours: "8:30 min",
      img: "",
    },
    {
      name: "Olly Schroeder",
      username: "@olly",
      mobile: "+91 55555 55555",
      email: "olly@AuriFex.com",
      status: "Present",
      inTime: "10:15 am",
      outTime: "5:07 pm",
      totalHours: "8:12 min",
      img: "https://i.pravatar.cc/40?img=3",
    },
    {
      name: "Mathilde Lewis",
      username: "@mathilde",
      mobile: "+91 11111 22222",
      email: "mathilde@AuriFex.com",
      status: "Present",
      inTime: "9:54 am",
      outTime: "5:05 pm",
      totalHours: "8:12 min",
      img: "https://i.pravatar.cc/40?img=4",
    },
  ];

  const filteredData = data.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4 bg-white p-2 rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Attendance</h5>
        <div className="input-group" style={{ width: "250px" }}>
          <span className="input-group-text bg-light border-0">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control border-0 bg-light"
            placeholder="Search @Sienna"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="table align-middle table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">
              <input className="form-check-input" type="checkbox" />
            </th>
            <th>Name</th>
            <th>Mobile No</th>
            <th>Email</th>
            <th>Status</th>
            <th>In Time</th>
            <th>Out Time</th>
            <th>Total Hours</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((person, index) => (
            <tr key={index}>
              <td>
                <input className="form-check-input" type="checkbox" />
              </td>
              <td className="d-flex align-items-center">
                {person.img ? (
                  <img
                    src={person.img}
                    alt={person.name}
                    className="rounded-circle me-2"
                    width="35"
                    height="35"
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-2"
                    style={{ width: "35px", height: "35px" }}
                  >
                    {person.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="fw-semibold">{person.name}</div>
                  <small className="text-muted">{person.username}</small>
                </div>
              </td>
              <td className="text-muted">{person.mobile}</td>
              <td className="text-muted">{person.email}</td>
              <td>
                <span
                  className={`badge rounded-pill px-3 py-2 ${
                    person.status === "Present"
                      ? "bg-success-subtle text-success"
                      : "bg-danger-subtle text-danger"
                  }`}
                >
                  <i
                    className={`bi bi-circle-fill me-1 ${
                      person.status === "Present" ? "text-success" : "text-danger"
                    }`}
                    style={{ fontSize: "8px" }}
                  ></i>
                  {person.status}
                </span>
              </td>
              <td>{person.inTime}</td>
              <td>{person.outTime}</td>
              <td>{person.totalHours}</td>
              <td>
                <i className="bi bi-pencil text-muted"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-light btn-sm" disabled>
          <i className="bi bi-chevron-left"></i> Previous
        </button>
        <div>
          {[1, 2, 3, 8, 9, 10].map((n) => (
            <button
              key={n}
              className={`btn btn-sm ${
                n === 1 ? "btn-primary text-white" : "btn-light"
              } mx-1`}
            >
              {n}
            </button>
          ))}
        </div>
        <button className="btn btn-light btn-sm">
          Next <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;
