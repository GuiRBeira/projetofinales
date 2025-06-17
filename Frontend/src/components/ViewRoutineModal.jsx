import { Modal, Button, ListGroup, Spinner } from 'react-bootstrap';

function ViewRoutineModal({ show, handleClose, routine, isLoading }) {

  const renderContent = () => {
    // A lógica de 'isLoading' e de 'nenhuma rotina' continua perfeita.
    if (isLoading) {
      return (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
          <p>Buscando sua rotina...</p>
        </div>
      );
    }
    
    if (!routine || !routine.horarios) {
      return <p>Nenhuma rotina encontrada para este usuário.</p>;
    }

    return (
      <>
        {/* Lógica de exibição simplificada e corrigida */}
        {Object.entries(routine.horarios).map(([dia, aulas]) => (
          <div key={dia} className="mb-3">
            <h5>{dia}</h5>
            {aulas.length > 0 ? (
              // Se há aulas, mostra a lista
              <ListGroup variant="flush">
                {aulas.map((aula, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{aula.horario}</strong> - {aula.materia}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              // Se não há aulas, mostra uma mensagem
              <p className="text-muted fst-italic ps-2">Nenhuma aula neste dia.</p>
            )}
          </div>
        ))}

        {/* A exibição das observações continua perfeita */}
        {routine.observacoes && (
          <div className="mt-4">
            <h5>Observações:</h5>
            <p style={{ whiteSpace: 'pre-wrap' }}>{routine.observacoes}</p>
          </div>
        )}
      </>
    );
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Minha Rotina de Estudos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderContent()}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewRoutineModal;