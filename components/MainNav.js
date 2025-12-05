import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { getToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(getToken());
  }, []);

  function logout() {
    removeToken();
    setToken(null);
    router.push("/login");
  }

  return (
    <>
      <Navbar expand="lg" className="navbar-dark bg-dark fixed-top">
        <Container>
          <Navbar.Brand as={Link} href="/">
            Student Name
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/about">
                About
              </Nav.Link>
            </Nav>

            {token && (
              <Nav>
                <NavDropdown title="User" id="user-nav-dropdown" align="end">
                  <NavDropdown.Item as={Link} href="/favourites">
                    Favourites
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}

            {!token && (
              <Nav>
                <Nav.Link as={Link} href="/register">
                  Register
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
}
