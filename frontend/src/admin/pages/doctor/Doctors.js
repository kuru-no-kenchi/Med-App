import React, { useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import DoctorsForm from "./DoctorsForm";

const Doctors = () => {
  const [doctors, setDoctors] = useState([
    { name: "Dr. Alice Johnson", specialty: "Cardiology", dateRegistered: "2025-03-01", status: "Pending" },
    { name: "Dr. Bob Brown", specialty: "Neurology", dateRegistered: "2025-03-02", status: "Approved" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);

  const handleAddDoctor = (doctor) => {
    setDoctors([...doctors, doctor]);
    setShowForm(false);
  };

  const handleEditDoctor = (index) => {
    setEditDoctor({ ...doctors[index], index });
    setShowForm(true);
  };

  const handleDeleteDoctor = (index) => {
    setDoctors(doctors.filter((_, i) => i !== index));
  };

  const handleSaveDoctor = (doctor) => {
    const updatedDoctors = [...doctors];
    updatedDoctors[doctor.index] = doctor;
    setDoctors(updatedDoctors);
    setShowForm(false);
  };

  return (
    <Container>
      <h2 className="my-3">Doctors</h2>
      <Button className="mb-3" onClick={() => setShowForm(true)}>Add Doctor</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Date Registered</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.dateRegistered}</td>
              <td>{doctor.status}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditDoctor(index)}>
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteDoctor(index)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editDoctor ? "Edit Doctor" : "Add Doctor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DoctorsForm
            doctor={editDoctor}
            onSave={editDoctor ? handleSaveDoctor : handleAddDoctor}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Doctors;