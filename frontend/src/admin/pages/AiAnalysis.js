import React, { useState } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";

const AiAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <Container className="my-3">
      <h2>AI Medical Image Analysis</h2>
      <Form>
        <Form.Group>
          <Form.Label>Upload an image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
        </Form.Group>
        {selectedImage && (
          <div className="mt-3">
            <Image src={selectedImage} alt="Uploaded" thumbnail />
          </div>
        )}
        <Button className="mt-2">Analyze</Button>
      </Form>
    </Container>
  );
};

export default AiAnalysis;
