import { useState } from 'react';
import { Container, Button, Stack } from 'react-bootstrap';

// Importa todos os componentes que App.jsx controla
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import SuccessModal from './components/SuccessModal';
import RoutineModal from './components/RoutineModal';
import ViewRoutineModal from './components/ViewRoutineModal';

import './App.css';

function App() {
  // --- Estados de Visibilidade dos Modais ---
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [showViewRoutineModal, setShowViewRoutineModal] = useState(false);
  
  // --- Estados de Dados da Aplicação ---
  // currentUser agora pode armazenar { id: ..., username: "..." }
  const [currentUser, setCurrentUser] = useState(null); 
  const [userRoutine, setUserRoutine] = useState(null);
  const [isLoadingRoutine, setIsLoadingRoutine] = useState(false);

  // --- Funções de Controle (Handlers) ---

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

  const handleCloseViewRoutineModal = () => setShowViewRoutineModal(false);
  
  // Esta função é chamada pelo LoginModal após o sucesso
  const handleLoginSuccess = (userData) => {
    // userData deve ser { id: ..., username: "..." }
    setCurrentUser(userData); 
    setShowLoginModal(false);
    setShowSuccessModal(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRoutine(null);
  };

  const handleShowViewRoutine = async () => {
    if (!currentUser || !currentUser.username) { // Verifica se há um usuário logado e se ele tem username
      alert("Erro: Faça login para ver sua rotina.");
      return; 
    }

    setIsLoadingRoutine(true);
    setShowViewRoutineModal(true);

    try {
      const response = await fetch('http://localhost:8000/api/buscar-rotina/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: currentUser.username }), // Usa currentUser.username
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Rotina recebida:", data); // Log para depuração
        setUserRoutine(data);
      } else {
        console.error("Nenhuma rotina encontrada ou erro na API ao buscar.", response.status);
        setUserRoutine(null); 
      }
    } catch (error) {
      console.error("Erro ao buscar rotina:", error);
      setUserRoutine(null);
    } finally {
      setIsLoadingRoutine(false);
    }
  };
  
  const handleRoutineGenerated = (generatedRoutine) => {
    setUserRoutine(generatedRoutine);
    setShowViewRoutineModal(true);
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
          <p className="fs-5 text-light mt-3 mb-4">Seu assistente inteligente para organização de estudos.</p>
          
          {currentUser && (
            <Stack direction="horizontal" gap={3} className="d-inline-flex">
              <Button variant="primary" size="lg" onClick={handleShowViewRoutine} disabled={isLoadingRoutine}>
                {isLoadingRoutine ? 'Carregando…' : 'Verificar Rotina'}
              </Button>
              <Button variant="success" size="lg" onClick={handleShowRoutineModal}>
                Criar Nova Rotina
              </Button>
            </Stack>
          )}
        </div>
      </Container>
      
      {/* --- Renderização de Todos os Modais --- */}
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
        onRoutineGenerated={handleRoutineGenerated}
        // PASSA O USERNAME PARA O ROUTINEMODAL
        username={currentUser ? currentUser.username : null} 
      />
      <ViewRoutineModal
        show={showViewRoutineModal}
        handleClose={handleCloseViewRoutineModal}
        routine={userRoutine}
        isLoading={isLoadingRoutine}
      />
    </>
  );
}

export default App;