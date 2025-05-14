# MariaFifi Store - Frontend

Bem-vindo ao repositório do **MariaFifi Store**, uma loja virtual de roupas desenvolvida em React + TypeScript, utilizando Vite para build e Tailwind CSS para estilização. Este projeto é o frontend da aplicação MariaFifi.

## ✨ Funcionalidades

- Catálogo de produtos com busca e filtros por categoria
- Página de detalhes do produto
- Carrinho de compras com atualização dinâmica
- Checkout com formulário de entrega e pagamento
- Autenticação de usuário (login, cadastro, logout)
- Página de conta do usuário com dados pessoais e pedidos
- Design responsivo e moderno com Tailwind CSS
- Ícones do Lucide React

## 📦 Estrutura do Projeto

```
src/
  components/      # Componentes React (Cart, Checkout, ProductCard, etc)
  context/         # Contextos de autenticação e carrinho
  data/            # Mock de produtos
  types.ts         # Tipagens TypeScript
  utils.ts         # Funções utilitárias
  App.tsx          # Componente principal
  main.tsx         # Ponto de entrada
  index.css        # Estilos globais (Tailwind)
```

## 🛠️ Requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x

> **Obs:** O backend deve estar rodando em `http://127.0.0.1:8000` para autenticação e produtos.

## 📋 Dependências Principais

- [React 18.3.1](https://react.dev/)
- [TypeScript 5.5.3](https://www.typescriptlang.org/)
- [Vite 5.4.2](https://vitejs.dev/)
- [Tailwind CSS 3.4.1](https://tailwindcss.com/)
- [Lucide React 0.344.0](https://lucide.dev/)
- [date-fns 4.1.0](https://date-fns.org/)
- [react-hot-toast 2.4.1](https://react-hot-toast.com/)

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/mariafifi-store.git
cd mariafifi-store/Store
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o projeto em modo desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

### 4. Build para produção

```bash
npm run build
```

### 5. Preview do build

```bash
npm run preview
```

### 6. Lint do código

```bash
npm run lint
```

## ⚙️ Configuração

- O projeto utiliza [Vite](https://vitejs.dev/) para build e hot reload.
- O CSS é feito com [Tailwind CSS](https://tailwindcss.com/).
- Os ícones são do [Lucide React](https://lucide.dev/).
- O backend deve estar disponível em `http://127.0.0.1:8000` (ajuste as URLs se necessário).

## 🧑‍💻 Desenvolvimento

- Todos os componentes estão em `src/components`.
- Contextos de autenticação e carrinho em `src/context`.
- Tipos TypeScript em `src/types.ts`.
- Funções utilitárias em `src/utils.ts`.

## 📝 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com ❤️ por [Seu Nome ou Equipe]