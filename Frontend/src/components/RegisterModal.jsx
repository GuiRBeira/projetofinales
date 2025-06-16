// src/components/RegisterModal.jsx

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'; // Importe o Alert

function RegisterModal({ show, handleClose }) {
  const [nome, setNome] = useState('');
  const [confirmarNome, setConfirmarNome] = useState('');
  const [erro, setErro] = useState('');
  
  // Novo estado para feedback da API (sucesso ou erro)
  const [apiFeedback, setApiFeedback] = useState(''); 
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (confirmarNome && nome !== confirmarNome) {
      setErro('Os nomes digitados não coincidem.');
    } else {
      setErro('');
    }
  }, [nome, confirmarNome]);

  // Função `handleRegister` atualizada com a lógica da API
  const handleRegister = async () => {
    // Limpa feedbacks anteriores
    setApiFeedback('');
    setApiError(false);

    try {
      // 1. Faz a chamada (fetch) para a sua API
      const response = await fetch('http://localhost:8000/criarUsuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nome }), // Envia o nome do estado no formato JSON
      });

      // 2. Converte a resposta da API para JSON
      const data = await response.json();
      console.log(data.message);
      
      // 3. Verifica se a resposta foi bem-sucedida (status 2xx)
      if (response.ok) {
        setApiError(false);
        setApiFeedback(data.message); // "Usuário criado com sucesso"

        // Opcional: fechar o modal após um tempo
        setTimeout(() => {
          handleClose();
        }, 2000); // Fecha após 2 segundos

      } else {
        // Se a API retornar um erro (ex: usuário já existe)
        setApiError(true);
        // Acessa a mensagem de erro da sua API
        setApiFeedback(data.nome ? data.nome[0] : 'Ocorreu um erro desconhecido.');
      }

    } catch (error) {
      // Se houver um erro de rede (API offline, etc)
      console.error('Erro de conexão:', error);
      setApiError(true);
      setApiFeedback('Não foi possível conectar à API. Verifique se ela está online.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Criar Novo Usuário</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Mostra o feedback da API (sucesso ou erro) */}
        {apiFeedback && (
          <Alert variant={apiError ? 'danger' : 'success'}>
            {apiFeedback}
          </Alert>
        )}
        <Form>
          <Form.Group className="mb-3" controlId="formRegisterName">
            <Form.Label>Nome do Usuário</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do novo usuário"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRegisterConfirm">
            <Form.Label>Confirmar Nome do Usuário</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome novamente"
              value={confirmarNome}
              onChange={(e) => setConfirmarNome(e.target.value)}
            />
            {erro && <Form.Text className="text-danger">{erro}</Form.Text>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleRegister}
          disabled={!nome || nome !== confirmarNome}
        >
          Criar Conta
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;