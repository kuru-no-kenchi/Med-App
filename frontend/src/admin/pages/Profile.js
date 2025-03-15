import React, { useState } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    role: "Admin",
    email: "john.doe@example.com",
    phone: "+1234567890",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProfile({
        ...profile,
        image: URL.createObjectURL(files[0]),
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    // Save profile logic here
    console.log("Profile saved:", profile);
  };

  return (
    <Container>
      <h2 className="my-3">Profile</h2>
      <Form>
        <Form.Group className="text-center">
          {profile.image && <Image src={profile.image} roundedCircle width="150" height="150" />}
          <Form.Label className="d-block mt-3">Profile Picture</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            name="role"
            value={profile.role}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="mt-3" onClick={handleSave}>Save Profile</Button>
      </Form>
    </Container>
  );
};

export default Profile;