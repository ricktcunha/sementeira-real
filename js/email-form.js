// email-form.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('solicitacao-form');
    const spinner = document.getElementById('spinner-envio');
    const btnLimpar = document.getElementById('btn-limpar');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (spinner) spinner.classList.remove('hidden');
        setTimeout(() => {
            if (validarFormulario(form)) {
                enviarEmail(form, spinner);
            } else {
                if (spinner) spinner.classList.add('hidden');
            }
        }, 200); // pequena pausa para feedback visual
    });

    if (btnLimpar) {
        btnLimpar.addEventListener('click', function() {
            form.reset();
            // Limpar erros
            const erros = form.querySelectorAll('.form-error');
            erros.forEach(e => { e.textContent = ''; });
            // Limpar aria-invalid
            const inputs = form.querySelectorAll('[aria-invalid]');
            inputs.forEach(i => i.removeAttribute('aria-invalid'));
            // Limpar resumo de erros
            const resumo = document.getElementById('form-error-summary');
            if (resumo) {
                resumo.classList.add('hidden');
                resumo.innerHTML = '';
            }
            // Foco no primeiro campo
            const primeiro = form.querySelector('input, select, textarea');
            if (primeiro) primeiro.focus();
        });
    }
});

function mostrarErro(id, msg) {
    const erro = document.getElementById(id + '-error');
    const input = document.getElementById(id);
    if (erro) erro.textContent = msg;
    if (input) input.setAttribute('aria-invalid', 'true');
}

// Garantir que campos válidos não fiquem com aria-invalid
function limparErro(id) {
    const input = document.getElementById(id);
    if (input) input.removeAttribute('aria-invalid');
}

function validarFormulario(form) {
    let valido = true;
    let primeiroErro = null;
    // Limpar mensagens de erro
    const erros = form.querySelectorAll('.form-error');
    erros.forEach(e => { e.textContent = ''; });
    // Limpar resumo de erros
    const resumo = document.getElementById('form-error-summary');
    if (resumo) {
        resumo.classList.add('hidden');
        resumo.innerHTML = '';
    }

    // Campos obrigatórios
    const campos = [
        { id: 'nome', msg: 'Preencha o nome completo.' },
        { id: 'email', msg: 'Preencha um email válido.' },
        { id: 'departamento', msg: 'Selecione o departamento.' },
        { id: 'centroCusto', msg: 'Preencha o centro de custo.' },
        { id: 'titulo', msg: 'Preencha o título do material.' },
        { id: 'descricao', msg: 'Preencha a descrição detalhada.' },
        { id: 'especificacoes', msg: 'Preencha as especificações técnicas.' }
    ];
    let errosResumo = [];
    campos.forEach(campo => {
        const input = form.elements[campo.id];
        if (!input || !input.value.trim()) {
            mostrarErro(campo.id, campo.msg);
            errosResumo.push(campo.msg);
            valido = false;
            if (!primeiroErro) primeiroErro = input;
        } else if (campo.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
            mostrarErro(campo.id, 'Email inválido.');
            errosResumo.push('Email inválido.');
            valido = false;
            if (!primeiroErro) primeiroErro = input;
        } else {
            limparErro(campo.id);
        }
    });
    // Radio obrigatórios
    const tipo = form.querySelector('input[name="tipo"]:checked');
    if (!tipo) {
        mostrarErro('tipo', 'Selecione o tipo de material.');
        errosResumo.push('Selecione o tipo de material.');
        valido = false;
    } else {
        limparErro('tipo');
    }
    const prioridade = form.querySelector('input[name="prioridade"]:checked');
    if (!prioridade) {
        mostrarErro('prioridade', 'Selecione a prioridade.');
        errosResumo.push('Selecione a prioridade.');
        valido = false;
    } else {
        limparErro('prioridade');
    }
    // Exibir resumo de erros se houver mais de um erro
    if (resumo && errosResumo.length > 0) {
        resumo.innerHTML = `<strong>Por favor, corrija os seguintes erros:</strong><ul class='list-disc list-inside mt-2'>${errosResumo.map(e => `<li>${e}</li>`).join('')}</ul>`;
        resumo.classList.remove('hidden');
    }
    if (!valido && primeiroErro) {
        primeiroErro.focus();
    }
    return valido;
}

function enviarEmail(form, spinner) {
    const data = {
        nome: form.nome.value.trim(),
        email: form.email.value.trim(),
        departamento: form.departamento.value.trim(),
        centroCusto: form.centroCusto.value.trim(),
        tipo: form.querySelector('input[name="tipo"]:checked').value,
        prioridade: form.querySelector('input[name="prioridade"]:checked').value,
        titulo: form.titulo.value.trim(),
        descricao: form.descricao.value.trim(),
        especificacoes: form.especificacoes.value.trim(),
        referencias: form.referencias.value.trim() || 'Nenhuma referência fornecida',
        observacoes: form.observacoes.value.trim() || 'Nenhuma observação adicional'
    };
    const destinatarios = [
        'henrique.cunha@adubosreal.com.br',
        'juliana.leopoldino@adubosreal.com.br'
    ].join(',');
    const assunto = `Nova Solicitação - ${data.tipo} - ${data.prioridade}`;
    const corpo = `NOVA SOLICITAÇÃO DE MATERIAL\n\nDADOS DO SOLICITANTE:\nNome: ${data.nome}\nEmail: ${data.email}\nDepartamento: ${data.departamento}\nCentro de Custo: ${data.centroCusto}\n\nDETALHES DA SOLICITAÇÃO:\nTipo de Material: ${data.tipo}\nPrioridade: ${data.prioridade}\nTítulo: ${data.titulo}\n\nDESCRIÇÃO DETALHADA:\n${data.descricao}\n\nESPECIFICAÇÕES TÉCNICAS:\n${data.especificacoes}\n\nLINKS DE REFERÊNCIA:\n${data.referencias}\n\nOBSERVAÇÕES ADICIONAIS:\n${data.observacoes}\n\nData e Hora: ${new Date().toLocaleString('pt-BR')}\nEnviado via Sistema Sementeira Real`;
    const mailtoLink = `mailto:${destinatarios}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    window.location.href = mailtoLink;
    // Mensagem de sucesso
    setTimeout(() => {
        const formSection = document.getElementById('form-section');
        const successSection = document.getElementById('success-section');
        if (formSection && successSection) {
            formSection.style.display = 'none';
            successSection.innerHTML = `<div class='card max-w-2xl mx-auto text-center'><div class='text-green-500 text-6xl mb-6'><i class='fas fa-check-circle'></i></div><h2 class='text-3xl font-bold mb-4'>Solicitação pronta para envio!</h2><p class='text-xl mb-8'>Seu programa de email foi aberto. Confira os dados e clique em <b>Enviar</b> para concluir a solicitação.</p><a href='index.html' class='btn-secondary'><i class='fas fa-home mr-2'></i>Voltar ao Início</a></div>`;
            successSection.style.display = 'block';
        }
        if (spinner) spinner.classList.add('hidden');
    }, 800);
} 