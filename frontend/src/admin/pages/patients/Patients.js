import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import PatientsForm from "./PatientsForm";
import { getPatients, createPatient, updatePatient, deletePatient } from "./api_patients";

const Patients = () => {
  const [patients, setPatients] = useState({}); // Store patients as an object
  const [showForm, setShowForm] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  // Fetch all patients on component mount
  useEffect(() => {
    getAllPatients();
  }, []);

  // Fetch patients from the backend
  const getAllPatients = async () => {
    try {
      const response = await getPatients();
      const data = response.data;

      // Transform array into an object
      const patientsObject = data.reduce((acc, patient) => {
        acc[patient.id] = patient; // Use patient.id as the key
        return acc;
      }, {});

      setPatients(patientsObject);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setPatients({});
    }
  };

  // Handle saving a patient (create or update)
  const handleSavePatient = async (patientData) => {
    try {
      if (editPatient) {
        // Update existing patient
        await updatePatient(editPatient.id, patientData);
        setPatients((prevPatients) => ({
          ...prevPatients,
          [editPatient.id]: { ...prevPatients[editPatient.id], ...patientData },
        }));
      } else {
        // Create new patient
        const response = await createPatient(patientData);
        const newPatient = response.data;
        setPatients((prevPatients) => ({
          ...prevPatients,
          [newPatient.id]: newPatient,
        }));
      }
      setShowForm(false);
      setEditPatient(null);
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  // Handle deleting a patient
  const handleDeletePatient = async (id) => {
    try {
      await deletePatient(id);
      setPatients((prevPatients) => {
        const updatedPatients = { ...prevPatients };
        delete updatedPatients[id]; // Remove the patient with the given ID
        return updatedPatients;
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-3">Patients</h2>
      <Button className="mb-3" onClick={() => { setEditPatient(null); setShowForm(true); }}>
        Add Patient
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Medical History</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(patients).map((patient, index) => (
            <tr key={patient.id}>
              <td>{index + 1}</td>
              <td>{patient.full_name}</td>
              <td>{patient.email}</td>
              <td>{patient.date_of_birth}</td>
              <td>{patient.medical_history}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setEditPatient(patient);
                    setShowForm(true);
                  }}
                >
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeletePatient(patient.id)}>
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
            onSave={handleSavePatient}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Patients;