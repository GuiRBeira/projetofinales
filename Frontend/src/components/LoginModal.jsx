import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function LoginModal({ show, handleClose, handleCreateUser, onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  const handleLogin = async () => {
    setErroLogin('');
    
    // CORREÇÃO: A linha 'data.username = usuario' foi removida daqui.

    try {
      const response = await fetch('http://localhost:8000/api/validarUsuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // A lógica correta para combinar os dados já estava aqui.
        const combinedData = { ...data, username: usuario };
        onLoginSuccess(combinedData);
      } else {
        setErroLogin(data.detail || 'Usuário inválido.');
      }
    } catch (error) {
      setErroLogin('Não foi possível conectar à API.');
    }
  };

  return (
    // O JSX do return não precisa de alterações e continua o mesmo.
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login no EduSync</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {erroLogin && <Alert variant="danger">{erroLogin}</Alert>}
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome de Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
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
        <Button variant="primary" onClick={handleLogin}>
          Entrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;