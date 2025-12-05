import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Alert } from "react-bootstrap";
import { authenticateUser } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { getFavourites } from "@/lib/userData";

export default function Login() {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function updateAtom() {
    setFavouritesList(await getFavourites());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await authenticateUser(user, password);
      await updateAtom();
      router.push("/");
    } catch (err) {
      setError(err.message || "Unable to login");
    }
  }

  return (
    <>
      <h1>Login</h1>
      <p>Login with your account:</p>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginUser">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}
