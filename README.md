# banco-de-dados-com-excel
# 📦 Sistema de Gerenciamento de Produtos Avançado

## 🖼️ Imagem do Projeto
![Dashboard do Sistema](https://via.placeholder.com/800x400.png?text=Dashboard+do+Sistema)
*Substitua esta imagem por uma captura de tela ou GIF do seu projeto em ação.*

## 📖 Sobre o Projeto
Este projeto representa uma solução robusta e moderna para o gerenciamento de produtos, ideal para otimizar processos de controle de estoque e vendas em ambientes empresariais. Desenvolvido com uma abordagem **full-stack**, a aplicação demonstra as melhores práticas de desenvolvimento web, utilizando uma arquitetura escalável e um conjunto de tecnologias de ponta. A interface de usuário, responsiva e intuitiva, permite uma interação fluida com os dados.

### 🎯 Motivação
A principal motivação por trás deste projeto foi criar uma ferramenta de gerenciamento que fosse ao mesmo tempo poderosa e simples de usar. A necessidade de um sistema que garantisse a consistência dos dados (com validações), proporcionasse uma experiência de usuário agradável (com listas suspensas e feedback instantâneo) e que oferecesse relatórios detalhados para análise de negócios levou ao desenvolvimento desta solução completa e eficiente.

## ✨ Funcionalidades Principais
*   **Gestão Completa de Produtos (CRUD):**
    *   **Criar:** Formulário com validação para adicionar novos produtos.
    *   **Ler:** Tabela interativa que exibe todos os produtos cadastrados.
    *   **Atualizar:** Modal de edição para modificar informações de produtos existentes.
    *   **Deletar:** Confirmação para exclusão de produtos, prevenindo ações acidentais.
*   **Interface Otimizada:**
    *   **Comboboxes Dinâmicos:** Listas suspensas para Categoria e Subcategoria que evitam erros de digitação e padronizam os dados.
    *   **Validação em Tempo Real:** Validação automática para campos numéricos (`Quantidade`, `Preço`).
    *   **Pesquisa Dinâmica:** Campo de busca que filtra a tabela de produtos instantaneamente.
*   **Relatórios Profissionais em Excel:**
    *   **Download de Arquivo XLS:** Botão para baixar um arquivo Excel com dados organizados.
    *   **Relatórios Analíticos:** Inclui planilhas com resumos de vendas por categoria e subcategoria (quantidade total e valor total).
*   **Arquitetura Robusta:**
    *   **Backend RESTful:** API bem definida, seguindo os princípios REST, para comunicação com o frontend.
    *   **Banco de Dados Relacional:** Utilização de PostgreSQL com Sequelize ORM para persistência de dados confiável e escalável.

## 🚀 Como Executar o Projeto
### Pré-requisitos
Antes de começar, garanta que você tem as seguintes ferramentas instaladas:
*   [**Node.js**](https://nodejs.org/) (versão LTS recomendada)
*   **Banco de Dados PostgreSQL**

### Instalação e Configuração
1.  **Clone o repositório para a sua máquina local:**
    ```sh
    git clone https://github.com/Ffuffy/banco-de-dados-com-excel/edit/main/README.md
  
2.  **Instale as dependências do projeto:**
    ```sh
    npm install
    ```
3.  **Configure o banco de dados PostgreSQL:**
    *   Crie um banco de dados PostgreSQL para o projeto.
    *   Crie um arquivo `.env` na raiz do projeto e adicione a sua string de conexão:
        ```env
        DATABASE_URL="postgres://usuario:senha@host:porta/banco_de_dados"
        PORT=3000
        ```
4.  **Inicie a aplicação:**
    ```sh
    node server.js
    ```
5.  **Acesse a interface:**
    Abra seu navegador e navegue para `http://localhost:3000` para começar a usar o sistema.

## 🛠️ Arquitetura e Tecnologias
### Visão Geral
O projeto segue uma arquitetura de serviço bem definida, separando as preocupações de forma clara:
*   **Frontend (`/public`):** Aplicação cliente, construída com HTML, CSS e JavaScript puro, responsável pela interface do usuário e pelas interações com a API.
*   **Backend (`/src`):** API RESTful, desenvolvida com Node.js e Express, que lida com a lógica de negócio, persistência de dados e geração de relatórios.
*   **Banco de Dados:** PostgreSQL, gerenciado pelo ORM Sequelize, para armazenamento seguro e escalável dos dados de produtos.

### Stack Tecnológica
*   **Backend:**
    *   **Node.js:** Ambiente de execução.
    *   **Express:** Framework para o servidor web.
    *   **Sequelize:** ORM para abstração e interação com o banco de dados.
    *   **pg:** Driver de conexão com o PostgreSQL.
    *   **ExcelJS:** Biblioteca para criação e manipulação de arquivos Excel.
    *   **dotenv:** Gerenciamento de variáveis de ambiente.
*   **Frontend:**
    *   **HTML5, CSS3, JavaScript (ES6+):** Tecnologias padrão da web.
*   **Ferramentas:**
    *   **Render:** Plataforma de hospedagem gratuita.
    *   **Git & GitHub:** Controle de versão e colaboração.

## 🤝 Como Contribuir
Contribuições são sempre bem-vindas! Se você deseja colaborar com este projeto, siga os passos abaixo:
1.  **Faça um fork** deste repositório.
2.  **Crie uma nova branch** para sua funcionalidade: `git checkout -b minha-funcionalidade`.
3.  **Faça suas alterações** e `commit` as mudanças.
4.  **Envie as mudanças** para o seu fork: `git push origin minha-funcionalidade`.
5.  **Abra um Pull Request**, descrevendo detalhadamente as alterações propostas.

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
**Desenvolvido por:** [Seu Nome/Usuário]

