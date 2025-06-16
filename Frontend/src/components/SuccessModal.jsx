import { Modal, Button } from 'react-bootstrap';

// CORREÇÃO: Trocamos 'nome' por 'username' para ser consistente
function SuccessModal({ show, handleClose, username }) { 
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login Bem-Sucedido!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="fs-5 text-center">
          {/* CORREÇÃO: Usando a prop 'username' */}
          Bem-vindo de volta, <strong>{username}</strong>!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Continuar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SuccessModal;