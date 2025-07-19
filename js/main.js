// ===== FUNCIONALIDADES PRINCIPAIS =====

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initSmoothScrolling();
    initIntersectionObserver();
    initTooltips();
    initFormValidation();
    restaurarDadosFormulario();
    salvarDadosAoDigitar();
    // Garantir submit correto do formulário
    const form = document.getElementById('solicitacao-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            enviarSolicitacao();
        });
    }
});

// ===== MENU MOBILE =====
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animar ícone do menu
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars';
            } else {
                icon.className = 'fas fa-times';
            }
        });
        
        // Fechar menu ao clicar em um link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== INTERSECTION OBSERVER PARA ANIMAÇÕES =====
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.card, .resource-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== TOOLTIPS =====
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                showTooltip(this, tooltip);
            }
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
}

function showTooltip(element, text) {
    // Remover tooltip existente
    hideTooltip();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg pointer-events-none';
    tooltip.textContent = text;
    tooltip.id = 'custom-tooltip';
    
    document.body.appendChild(tooltip);
    
    // Posicionar tooltip
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
    let top = rect.top - tooltipRect.height - 8;
    
    // Ajustar se sair da tela
    if (left < 8) left = 8;
    if (left + tooltipRect.width > window.innerWidth - 8) {
        left = window.innerWidth - tooltipRect.width - 8;
    }
    if (top < 8) {
        top = rect.bottom + 8;
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    
    // Animar entrada
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        tooltip.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
    }, 10);
}

function hideTooltip() {
    const tooltip = document.getElementById('custom-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// ===== VALIDAÇÃO DE FORMULÁRIO =====
// A validação é gerenciada pelo form-validation.js
function initFormValidation() {
    // Esta função é mantida para compatibilidade, mas a validação real
    // é feita pela classe FormValidator em form-validation.js
    console.log('Validação de formulário inicializada via form-validation.js');
}

// ===== FUNÇÃO DE ENVIO DE SOLICITAÇÃO (SIMPLIFICADA) =====
function enviarSolicitacao() {
    const form = document.getElementById('solicitacao-form');
    if (!form) return;
    const formData = new FormData(form);
    // Coletar dados do formulário
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        departamento: formData.get('departamento'),
        centroCusto: formData.get('centroCusto'),
        tipo: formData.get('tipo'),
        prioridade: formData.get('prioridade'),
        titulo: formData.get('titulo'),
        descricao: formData.get('descricao'),
        especificacoes: formData.get('especificacoes'),
        referencias: formData.get('referencias') || 'Nenhuma referência fornecida',
        observacoes: formData.get('observacoes') || 'Nenhuma observação adicional'
    };
    // Destinatários fixos
    const destinatarios = [
        'henrique.cunha@adubosreal.com.br',
        'juliana.leopoldino@adubosreal.com.br'
    ].join(',');
    // Assunto do email
    const assunto = `Nova Solicitação - ${data.tipo} - ${data.prioridade}`;
    // Corpo do email
    const corpo = `NOVA SOLICITAÇÃO DE MATERIAL\n\nDADOS DO SOLICITANTE:\nNome: ${data.nome}\nEmail: ${data.email}\nDepartamento: ${data.departamento}\nCentro de Custo: ${data.centroCusto}\n\nDETALHES DA SOLICITAÇÃO:\nTipo de Material: ${data.tipo}\nPrioridade: ${data.prioridade}\nTítulo: ${data.titulo}\n\nDESCRIÇÃO DETALHADA:\n${data.descricao}\n\nESPECIFICAÇÕES TÉCNICAS:\n${data.especificacoes}\n\nLINKS DE REFERÊNCIA:\n${data.referencias}\n\nOBSERVAÇÕES ADICIONAIS:\n${data.observacoes}\n\nData e Hora: ${new Date().toLocaleString('pt-BR')}\nEnviado via Sistema Sementeira Real`;
    // Gerar link mailto
    const mailtoLink = `mailto:${destinatarios}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    // Redirecionar para o mailto
    window.location.href = mailtoLink;
    // Mostrar mensagem simples na tela
    setTimeout(() => {
        const formSection = document.getElementById('form-section');
        const successSection = document.getElementById('success-section');
        if (formSection && successSection) {
            formSection.style.display = 'none';
            successSection.innerHTML = `<div class='card max-w-2xl mx-auto text-center'><div class='text-green-500 text-6xl mb-6'><i class='fas fa-check-circle'></i></div><h2 class='text-3xl font-bold mb-4'>Solicitação pronta para envio!</h2><p class='text-xl mb-8'>Seu programa de email foi aberto. Confira os dados e clique em <b>Enviar</b> para concluir a solicitação.</p><a href='index.html' class='btn-secondary'><i class='fas fa-home mr-2'></i>Voltar ao Início</a></div>`;
            successSection.style.display = 'block';
        }
    }, 800);
}

// ===== RESTAURAR DADOS DO FORMULÁRIO =====
function restaurarDadosFormulario() {
    const data = localStorage.getItem('solicitacaoFormData');
    if (!data) return;
    const form = document.getElementById('solicitacao-form');
    if (!form) return;
    const dados = JSON.parse(data);
    Object.keys(dados).forEach(key => {
        const field = form.elements[key];
        if (field) {
            if (field.type === 'radio') {
                const radios = form.querySelectorAll(`[name="${key}"]`);
                radios.forEach(radio => {
                    radio.checked = (radio.value === dados[key]);
                });
            } else {
                field.value = dados[key];
            }
        }
    });
}

// ===== SALVAR DADOS AO DIGITAR =====
function salvarDadosAoDigitar() {
    const form = document.getElementById('solicitacao-form');
    if (!form) return;
    form.addEventListener('input', () => {
        const formData = new FormData(form);
        const data = {
            nome: formData.get('nome'),
            email: formData.get('email'),
            departamento: formData.get('departamento'),
            centroCusto: formData.get('centroCusto'),
            tipo: formData.get('tipo'),
            prioridade: formData.get('prioridade'),
            titulo: formData.get('titulo'),
            descricao: formData.get('descricao'),
            especificacoes: formData.get('especificacoes'),
            referencias: formData.get('referencias') || '',
            observacoes: formData.get('observacoes') || ''
        };
        localStorage.setItem('solicitacaoFormData', JSON.stringify(data));
    });
}

// ===== FUNÇÃO PARA RESETAR FORMULÁRIO =====
function resetForm() {
    const form = document.getElementById('solicitacao-form');
    const formSection = document.getElementById('form-section');
    const successSection = document.getElementById('success-section');
    
    form.reset();
    
    // Limpar erros
    const errorElements = form.querySelectorAll('.form-error');
    errorElements.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    
    // Limpar bordas vermelhas
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('border-red-500');
    });
    
    // Voltar para o formulário
    formSection.style.display = 'block';
    successSection.style.display = 'none';
    
    // Scroll para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== UTILITÁRIOS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== EXPORTAR FUNÇÕES PARA USO GLOBAL =====
window.enviarSolicitacao = enviarSolicitacao;
window.resetForm = resetForm; 