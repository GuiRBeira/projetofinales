import { Navbar, Container, Nav, Button } from 'react-bootstrap';

function Header({ onLoginClick, user, onLogout }) {
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
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  {/* CORREÇÃO: Acessando a propriedade 'username' do objeto 'user' */}
                  Olá, {user.username}!
                </Navbar.Text>
                <Button variant="outline-danger" onClick={onLogout}>Sair</Button>
              </>
            ) : (
              <Button variant="primary" onClick={onLoginClick}>Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;