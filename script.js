let produtos = [
    {
        id: 1,
        foto: "./c.png",
        nome: 'Celular Básico',
        descricao: 'Celular simples para o dia a dia.',
        preco: 1800.00,
        prazoEntrega: 3,
        disponivel: true
    },
    {
        id: 2,
        foto: "./m.jpeg",        nome: 'Mouse Sem Fio',
        descricao: 'Mouse confortável e sem fios.',
        preco: 50.00,
        prazoEntrega: 2,
        disponivel: false
    }
];

let currentProductId = null;

function showMessageModal(title, message) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    document.getElementById('message-modal-overlay').classList.add('show');
}

function closeMessageModal() {
    document.getElementById('message-modal-overlay').classList.remove('show');
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none'; 
    });
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block'; 
    }
}
function validateForm(form) {
    let isValid = true; 
    const requiredFields = form.querySelectorAll('[required]');

    form.querySelectorAll('.error-border').forEach(field => {
        field.classList.remove('error-border');
    });
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false; 
            field.classList.add('error-border'); 
     }
    });

    return isValid; 
}
function renderizarProdutos() {
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = ''; 

    if (produtos.length === 0) {
        listaProdutos.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 1rem; color: #777;">Nenhum produto cadastrado.</td></tr>';
        return;
    }
   produtos.forEach(produto => {
        const row = document.createElement('tr'); 

        row.innerHTML = `
            <td>
                <img src="${produto.foto}" alt="${produto.nome}" onerror="this.onerror=null;this.src='https://placehold.co/100x100/FFCCCC/000?text=Sem+Foto';">
            </td>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>
                <span class="status-badge ${produto.disponivel ? 'status-available' : 'status-unavailable'}">
                    ${produto.disponivel ? 'Sim' : 'Não'}
                </span>
            </td>
            <td class="actions-cell">
                <button onclick="editarProduto(${produto.id})" class="btn btn-warning">Editar</button>
                <button onclick="toggleDisponibilidade(${produto.id})" class="btn btn-info">Disponibilidade</button>
                <button onclick="excluirProduto(${produto.id})" class="btn btn-danger">Excluir</button>
            </td>
        `;
        listaProdutos.appendChild(row); 
    });
}

  
function editarProduto(id) {
    const produto = produtos.find(p => p.id === id);  
    if (produto) {
        currentProductId = id;
        document.getElementById('produto-id').value = produto.id;
        document.getElementById('produto-foto-url').value = produto.foto;
        document.getElementById('produto-nome').value = produto.nome;
        document.getElementById('produto-descricao').value = produto.descricao;
        document.getElementById('produto-preco').value = produto.preco;
        document.getElementById('produto-prazo-entrega').value = produto.prazoEntrega;
        document.getElementById('produto-disponivel').checked = produto.disponivel;

        showMessageModal('Edição de Produto', `Preencha os campos e clique em "Salvar Produto" para atualizar "${produto.nome}".`);
        document.getElementById('cadastro-produto').scrollIntoView({ behavior: 'smooth' });
    }
}
function excluirProduto(id) {
    
    if (confirm('Tem certeza de que deseja excluir este produto?')) {
        produtos = produtos.filter(p => p.id !== id);  
        renderizarProdutos();  
        showMessageModal('Sucesso', 'Produto excluído com sucesso!');
    }
}
 
function toggleDisponibilidade(id) {
    const produto = produtos.find(p => p.id === id);  
    if (produto) {
        produto.disponivel = !produto.disponivel; 
        renderizarProdutos();  
        showMessageModal('Disponibilidade Alterada', `A disponibilidade de "${produto.nome}" foi alterada para ${produto.disponivel ? 'Disponível' : 'Indisponível'}.`);
    }
}
 
function limparFormularioProduto() {
    document.getElementById('form-produto').reset(); 
    document.getElementById('produto-id').value = '';  
    currentProductId = null; 
 
    document.querySelectorAll('#form-produto .error-border').forEach(field => {
        field.classList.remove('error-border');
    });
}
document.addEventListener('DOMContentLoaded', () => {
       document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();  
            const sectionId = event.target.getAttribute('href').substring(1); 
            showSection(sectionId);  
        });
    });
 
    showSection('cadastro-consumidor'); 
    renderizarProdutos();
    document.getElementById('modal-close-button').addEventListener('click', closeMessageModal);

    document.getElementById('form-consumidor').addEventListener('submit', (event) => {
        event.preventDefault();  
        const form = event.target;
        if (validateForm(form)) {  
            const formData = new FormData(form);
            const consumidorData = Object.fromEntries(formData.entries());
            console.log('Dados do Consumidor:', consumidorData);
            showMessageModal('Cadastro de Consumidor', 'Consumidor cadastrado com sucesso (dados fictícios)!');
            form.reset(); 
        } else {
            showMessageModal('Erro de Validação', 'Por favor, preencha todos os campos obrigatórios.');
        }
    });
    document.getElementById('form-vendedor').addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;
        if (validateForm(form)) {
            const formData = new FormData(form);
            const vendedorData = Object.fromEntries(formData.entries());
            console.log('Dados do Vendedor:', vendedorData);
            showMessageModal('Cadastro de Vendedor', 'Vendedor cadastrado com sucesso (dados fictícios)!');
            form.reset();
        } else {
            showMessageModal('Erro de Validação', 'Por favor, preencha todos os campos obrigatórios.');
        }
    });
    document.getElementById('form-produto').addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.target;
        if (validateForm(form)) { 
            const formData = new FormData(form);
            const produtoData = {
                foto: formData.get('foto'),
                nome: formData.get('nome'),
                descricao: formData.get('descricao'),
                preco: parseFloat(formData.get('preco')),  
                prazoEntrega: parseInt(formData.get('prazoEntrega')), 
                disponivel: document.getElementById('produto-disponivel').checked  
            };

            if (currentProductId) {
                const index = produtos.findIndex(p => p.id === currentProductId);
                if (index !== -1) {
                    produtos[index] = { ...produtos[index], ...produtoData }; 
                    showMessageModal('Atualização de Produto', 'Produto atualizado com sucesso!');
                }
            } else {
                const newId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
                produtos.push({ id: newId, ...produtoData }); 
                showMessageModal('Cadastro de Produto', 'Produto cadastrado com sucesso!');
            }
            renderizarProdutos();  
            limparFormularioProduto();  
            showMessageModal('Erro de Validação', 'Por favor, preencha todos os campos obrigatórios do produto.');
        }
    });
     document.getElementById('btn-cancelar-produto').addEventListener('click', limparFormularioProduto);
});