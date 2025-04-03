import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import AppointmentsForm from "./AppointmentsForm";
import { getAppointments, createAppointments, updateAppointments, deleteAppointments } from "./api_appointments";

const Appointments = () => {
  const defaultAppointments = {
    1: { id: 1, doctor_name: "Dr. Amine Zahi", patient_name: "John Doe", app_date: "2025-04-10", app_time: "10:00 AM", app_aprv: true, app_done: false },
    2: { id: 2, doctor_name: "Dr. Sohaile Ziane", patient_name: "Jane Smith", app_date: "2025-04-12", app_time: "02:30 PM", app_aprv: true, app_done: true },
    3: { id: 3, doctor_name: "Dr. Mohamed Ridouani", patient_name: "Alice Brown", app_date: "2025-04-15", app_time: "09:15 AM", app_aprv: false, app_done: false },
    4: { id: 4, doctor_name: "Dr. Hossam Louazna", patient_name: "Robert Wilson", app_date: "2025-04-18", app_time: "03:45 PM", app_aprv: true, app_done: false },
  };
  const [appointments, setAppointments] = useState(defaultAppointments);
  const [showForm, setShowForm] = useState(false);
  const [editAppointment, setEditAppointment] = useState(null);

  // Fetch appointments on component mount
  useEffect(() => {
    getAllAppointments();
  }, []);

  const getAllAppointments = async () => {
    try {
      const response = await getAppointments();
      const data = response.data;
      const appointmentsObject = data.reduce((acc, appointment) => {
        acc[appointment.id] = appointment;
        return acc;
      }, {});
      setAppointments(appointmentsObject);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments({});
    }
  };

  const handleSaveAppointment = async (appointmentData) => {
    try {
      if (editAppointment) {
        await updateAppointments(editAppointment.id, appointmentData);
        setAppointments((prevAppointments) => ({
          ...prevAppointments,
          [editAppointment.id]: { ...prevAppointments[editAppointment.id], ...appointmentData },
        }));
      } else {
        const response = await createAppointments(appointmentData);
        const newAppointment = response.data;
        setAppointments((prevAppointments) => ({
          ...prevAppointments,
          [newAppointment.id]: newAppointment,
        }));
      }
      setShowForm(false);
      setEditAppointment(null);
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteAppointments(id);
      setAppointments((prevAppointments) => {
        const updatedAppointments = { ...prevAppointments };
        delete updatedAppointments[id];
        return updatedAppointments;
      });
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-3">Appointments</h2>
      <Button className="mb-3" onClick={() => { setEditAppointment(null); setShowForm(true); }}>
        Add Appointment
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(appointments).map((appointment, index) => (
            <tr key={appointment.id}>
              <td>{index + 1}</td>
              <td>{appointment.doctor_name}</td>
              <td>{appointment.patient_name}</td>
              <td>{appointment.app_date}</td>
              <td>{appointment.app_time}</td>
              <td>{appointment.app_done ? "Completed" : appointment.app_aprv ? "Approved" : "Pending"}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => {
                    setEditAppointment(appointment);
                    setShowForm(true);
                  }}
                >
                  <PencilSquare />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteAppointment(appointment.id)}>
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editAppointment ? "Edit Appointment" : "Add Appointment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AppointmentsForm
            appointment={editAppointment}
            onSave={handleSaveAppointment}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Appointments;