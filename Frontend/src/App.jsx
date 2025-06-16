import { useState } from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
import Header from './components/Header';
import './App.css';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal'; // 1. Importa o novo componente

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  // 2. Cria o estado de visibilidade para o modal de registro
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);

  // 3. Cria a função que fecha o modal de login e abre o de registro
  const handleOpenRegisterModal = () => {
    handleCloseLogin(); // Fecha o modal de login
    setShowRegisterModal(true); // Abre o modal de registro
  };

  const handleCloseRegister = () => setShowRegisterModal(false);

  return (
    <>
      <Header onLoginClick={handleShowLogin} />
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

      {/* 4. Passa a nova função para o LoginModal via props */}
      <LoginModal
        show={showLoginModal}
        handleClose={handleCloseLogin}
        handleCreateUser={handleOpenRegisterModal}
      />

      {/* 5. Renderiza o RegisterModal, controlando sua visibilidade */}
      <RegisterModal
        show={showRegisterModal}
        handleClose={handleCloseRegister}
      />
    </>
  );
}

export default App;