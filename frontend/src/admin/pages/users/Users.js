import React, { useState } from "react";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import UsersForm from "./UsersForm";

const Users = () => {
  const [users, setUsers] = useState([
    { fullName: "John Doe", email: "john.doe@example.com", dateRegistered: "2025-03-01", status: "Pending" },
    { fullName: "Jane Smith", email: "jane.smith@example.com", dateRegistered: "2025-03-02", status: "Approved" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = (user) => {
    setUsers([...users, user]);
    setShowForm(false);
  };

  const handleEditUser = (index) => {
    setEditUser({ ...users[index], index });
    setShowForm(true);
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleSaveUser = (user) => {
    const updatedUsers = [...users];
    updatedUsers[user.index] = user;
    setUsers(updatedUsers);
    setShowForm(false);
  };

  return (
    <Container>
      <h2 className="my-3">Users</h2>
      <Button className="mb-3" onClick={() => setShowForm(true)}>Add User</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Date Registered</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.dateRegistered}</td>
              <td>{user.status}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditUser(index)}>
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteUser(index)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsersForm
            user={editUser}
            onSave={editUser ? handleSaveUser : handleAddUser}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Users;