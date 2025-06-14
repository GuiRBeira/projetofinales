// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const cronogramaContainer = document.getElementById('cronograma-container');

    function renderizarCronograma(tarefas) {
        cronogramaContainer.innerHTML = '<h2>Próximos Prazos</h2>';
        if (tarefas.length === 0) {
            cronogramaContainer.innerHTML += '<p>Nenhuma tarefa adicionada.</p>';
            return;
        }
        
        const lista = document.createElement('ul');
        tarefas.forEach(tarefa => {
            const item = document.createElement('li');
            item.textContent = `${tarefa.nome} - Prazo: ${new Date(tarefa.data).toLocaleDateString()}`;
            lista.appendChild(item);
        });
        cronogramaContainer.appendChild(lista);
    }

    // Renderiza o cronograma inicial
    renderizarCronograma(tarefasIniciais);
});