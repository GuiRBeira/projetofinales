// src/components/LoginModal.jsx
import { Modal, Button, Form } from 'react-bootstrap';

function LoginModal({ show, handleClose, handleCreateUser}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login no EduSync</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="email" placeholder="Digite seu nome de Usuario" />
          </Form.Group>
        </Form>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleCreateUser} className="me-auto">
          Criar Novo Usuário
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Entrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;