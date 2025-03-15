import React, { useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import PatientsForm from "./PatientsForm";
import { patients as initialPatients } from "../../Data";

const Patients = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [showForm, setShowForm] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  const handleAddPatient = (patient) => {
    setPatients([...patients, patient]);
    setShowForm(false);
  };

  const handleEditPatient = (index) => {
    setEditPatient({ ...patients[index], index });
    setShowForm(true);
  };

  const handleDeletePatient = (index) => {
    setPatients(patients.filter((_, i) => i !== index));
  };

  const handleSavePatient = (patient) => {
    const updatedPatients = [...patients];
    updatedPatients[patient.index] = patient;
    setPatients(updatedPatients);
    setShowForm(false);
  };

  return (
    <Container>
      <h2 className="my-3">Patients</h2>
      <Button className="mb-3" onClick={() => setShowForm(true)}>Add Patient</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Disease</th>
            <th>Doctor</th>
            <th>Date Registered</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.disease}</td>
              <td>{patient.doctor}</td>
              <td>{patient.dateRegistered}</td>
              <td>{patient.status}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditPatient(index)}>
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeletePatient(index)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editPatient ? "Edit Patient" : "Add Patient"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PatientsForm
            patient={editPatient}
            onSave={editPatient ? handleSavePatient : handleAddPatient}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Patients;