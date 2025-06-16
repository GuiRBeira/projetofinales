// src/App.jsx

import { useState } from 'react';
import { Container, Button, Stack } from 'react-bootstrap';

import Header from './components/Header';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import SuccessModal from './components/SuccessModal';
import RoutineModal from './components/RoutineModal';

import './App.css';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);
  
  const handleOpenRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };
  const handleCloseRegister = () => setShowRegisterModal(false);
  
  const handleCloseSuccess = () => setShowSuccessModal(false);
  
  const handleShowRoutineModal = () => setShowRoutineModal(true);
  const handleCloseRoutineModal = () => setShowRoutineModal(false);

  const handleLoginSuccess = (userData) => {
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
          
          {/* Lógica de renderização condicional para os botões */}
          {/* Os botões só aparecem se 'currentUser' não for nulo */}
          {currentUser && (
            <Stack direction="horizontal" gap={3} className="d-inline-flex">
              <Button variant="primary" size="lg">Verificar Rotina</Button>
              <Button variant="success" size="lg" onClick={handleShowRoutineModal}>
                Criar Nova Rotina
              </Button>
            </Stack>
          )}

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
        username={currentUser ? currentUser.username : ''}
      />
      <RoutineModal 
        show={showRoutineModal}
        handleClose={handleCloseRoutineModal}
      />
    </>
  );
}

export default App;