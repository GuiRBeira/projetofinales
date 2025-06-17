// src/components/RoutineModal.jsx

import { useState, useEffect } from 'react'; // Importe useEffect para a verificação inicial
import { Modal, Button, Form, Row, Col, Card, CloseButton, Spinner, Alert } from 'react-bootstrap'; // Importe Alert para mensagens de erro

const DIAS_DA_SEMANA = [
  { chave: 'segunda', nome: 'Segunda-feira' },
  { chave: 'terca', nome: 'Terça-feira' },
  { chave: 'quarta', 'nome': 'Quarta-feira' }, // 'nome' em aspas para consistência, embora não estritamente necessário aqui
  { chave: 'quinta', nome: 'Quinta-feira' },
  { chave: 'sexta', nome: 'Sexta-feira' },
  { chave: 'sabado', nome: 'Sábado' },
  { chave: 'domingo', nome: 'Domingo' },
];

// O componente agora recebe a prop 'username'
function RoutineModal({ show, handleClose, onRoutineGenerated, username }) { 
  
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // Novo estado para exibir erros

  // Opcional: Efeito para resetar o formulário quando o modal é aberto/fechado
  useEffect(() => {
    if (show) {
      setRotina({
        segunda: [], terca: [], quarta: [], quinta: [],
        sexta: [], sabado: [], domingo: [],
      });
      setObservacoes('');
      setError(''); // Limpa erros ao abrir
    }
  }, [show]);

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
    setError(''); // Limpa erros anteriores
    if (!username) {
      setError('Erro: Usuário não logado. Por favor, faça login.');
      return;
    }

    setIsLoading(true);

    const formatarHorarios = (dia) => {
      // Filtra entradas vazias para evitar enviar objetos matéria/horário vazios
      return dia.filter(item => item.materia && item.horarioInicio && item.horarioFim).map(item => ({
        materia: item.materia,
        horario: `${item.horarioInicio}-${item.horarioFim}`
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
      username: username, // AGORA ESTÁ USANDO A PROP 'username'
      horarios: horariosFormatados,
      hobbies: [], // Se houver um campo para hobbies no futuro, preencha aqui
      observacoes: observacoes,
    };
    
    try {
      const response = await fetch('http://localhost:8000/api/gerar-planejamento/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const generatedRoutine = await response.json();
        alert('Planejamento gerado com sucesso!');
        onRoutineGenerated(generatedRoutine);
        handleClose();
      } else {
        const errorData = await response.json();
        // Tenta pegar a mensagem de erro específica do backend
        const errorMessage = errorData.erro || JSON.stringify(errorData) || 'Falha ao gerar o planejamento.';
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Erro de conexão ao gerar planejamento:', error);
      setError('Erro de conexão. Verifique se a API está online.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Criar Nova Rotina de Estudos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>} {/* Exibe mensagens de erro */}
        <Form>
          {DIAS_DA_SEMANA.map(dia => (
            <Card key={dia.chave} className="mb-3">
              <Card.Header as="h5">{dia.nome}</Card.Header>
              <Card.Body>
                {rotina[dia.chave].map((item, index) => (
                  <Row key={item.id} className="mb-2 align-items-center">
                    <Col md={5}><Form.Control type="text" placeholder={`Matéria ${index + 1}`} value={item.materia} onChange={(e) => handleInputChange(dia.chave, item.id, 'materia', e.target.value)}/></Col>
                    <Col md={3}><Form.Control type="time" title="Horário de Início" value={item.horarioInicio} onChange={(e) => handleInputChange(dia.chave, item.id, 'horarioInicio', e.target.value)}/></Col>
                    <Col md={3}><Form.Control type="time" title="Horário de Término" value={item.horarioFim} onChange={(e) => handleInputChange(dia.chave, item.id, 'horarioFim', e.target.value)}/></Col>
                    <Col md={1} xs="auto"><CloseButton onClick={() => handleRemoveMateria(dia.chave, item.id)} /></Col>
                  </Row>
                ))}
                <Button variant="outline-primary" size="sm" onClick={() => handleAddMateria(dia.chave)}>+ Adicionar Matéria</Button>
              </Card.Body>
            </Card>
          ))}
          <Form.Group className="mt-4">
            <Form.Label as="h5">Observações da Semana</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Ex: Prova de cálculo adiada..." value={observacoes} onChange={(e) => setObservacoes(e.target.value)}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isLoading}>Fechar</Button>
        <Button variant="primary" onClick={handleSaveRotina} disabled={isLoading || !username}> {/* Desabilita se não houver username */}
          {isLoading ? (<><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/><span className="ms-2">Salvando...</span></>) : ('Salvar Rotina')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RoutineModal;