// ===== TELA DE LOGIN =====
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formLogin');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o envio padrão

            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();

            // Validação simples
            if (email === '' || senha === '') {
                alert('Preencha todos os campos!');
                return;
            }

            if (senha.length < 6) {
                alert('A senha deve ter no mínimo 6 caracteres.');
                return;
            }

            // Simulação de login bem-sucedido
            alert('Login realizado com sucesso! 👋');
            // Redirecionar para o Dashboard (após criar a página)
             window.location.href = 'dashboard.html';
        });
    }
});
// ===== TELA DE CADASTRO =====
document.addEventListener('DOMContentLoaded', function () {
    const formCadastro = document.getElementById('formCadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', function (event) {
            event.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();
            const confirmarSenha = document.getElementById('confirmarSenha').value.trim();
            const serie = document.getElementById('serie').value;

            // Validações
            if (!nome || !email || !senha || !confirmarSenha || !serie) {
                alert('Preencha todos os campos!');
                return;
            }

            if (senha.length < 6) {
                alert('A senha deve ter no mínimo 6 caracteres.');
                return;
            }

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem.');
                return;
            }

            // Verifica se o e-mail já está cadastrado (simulação com localStorage)
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const existe = usuarios.some(u => u.email === email);
            if (existe) {
                alert('Este e-mail já está cadastrado. Faça login.');
                return;
            }

            // Salva o novo usuário
            const novoUsuario = { nome, email, senha, serie };
            usuarios.push(novoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('Cadastro realizado com sucesso! 🎉');
            // Redireciona para a tela de login
            window.location.href = 'index.html';
        });
    }
});
// ===== TELA DE DASHBOARD =====
// ===== TELA DE DASHBOARD =====
document.addEventListener('DOMContentLoaded', function () {
    // Verifica se o elemento que só existe no dashboard está presente
    if (document.getElementById('nomeUsuario')) {
        carregarDashboard();
    }
});

function carregarDashboard() {
    // 1. Nome do usuário (pegando do localStorage)
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    // Simula o usuário logado (o primeiro da lista, para teste)
    const usuarioLogado = usuarios.length > 0 ? usuarios[0] : null;
    if (usuarioLogado) {
        document.getElementById('nomeUsuario').textContent = usuarioLogado.nome;
    } else {
        // Se não houver usuário, redireciona para login
        window.location.href = 'index.html';
        return;
    }

    // 2. Data atual
    const hoje = new Date();
    const opcoes = { day: '2-digit', month: 'long', year: 'numeric' };
    document.getElementById('dataAtual').textContent = hoje.toLocaleDateString('pt-BR', opcoes);

    // 3. Calendário resumido (mês atual)
    const mesAno = hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    document.getElementById('mesAno').textContent = mesAno.charAt(0).toUpperCase() + mesAno.slice(1);

    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1).getDay();
    const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
    const hojeNum = hoje.getDate();

    const containerDias = document.getElementById('diasMes');
    containerDias.innerHTML = '';

    // Preenche os dias vazios antes do primeiro dia
    for (let i = 0; i < primeiroDia; i++) {
        const span = document.createElement('span');
        span.textContent = '';
        containerDias.appendChild(span);
    }

    // Preenche os dias do mês
    for (let d = 1; d <= ultimoDia; d++) {
        const span = document.createElement('span');
        span.textContent = d;
        if (d === hojeNum) {
            span.classList.add('hoje');
        }
        containerDias.appendChild(span);
    }

    // 4. Provas da semana (exemplo fixo – depois integra com localStorage)
    const listaProvas = document.getElementById('listaProvas');
    const provas = [
        { disciplina: 'Matemática', data: '15/09', descricao: 'Prova Bimestral' },
        { disciplina: 'Ciências', data: '17/09', descricao: 'Trabalho em grupo' },
    ];
    listaProvas.innerHTML = '';
    if (provas.length > 0) {
        provas.forEach(p => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${p.disciplina}</strong> - ${p.data} (${p.descricao})`;
            listaProvas.appendChild(li);
        });
    } else {
        listaProvas.innerHTML = '<li>Nenhuma prova cadastrada esta semana.</li>';
    }

    // 5. Metas de estudo (exemplo fixo)
    const listaMetas = document.getElementById('listaMetas');
    const metas = [
        { titulo: 'Revisar capítulo 5', progresso: '40%' }
    ];
    listaMetas.innerHTML = '';
    if (metas.length > 0) {
        metas.forEach(m => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${m.titulo}</strong> - Progresso: ${m.progresso}`;
            listaMetas.appendChild(li);
        });
    } else {
        listaMetas.innerHTML = '<li>Nenhuma meta definida.</li>';
    }

    // 6. Botão Sair
    document.getElementById('btnSair').addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    // 7. Botão Nova Atividade
    document.getElementById('btnNovaAtividade').addEventListener('click', function () {
        alert('Em breve você poderá cadastrar novas atividades!');
        // window.location.href = 'nova-atividade.html';
    });
}
// ===== TELA DE AGENDA =====
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('btnVoltarAgenda')) {
        carregarAgenda();
    }
});

