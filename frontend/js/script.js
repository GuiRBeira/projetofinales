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
// --- LÓGICA DE LOGIN ATUALIZADA ---
    const submitLoginBtn = document.getElementById('submit-login');
    const usernameInput = document.getElementById('username-input');
    const userDisplay = document.getElementById('user-display');
    const loginModalElement = document.getElementById('loginModal');
    const loginModal = bootstrap.Modal.getOrCreateInstance(loginModalElement);

    // Adiciona um evento de clique ao botão "Entrar" do modal
    // A função agora é 'async' para podermos usar 'await'
    submitLoginBtn.addEventListener('click', async () => {
        const username = usernameInput.value.trim();

        if (!username) {
            alert('Por favor, digite um nome de usuário.');
            return; // Interrompe a execução se o campo estiver vazio
        }
        // --- Início da chamada à API ---
        
        // Melhora a experiência do usuário mostrando que algo está acontecendo
        submitLoginBtn.disabled = true;
        submitLoginBtn.textContent = 'Verificando...';

        try {
            // **IMPORTANTE**: Substitua esta URL pela URL real da sua API!
            const apiUrl = "http://localhost:8000/api/validarUsuario"; // URL da API que valida o usuário

            const response = await fetch(apiUrl, {
                method: 'POST', // Método da requisição
                headers: {
                    'Content-Type': 'application/json' // Avisa a API que estamos enviando JSON
                },
                body: JSON.stringify({ username: username }) // Envia o nome de usuário no corpo da requisição
            });

            // Pega a resposta da API e a transforma em um objeto JSON
            const data = await response.json();

            // Verifica se a resposta da API indica que o usuário é válido
            // **IMPORTANTE**: Adapte 'data.isValid' para o que sua API realmente retornar (ex: data.success, data.status === 'ok')
            if (response.ok && data.isValid) {
                // Se for válido, atualiza a barra de navegação
                userDisplay.innerHTML = `<span class="navbar-text text-white">Olá, ${username}!</span>`;
                loginModal.hide(); // Fecha o modal
                usernameInput.value = ''; // Limpa o campo
            } else {
                // Se não for válido, avisa o usuário
                alert(data.message || 'Usuário inválido ou não encontrado.'); // Usa a mensagem da API, se houver
            }

        } catch (error) {
            // Se houver um erro de rede ou a API estiver fora do ar
            console.error('Erro ao fazer a requisição de login:', error);
            alert('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
        } finally {
            // Este bloco sempre será executado, independentemente de sucesso ou erro
            // Restaura o botão ao seu estado original
            submitLoginBtn.disabled = false;
            submitLoginBtn.textContent = 'Entrar';
        }
    });
});