document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const categoriaSelect = document.getElementById('categoria');
    const subcategoriaSelect = document.getElementById('subcategoria');
    const tableBody = document.querySelector('#product-table tbody');
    const generateReportButton = document.getElementById('generate-report');

    const subcategorias = {
        Bebidas: ['Alcoólicas', 'Refrigerantes'],
        Comidas: ['Salgados', 'Petiscos']
    };

    // Função para preencher a combobox de subcategoria
    categoriaSelect.addEventListener('change', () => {
        const categoriaSelecionada = categoriaSelect.value;
        subcategoriaSelect.innerHTML = '<option value="">Selecione...</option>';
        if (categoriaSelecionada && subcategorias[categoriaSelecionada]) {
            subcategorias[categoriaSelecionada].forEach(sub => {
                const option = document.createElement('option');
                option.value = sub;
                option.textContent = sub;
                subcategoriaSelect.appendChild(option);
            });
        }
    });

    // Função para carregar e exibir os produtos
    const fetchProducts = async () => {
        const response = await fetch('/api/produtos');
        const produtos = await response.json();
        tableBody.innerHTML = '';
        produtos.forEach(p => addProductToTable(p));
    };

    // Função para adicionar uma linha na tabela
    const addProductToTable = (produto) => {
        const row = tableBody.insertRow();
        row.id = `produto-${produto.id}`;
        row.innerHTML = `
            <td>${produto.categoria}</td>
            <td>${produto.subcategoria}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco}</td>
            <td class="actions">
                <button onclick="editProduct(${produto.id})">Editar</button>
                <button onclick="deleteProduct(${produto.id})">Excluir</button>
            </td>
        `;
    };

    // Função para adicionar um novo produto
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const novoProduto = {
            categoria: categoriaSelect.value,
            subcategoria: subcategoriaSelect.value,
            nome: document.getElementById('nome').value,
            quantidade: parseInt(document.getElementById('quantidade').value),
            preco: parseFloat(document.getElementById('preco').value)
        };

        await fetch('/api/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoProduto)
        });

        form.reset();
        fetchProducts();
    });

    // Função para deletar um produto (acessível globalmente)
    window.deleteProduct = async (id) => {
        await fetch(`/api/produtos/${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    // Função para editar um produto (implementação simples com prompt)
    window.editProduct = async (id) => {
        const newName = prompt('Novo nome do produto:');
        if (newName) {
            // Implementação mais completa envolveria um modal ou campos de input
            // Mas para este exemplo, simplificamos.
            // A rota de edição precisaria ser implementada no `server.js`
            alert('A edição é uma funcionalidade a ser implementada de forma mais robusta.');
        }
    };

    // Função para gerar o relatório
    generateReportButton.addEventListener('click', () => {
        window.location.href = '/api/relatorio';
    });

    fetchProducts();
});