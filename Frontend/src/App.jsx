import { useState } from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import SuccessModal from './components/SuccessModal';
import './App.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);
  const handleOpenRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };
  const handleCloseRegister = () => setShowRegisterModal(false);
  const handleCloseSuccess = () => setShowSuccessModal(false);

  const handleLoginSuccess = (userData) => {
    // CORREÇÃO: Guarde o objeto de usuário inteiro, não apenas o nome.
    setCurrentUser(userData); 
    setShowLoginModal(false);
    setShowSuccessModal(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <Header
        onLoginClick={handleShowLogin}
        user={currentUser}
        onLogout={handleLogout}
      />
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
      </Container>
      <LoginModal
        show={showLoginModal}
        handleClose={handleCloseLogin}
        handleCreateUser={handleOpenRegisterModal}
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterModal
        show={showRegisterModal}
        handleClose={handleCloseRegister}
      />
      <SuccessModal
        show={showSuccessModal}
        handleClose={handleCloseSuccess}
        // Agora isso funciona, pois 'currentUser' é um objeto
        username={currentUser ? currentUser.username : ''}
      />
    </>
  );
}

export default App;