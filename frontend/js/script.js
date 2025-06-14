document.addEventListener('DOMContentLoaded', () => {
    // --- SEU CÓDIGO EXISTENTE FICA AQUI ---
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
    renderizarCronograma(tarefasIniciais);
    // Pega os elementos do DOM
    const submitLoginBtn = document.getElementById('submit-login');
    const usernameInput = document.getElementById('username-input');
    const userDisplay = document.getElementById('user-display');
    
    // Pega a instância do Modal do Bootstrap para podermos fechá-lo via JS
    const loginModalElement = document.getElementById('loginModal');
    const loginModal = bootstrap.Modal.getOrCreateInstance(loginModalElement);

    // Adiciona um evento de clique ao botão "Entrar" do modal
    submitLoginBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim(); // Pega o nome e remove espaços em branco

        // Verifica se o usuário digitou um nome
        if (username){
            // Se sim, atualiza a barra de navegação
            userDisplay.innerHTML = `<span class="navbar-text text-white">Olá, ${username}!</span>`;

            // Fecha o modal
            loginModal.hide();

            // Limpa o campo do input para a próxima vez
            usernameInput.value = '';
        } else{
            // Opcional: Avisa o usuário que ele precisa digitar um nome
            alert('Por favor, digite um nome de usuário.');
        }
    });
});