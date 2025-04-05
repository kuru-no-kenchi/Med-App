import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        email,
        password,
      });

      const { access, refresh } = response.data;
      
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      
      console.log("Login successful!");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login failed", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
  
      if (!refresh) return;
  
      const response = await axios.post("http://localhost:8000/api/token/refresh/", {
        refresh: refresh,
      });
      const { access } = response.data;
      localStorage.setItem("access_token", access);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    } catch (error) {
      console.error("Token refresh failed", error);
    }
  };
  // Refresh token before it expires
  setInterval(refreshToken, 1000 * 60 * 14); // Refresh every 14 minutes
  const getProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Profile fetch failed", error);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg p-4 border-0" style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <h6 className="mt-2">
            A new User ! sign up here <a href="/register" > Register</a>
          </h6>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Login;
