// src/App.jsx
import { useState } from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
import Header from './components/Header';
import './App.css';
import LoginModal from './components/LoginModal';

function App() {
  const [ showLoginModal, setShowLoginModal ] = useState(false);
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  return (
    <>
      <Header onLoginClick={handleShowLogin}/>
      <Container as="main" className="mt-5">
        <div className="text-center">
          <h1 className="fw-bold">Bem-vindo ao EduSync</h1>
          <p className="fs-5 text-light mt-3 mb-4">
            Seu assistente inteligente para organização de estudos.
          </p>
          <Stack direction="horizontal" gap={3} className="d-inline-flex">
            <Button variant="primary" size="lg">Verificar Rotina</Button>
            <Button variant="success" size="lg">Criar Nova Rotina</Button>
          </Stack>
        </div>
        <div className="mt-5">
        </div>
      </Container>
      <LoginModal show={showLoginModal} handleClose={handleCloseLogin} />
    </>
  );
}

export default App;