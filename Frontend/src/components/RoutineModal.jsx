import { useState } from 'react';
import { Modal, Button, Form, Row, Col, Card, CloseButton } from 'react-bootstrap';

const DIAS_DA_SEMANA = [
  { chave: 'segunda', nome: 'Segunda-feira' },
  { chave: 'terca', nome: 'Terça-feira' },
  { chave: 'quarta', nome: 'Quarta-feira' },
  { chave: 'quinta', nome: 'Quinta-feira' },
  { chave: 'sexta', nome: 'Sexta-feira' },
  { chave: 'sabado', nome: 'Sábado' },
  { chave: 'domingo', nome: 'Domingo' },
];

function RoutineModal({ show, handleClose }) {
  const [rotina, setRotina] = useState({
    segunda: [],
    terca: [],
    quarta: [],
    quinta: [],
    sexta: [],
    sabado: [],
    domingo: [],
  });

  const [observacoes, setObservacoes] = useState('');

  // 1. ATUALIZAÇÃO: Adiciona 'horarioInicio' e 'horarioFim'
  const handleAddMateria = (dia) => {
    setRotina(prevRotina => ({
      ...prevRotina,
      [dia]: [...prevRotina[dia], { id: Date.now(), materia: '', horarioInicio: '', horarioFim: '' }] 
    }));
  };
  
  const handleRemoveMateria = (dia, id) => {
    setRotina(prevRotina => ({
      ...prevRotina,
      [dia]: prevRotina[dia].filter(item => item.id !== id)
    }));
  };

  const handleInputChange = (dia, id, campo, valor) => {
    setRotina(prevRotina => ({
      ...prevRotina,
      [dia]: prevRotina[dia].map(item => 
        item.id === id ? { ...item, [campo]: valor } : item
      )
    }));
  };

  const handleSaveRotina = async () => {
    // 3. ATUALIZAÇÃO: Formata o horário para "inicio-fim"
    const formatarHorarios = (dia) => {
      return dia.map(item => ({
        materia: item.materia,
        horario: `${item.horarioInicio}-${item.horarioFim}` // Junta os horários
      }));
    };

    const horariosFormatados = {
      Segunda: formatarHorarios(rotina.segunda),
      Terça:   formatarHorarios(rotina.terca),
      Quarta:  formatarHorarios(rotina.quarta),
      Quinta:  formatarHorarios(rotina.quinta),
      Sexta:   formatarHorarios(rotina.sexta),
      Sábado:  formatarHorarios(rotina.sabado),
      Domingo: formatarHorarios(rotina.domingo),
    };

    const payload = {
      horarios: horariosFormatados,
      hobbies: [],
      observacoes: observacoes,
    };

    console.log("JSON que será enviado para a API:", JSON.stringify(payload, null, 2));
    
    alert('Estrutura do JSON gerada! Verifique o console para ver os dados.');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Criar Nova Rotina de Estudos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {DIAS_DA_SEMANA.map(dia => (
            <Card key={dia.chave} className="mb-3">
              <Card.Header as="h5">{dia.nome}</Card.Header>
              <Card.Body>
                {rotina[dia.chave].map((item, index) => (
                  <Row key={item.id} className="mb-2 align-items-center">
                    <Col md={5}>
                      <Form.Control 
                        type="text" 
                        placeholder={`Matéria ${index + 1}`}
                        value={item.materia}
                        onChange={(e) => handleInputChange(dia.chave, item.id, 'materia', e.target.value)}
                      />
                    </Col>
                    {/* 2. ATUALIZAÇÃO: Adiciona campos de Início e Fim */}
                    <Col md={3}>
                      <Form.Control 
                        type="time"
                        title="Horário de Início"
                        value={item.horarioInicio}
                        onChange={(e) => handleInputChange(dia.chave, item.id, 'horarioInicio', e.target.value)}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control 
                        type="time"
                        title="Horário de Término"
                        value={item.horarioFim}
                        onChange={(e) => handleInputChange(dia.chave, item.id, 'horarioFim', e.target.value)}
                      />
                    </Col>
                    <Col md={1} xs="auto">
                      <CloseButton onClick={() => handleRemoveMateria(dia.chave, item.id)} />
                    </Col>
                  </Row>
                ))}
                <Button variant="outline-primary" size="sm" onClick={() => handleAddMateria(dia.chave)}>
                  + Adicionar Matéria
                </Button>
              </Card.Body>
            </Card>
          ))}
          <Form.Group className="mt-4">
            <Form.Label as="h5">Observações da Semana</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3}
              placeholder="Ex: Prova de cálculo adiada, não haverá aula segunda-feira..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
        <Button variant="primary" onClick={handleSaveRotina}>Salvar Rotina</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RoutineModal;