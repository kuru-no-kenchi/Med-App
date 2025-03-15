import React, { useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import AssistantsForm from "./AssistantsForm";

const Assistants = () => {
  const [assistants, setAssistants] = useState([
    { name: "Alice Johnson", specialty: "Cardiology", dateRegistered: "2025-03-01", status: "Pending" },
    { name: "Bob Brown", specialty: "Neurology", dateRegistered: "2025-03-02", status: "Approved" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editAssistant, setEditAssistant] = useState(null);

  const handleAddAssistant = (assistant) => {
    setAssistants([...assistants, assistant]);
    setShowForm(false);
  };

  const handleEditAssistant = (index) => {
    setEditAssistant({ ...assistants[index], index });
    setShowForm(true);
  };

  const handleDeleteAssistant = (index) => {
    setAssistants(assistants.filter((_, i) => i !== index));
  };

  const handleSaveAssistant = (assistant) => {
    const updatedAssistants = [...assistants];
    updatedAssistants[assistant.index] = assistant;
    setAssistants(updatedAssistants);
    setShowForm(false);
  };

  return (
    <Container>
      <h2 className="my-3">Assistants</h2>
      <Button className="mb-3" onClick={() => setShowForm(true)}>Add Assistant</Button>
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
          {assistants.map((assistant, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{assistant.name}</td>
              <td>{assistant.specialty}</td>
              <td>{assistant.dateRegistered}</td>
              <td>{assistant.status}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditAssistant(index)}>
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteAssistant(index)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editAssistant ? "Edit Assistant" : "Add Assistant"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AssistantsForm
            assistant={editAssistant}
            onSave={editAssistant ? handleSaveAssistant : handleAddAssistant}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Assistants;