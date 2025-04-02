import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const DoctorsForm = ({ doctor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    doc_id:"",
    full_name: "",
    doc_email: "",
    specialty: "",
    license_number: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        doc_id : doctor.doc_id,
        full_name: doctor.full_name || "",
        doc_email: doctor.email || "",
        specialty: doctor.doc_specialization || "",
        license_number: doctor.doc_license_number || "",
    });
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
        <Form.Label>ID</Form.Label>
        <Form.Control
          type="text"
          name="doc_id"
          value={formData.doc_id}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="doc_email"
          value={formData.doc_email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Specialty</Form.Label>
        <Form.Control
          type="text"
          name="specialty"
          value={formData.specialty}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>License Number</Form.Label>
        <Form.Control
          type="text"
          name="license_number"
          value={formData.license_number}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
      </Form.Group>
      <Button variant="primary" type="submit" className="me-2">
        Save
      </Button>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default DoctorsForm;