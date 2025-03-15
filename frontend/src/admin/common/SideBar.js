import React, { useState } from "react";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {
  House,
  Person,
  Calendar,
  List,
  Plus,
  People,
  Gear,
  Envelope,
  BoxArrowRight,
  ChatDots,
  Robot
} from "react-bootstrap-icons";

const Sidebar = ({ collapsed, setCollapsed }) => {
  // Non-Dropdown Sections
  const Sections = [
    { name: "Home", icon: <House size={20} />, link: "/admin" },
    { name: "Profile", icon: <Person size={20} />, link: "/admin/profile" },
    { name: "My Doctor", icon: <ChatDots size={20} />, link: "/admin/my-doctor" },
    { name: "AI Analysis", icon: <Robot size={20} />, link: "/admin/ai-analysis" }
  ];

  // Additional Sections (Settings, Messages, Logout)
  const ExtraSections = [
    { name: "Settings", icon: <Gear size={20} />, link: "/admin/settings" },
    { name: "Messages", icon: <Envelope size={20} />, link: "/admin/messages" },
    { name: "Logout", icon: <BoxArrowRight size={20} />, link: "/admin/logout" }
  ];

  // Manage Sections
  const ManageSections = [
    { name: "Users", icon: <People size={20} /> },
    { name: "Doctors", icon: <People size={20} /> },
    { name: "Patients", icon: <People size={20} /> },
    { name: "Assistants", icon: <People size={20} /> },
    { name: "Appointments", icon: <Calendar size={20} />, link: "/admin/appointments" },
    { name: "Today's Preference", icon: <Calendar size={20} />, link: "/admin/todays-preference" }
  ];

  return (
    <Container fluid className="d-flex w-25 flex-direction-column">
      {/* Sidebar */}
      <div
        className={`sidebar vh-100 start-0 ${
          collapsed ? "w-10" : "w-25"
        } d-flex flex-column align-items-${collapsed ? "center" : "start"} p-3`}
        style={{ transition: "width 0.3s" }}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header d-flex justify-content-between align-items-center w-100">
          <div className="h2">{!collapsed && "Dashboard"}</div>
          <Button variant="light" size="sm" onClick={() => setCollapsed(!collapsed)}>
            <List size={20} />
          </Button>
        </div>
        <hr />

        {/* Sidebar Items */}
        <Stack gap={3} className="sidebar-items w-100">
          {/* Non-Dropdown Items (with ArrowRight) */}
          {Sections.map((item) => (
            <OverlayTrigger
              key={item.name}
              placement="right"
              overlay={<Tooltip id={`tooltip-${item.name}`}>{item.name}</Tooltip>}
            >
              <Link to={item.link} className="text-decoration-none text-dark">
                <div className="sidebar-item p-2 d-flex align-items-center">
                  <div className="me-3">{item.icon}</div>
                  {!collapsed && (
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <span>{item.name}</span>
                    </div>
                  )}
                </div>
              </Link>
            </OverlayTrigger>
          ))}

          {/* Manage Section */}
          <h6 className="mt-3 text-muted">Manage</h6>

          {/* Dropdown Sections (Users, Doctors, Patients, Assistants) */}
          <Accordion flush className="w-100 ms-2">
            {ManageSections.map((section, index) => (
              <Accordion.Item eventKey={index.toString()} key={index} className="border-0 sidebar-item">
                <Accordion.Header className="d-flex align-items-center">
                  <div className="me-3">{!collapsed && section.icon}</div>
                  {!collapsed && <span>{section.name}</span>}
                </Accordion.Header>
                <Accordion.Body className="ps-4">
                  <div className="sidebar-item p-2 d-flex align-items-center">
                    <List size={18} className="me-2" />
                    <Link to={`/admin/${section.name.toLowerCase()}/list`} className="text-decoration-none text-dark">
                      List
                    </Link>
                  </div>
                  <div className="sidebar-item p-2 d-flex align-items-center">
                    <Plus size={18} className="me-2" />
                    <Link to={`/admin/${section.name.toLowerCase()}/add`} className="text-decoration-none text-dark">
                      Add
                    </Link>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          {/* Extra Sections (Settings, Messages, Logout) */}
          {!collapsed && <h6 className="mt-3 text-muted">Others</h6>}
          {ExtraSections.map((item) => (
            <OverlayTrigger
              key={item.name}
              placement="right"
              overlay={<Tooltip id={`tooltip-${item.name}`}>{item.name}</Tooltip>}
            >
              <Link to={item.link} className="text-decoration-none text-dark">
                <div className="sidebar-item p-2 d-flex align-items-center">
                  <div className="me-3">{item.icon}</div>
                  {!collapsed && (
                    <div className="d-flex align-items-center justify-content-between w-100">
                      <span>{item.name}</span>
                    </div>
                  )}
                </div>
              </Link>
            </OverlayTrigger>
          ))}
        </Stack>
      </div>
    </Container>
  );
};

export default Sidebar;