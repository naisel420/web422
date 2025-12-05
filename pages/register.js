import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Alert } from "react-bootstrap";
import { registerUser } from "@/lib/authenticate";

export default function Register() {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await registerUser(user, password, password2);
      router.push("/login");
    } catch (err) {
      setError(err.message || "Unable to register");
    }
  }

  return (
    <>
      <h1>Register</h1>
      <p>Register for an account:</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="registerUser">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </>
  );
}
