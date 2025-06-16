// src/components/LoginModal.jsx
import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

function LoginModal({ show, handleClose, handleCreateUser }) {
  // Estados para guardar o nome de usuário e as mensagens de erro
  const [usuario, setUsuario] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  // Função para lidar com a tentativa de login
  const handleLogin = async () => {
    setErroLogin(''); // Limpa erros anteriores

    try {
      const response = await fetch('http://localhost:8000/api/validarUsuario', { // Endpoint de login (suposição)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: usuario }),
      });

      const data = await response.json();

      if (response.ok) {
        // Se o login for bem-sucedido
        alert('Login realizado com sucesso!'); // ou redirecionar o usuário
        handleClose(); // Fecha o modal
      } else {
        // Se a API retornar um erro (usuário não existe, etc.)
        setErroLogin(data.detail || 'Usuário inválido.');
      }
    } catch (error) {
      // Se houver um erro de rede
      setErroLogin('Não foi possível conectar à API.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login no EduSync</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Exibe o alerta de erro, se houver */}
        {erroLogin && <Alert variant="danger">{erroLogin}</Alert>}
        
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Usuario</Form.Label>
            {/* Conecta o campo ao estado 'usuario' */}
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
        {/* O botão "Entrar" agora chama a função handleLogin */}
        <Button variant="primary" onClick={handleLogin}>
          Entrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;