function carregarAgenda() {
    // Botão Voltar para o Dashboard
    document.getElementById('btnVoltarAgenda').addEventListener('click', function () {
        window.location.href = 'dashboard.html';
    });

    // 1. Calcular a semana atual (segunda a sexta)
    const hoje = new Date();
    const diaSemana = hoje.getDay(); // 0 = domingo
    const diffSegunda = (diaSemana === 0 ? 6 : diaSemana - 1); // ajuste para segunda
    const segunda = new Date(hoje);
    segunda.setDate(hoje.getDate() - diffSegunda);

    // Preencher título da semana
    const dataInicio = segunda.toLocaleDateString('pt-BR');
    const dataFim = new Date(segunda);
    dataFim.setDate(segunda.getDate() + 4);
    document.getElementById('semanaTitulo').textContent = 
        `Semana de ${dataInicio} a ${dataFim.toLocaleDateString('pt-BR')}`;

    // 2. Preencher os dias (Segunda a Sexta)
    const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
    const idsDatas = ['dataSeg', 'dataTer', 'dataQua', 'dataQui', 'dataSex'];
    const idsAtividades = ['atividadesSeg', 'atividadesTer', 'atividadesQua', 'atividadesQui', 'atividadesSex'];

    for (let i = 0; i < 5; i++) {
        const diaAtual = new Date(segunda);
        diaAtual.setDate(segunda.getDate() + i);
        const dataFormatada = diaAtual.getDate().toString().padStart(2, '0');
        document.getElementById(idsDatas[i]).textContent = dataFormatada;

        // Exemplo de atividades (futuramente virá do localStorage)
        const lista = document.getElementById(idsAtividades[i]);
        // Simula algumas atividades para demonstração
        const atividadesExemplo = {
            'Seg': ['Matemática - Prova'],
            'Ter': ['Ciências - Trabalho'],
            'Qua': [],
            'Qui': ['História - Prova'],
            'Sex': ['Português - Tarefa']
        };
        const atividadesDoDia = atividadesExemplo[dias[i]] || [];
        lista.innerHTML = '';
        if (atividadesDoDia.length === 0) {
            const li = document.createElement('li');
            li.className = 'sem-atividade';
            li.textContent = '---';
            lista.appendChild(li);
        } else {
            atividadesDoDia.forEach(ativ => {
                const li = document.createElement('li');
                li.textContent = ativ;
                lista.appendChild(li);
            });
        }
    }

    // 3. Próximos 7 dias (resumo)
    const listaProximos = document.getElementById('listaProximosDias');
    // Exemplo fixo
    const proximos = [
        '15/09 - Matemática (Prova)',
        '17/09 - Ciências (Trabalho)',
        '18/09 - História (Prova)'
    ];
    listaProximos.innerHTML = '';
    if (proximos.length > 0) {
        proximos.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listaProximos.appendChild(li);
        });
    } else {
        listaProximos.innerHTML = '<li>Nenhuma atividade nos próximos dias.</li>';
    }
}
// ===== TELA DE AGENDA =====
document.addEventListener('DOMContentLoaded', function () {
    // Botão Voltar para o Dashboard
    const btnVoltar = document.getElementById('btnVoltar');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', function () {
            window.location.href = 'dashboard.html';
        });
    }
});
// ===== TELA DE AGENDA =====
document.addEventListener('DOMContentLoaded', function () {
    const btnVoltar = document.getElementById('btnVoltar');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', function () {
            window.location.href = 'dashboard.html';
        });
    }
});

async function testarAPI() {
    try {
        const resposta = await fetch('http://localhost:3000/api/status');
        const dados = await resposta.json();

        console.log(dados.mensagem);
    } catch (erro) {
        console.error('Erro ao conectar com a API:', erro);
    }
}

testarAPI();