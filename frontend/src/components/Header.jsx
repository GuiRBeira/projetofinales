// src/components/Header.jsx
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

// 1. Receba a propriedade 'onLoginClick'
function Header({ onLoginClick }) {
  return (
    <Navbar fixed="top" expand="lg" bg="dark" data-bs-theme="dark" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="#"><b>EduSync</b></Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#cronograma" active>Meu Cronograma</Nav.Link>
          </Nav>
          <Nav>
            {/* 2. Chame a função no clique do botão */}
            <Button variant="primary" onClick={onLoginClick}>Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;