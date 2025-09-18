const express = require('express');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'data', 'produtos.json');

app.use(express.json());
app.use(express.static('public'));

// Rota para ler os produtos
app.get('/api/produtos', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.json([]);
        }
        res.json(JSON.parse(data));
    });
});

// Rota para adicionar/atualizar produtos
app.post('/api/produtos', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        const produtos = err ? [] : JSON.parse(data);
        const novoProduto = { id: Date.now(), ...req.body };
        produtos.push(novoProduto);

        fs.writeFile(DATA_FILE, JSON.stringify(produtos, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao salvar o produto' });
            }
            res.json(novoProduto);
        });
    });
});

// Rota para deletar produtos
app.delete('/api/produtos/:id', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler os produtos' });
        }
        let produtos = JSON.parse(data);
        produtos = produtos.filter(p => p.id != req.params.id);

        fs.writeFile(DATA_FILE, JSON.stringify(produtos, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao deletar o produto' });
            }
            res.status(200).send();
        });
    });
});

// Rota para gerar relatório
app.get('/api/relatorio', async (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE);
        const produtos = JSON.parse(data);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Relatório de Produtos');

        worksheet.columns = [
            { header: 'Categoria', key: 'categoria', width: 15 },
            { header: 'Subcategoria', key: 'subcategoria', width: 20 },
            { header: 'Nome do Produto', key: 'nome', width: 30 },
            { header: 'Quantidade', key: 'quantidade', width: 15 },
            { header: 'Preço', key: 'preco', width: 10 }
        ];

        worksheet.addRows(produtos);

        // Relatório por categoria
        const vendasPorCategoria = produtos.reduce((acc, p) => {
            if (!acc[p.categoria]) {
                acc[p.categoria] = { valorTotal: 0, quantidadeTotal: 0 };
            }
            acc[p.categoria].valorTotal += p.quantidade * p.preco;
            acc[p.categoria].quantidadeTotal += p.quantidade;
            return acc;
        }, {});

        const relatorioCategoria = workbook.addWorksheet('Vendas por Categoria');
        relatorioCategoria.addRow(['Categoria', 'Quantidade Total', 'Valor Total']);
        Object.keys(vendasPorCategoria).forEach(cat => {
            relatorioCategoria.addRow([cat, vendasPorCategoria[cat].quantidadeTotal, vendasPorCategoria[cat].valorTotal]);
        });

        // Relatório por subcategoria
        const vendasPorSubcategoria = produtos.reduce((acc, p) => {
            if (!acc[p.subcategoria]) {
                acc[p.subcategoria] = { valorTotal: 0, quantidadeTotal: 0 };
            }
            acc[p.subcategoria].valorTotal += p.quantidade * p.preco;
            acc[p.subcategoria].quantidadeTotal += p.quantidade;
            return acc;
        }, {});

        const relatorioSubcategoria = workbook.addWorksheet('Vendas por Subcategoria');
        relatorioSubcategoria.addRow(['Subcategoria', 'Quantidade Total', 'Valor Total']);
        Object.keys(vendasPorSubcategoria).forEach(sub => {
            relatorioSubcategoria.addRow([sub, vendasPorSubcategoria[sub].quantidadeTotal, vendasPorSubcategoria[sub].valorTotal]);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'relatorio.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar o relatório' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});