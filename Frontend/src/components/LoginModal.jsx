import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function LoginModal({ show, handleClose, handleCreateUser, onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  const handleLogin = async () => {
    setErroLogin('');

    try {
      const response = await fetch('http://localhost:8000/api/validarUsuario/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // 'data' já deve conter { id: ..., nome: "..." }
        // Se 'data' só tiver 'id', você pode precisar adicionar o 'username' de volta:
        // const combinedData = { ...data, username: usuario };
        // onLoginSuccess(combinedData);
        // Ou, se 'data' já for o { id: ..., nome: "..." }, e 'nome' for o username:
        onLoginSuccess({ id: data.id, username: data.nome }); // Garante que o objeto tenha 'username'
      } else {
        // Melhorar a mensagem de erro da API
        setErroLogin(data.message || data.detail || 'Usuário inválido.');
      }
    } catch (error) {
      console.error("Erro ao conectar à API de login:", error);
      setErroLogin('Não foi possível conectar à API.');
    }
  };

  return (
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