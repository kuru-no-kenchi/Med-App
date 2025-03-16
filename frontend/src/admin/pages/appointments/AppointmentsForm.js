import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AppointmentsForm = ({ appointment, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    app_doctor: appointment?.app_doctor?.id || "",
    app_patient: appointment?.app_patient?.id || "",
    app_date: appointment?.app_date || "",
    app_time: appointment?.app_time || "",
    app_aprv: appointment?.app_aprv || false,
    app_done: appointment?.app_done || false,
  });

  const [doctors, setDoctors] = useState([]); // List of doctors
  const [patients, setPatients] = useState([]); // List of patients

  // Fetch doctors and patients when the component mounts
  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  // Fetch doctors from the backend
  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:8000/doctors/list/"); // Replace with your API endpoint
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  // Fetch patients from the backend
  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost:8000/patients/list/"); // Replace with your API endpoint
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    onSave(formData); // Pass form data to the parent component
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Doctor Selection */}
      <Form.Group className="mb-3">
        <Form.Label>Doctor</Form.Label>
        <Form.Select
          name="app_doctor"
          value={formData.app_doctor}
          onChange={handleChange}
          required
        >
          <option value="">Select a Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.full_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Patient Selection */}
      <Form.Group className="mb-3">
        <Form.Label>Patient</Form.Label>
        <Form.Select
          name="app_patient"
          value={formData.app_patient}
          onChange={handleChange}
          required
        >
          <option value="">Select a Patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.full_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Date */}
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="app_date"
          value={formData.app_date}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Time */}
      <Form.Group className="mb-3">
        <Form.Label>Time</Form.Label>
        <Form.Control
          type="time"
          name="app_time"
          value={formData.app_time}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Status (Approved and Done) */}
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Check
          type="checkbox"
          name="app_aprv"
          label="Approved"
          checked={formData.app_aprv}
          onChange={handleChange}
        />
        <Form.Check
          type="checkbox"
          name="app_done"
          label="Completed"
          checked={formData.app_done}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Save and Cancel Buttons */}
      <Button type="submit" className="me-2">
        Save
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default AppointmentsForm;