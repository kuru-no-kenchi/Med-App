import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const UsersForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateRegistered: new Date().toISOString().split("T")[0],
    role:"Patient",
    status: "Pending",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

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
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date Registered</Form.Label>
        <Form.Control
          type="date"
          name="dateRegistered"
          value={formData.dateRegistered}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="role"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Admin">Admin</option>
          <option value="Doctor">Doctor</option>
          <option value="Patient">Patient</option>
          <option value="Assistant">Assistant</option>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </Form.Control>
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

export default UsersForm;