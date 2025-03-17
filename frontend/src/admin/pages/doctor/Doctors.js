import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import DoctorsForm from "./DoctorsForm";
import { getdoctors, createDoctor, updateDoctor, deleteDoctor } from "./api_doctors";

const Doctors = () => {
  const [doctors, setDoctors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);

  useEffect(() => {
    getAlldocs();
  }, []); // Add empty dependency array

  const getAlldocs = async () => {
    try {
      const response = await getdoctors();
      const data = response.data;

      // Log the API response
      console.log("API Response:", data);

      // Transform array into an object
      const doctorsObject = data.reduce((acc, doctor) => {
        acc[doctor.id] = doctor;
        return acc;
      }, {});

      // Log the transformed object
      console.log("Transformed Doctors Object:", doctorsObject);

      setDoctors(doctorsObject);
    } catch (error) {
      console.error("Error fetching Doctors:", error);
      setDoctors({});
    }
  };

  const handleSaveDoctor = async (Doctor) => {
    try {
      if (editDoctor) {
        await updateDoctor(editDoctor.id, Doctor);
        setDoctors((prevDoctors) => ({
          ...prevDoctors,
          [editDoctor.id]: { ...prevDoctors[editDoctor.id], ...Doctor },
        }));
      } else {
        const response = await createDoctor(Doctor);
        const newDoctor = response.data;
        setDoctors((prevDoctors) => ({
          ...prevDoctors,
          [newDoctor.id]: newDoctor,
        }));
      }
      setShowForm(false);
      setEditDoctor(null);
    } catch (error) {
      console.error("Error saving Doctor:", error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await deleteDoctor(id);
      setDoctors((prevDoctors) => {
        const updatedDoctors = { ...prevDoctors };
        delete updatedDoctors[id];
        return updatedDoctors;
      });
    } catch (error) {
      console.error("Error deleting Doctor:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-3">Doctors</h2>
      <Button className="mb-3" onClick={() => setShowForm(true)}>Add Doctor</Button>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Experience</th>
                  <th>Hospital Name</th>
                  <th>Speciality</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(doctors).map((doctor, index) => (
                  <tr key={doctor.id}>
                    <td>{index + 1}</td>
                    <td>{doctor.full_name}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.doc_experience}</td>
                    <td>{doctor.hosp_name}</td>
                    <td>{doctor.doc_specialization}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => {
                          setEditDoctor(doctor);
                          setShowForm(true);
                        }}
                      >
                        <PencilSquare />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteDoctor(doctor.id)}>
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
            onSave={handleSaveDoctor}
            onCancel={() => setShowForm(false)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Doctors;