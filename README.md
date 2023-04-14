4uth é um projeto de autenticação de usuários que segue os princípios da Clean Architecture. A arquitetura do projeto é baseada em camadas, tornando-o mais testável, escalável e fácil de manter.

#### Tecnologias Utilizadas
- Node.js
- JavaScript
- Express
- MongoDB
- Github Actions

#### Funcionalidades
- Registro de usuários
- Autenticação de usuários
- Atualização de perfil do usuário
- Recuperação de senha

#### Como Executar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/guisteink/4uth.git
```

2. Instale as dependências:
```
cd 4uth
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:
```
MONGO_URI=<url-de-conexão-com-o-banco-de-dados>
PORT=<porta-de-acesso>
SECRET=<segredo-para-geração-de-tokens-JWT>
NODE_ENV=<varialel-que-indica-ambiente>
```

4. Inicie o servidor:
```
npm run start
```
