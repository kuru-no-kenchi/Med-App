import React from "react";
import { Container, Table } from "react-bootstrap";
import Data from "../../Data";

const Appointments = () => {
  return (
    <Container>
      <h2 className="my-3">Appointments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {Data.appointments.map((appointment, index) => (
            <tr key={appointment.id}>
              <td>{index + 1}</td>
              <td>{Data.doctors.find(doc => doc.id === appointment.doctorId)?.name}</td>
              <td>{Data.patients.find(patient => patient.id === appointment.patientId)?.name}</td>
              <td>{appointment.time}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Appointments;
