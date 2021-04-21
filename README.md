# Case - Técnico

- Implementar uma aplicação client-side onde será encontrar todas as informações sobre as comics e characters da marvel;
- Implementar uma aplicação server-side que conterá funções de autenticação, gerenciamentos de usuários e de comics/characters favoritos.

## API

- Utilizar a api de developer da marvel (https://developer.marvel.com/).

## Navegação

- Deve existir uma página de cadastro de usuário para a aplicação;
- Ao cadastrar o usuário será possível realizar o login;
- Ao logar na aplicação deverá ser possível realizar a alterações dos dados do usuário. ex: login, senha, etc...;
- Ao logar na aplicação deverá ser possível realizar a busca de characters e comics da marvel e os favoritos do usuário;
- Buscando por Comics: ao encontrar uma comic desejada deve ser possível favoritar e visualizar as informações da mesma e a exibição dos characteres presentes nela, sendo possível selecionar um character e visualizar as informações do mesmo;
- Buscando por Characteres: ao encontrar um character desejado deve ser possível favoritar e visualizar as informações do mesmo e a exibição das comics onde ele participa, sendo possível selecionar uma comic e visualizar as informações da mesma;
- Exibindo favoritos: deve existir páginas que exibe as comics favoritas e os characters favoritos do usuário, podendo exibir as informações dos mesmos.

## Requisitos

- Eu, como usuário, desejo me cadastrar na aplicação e efetuar login/logout;
- Eu, como usuário, desejo editar minhas informações;
- Eu, como usuário, desejo ver a listagem e detalhes das comics, podendo favoritar ou desfavoritar; 
- Eu, como usuário, desejo ver a listagem e detalhes dos characters, podendo favoritar ou desfavoritar; 
- Eu, como usuário, desejo ver a listagem e detalhes dos characters e comics favoritos.
 
### Server-Side

- A linguagem do backend não é restrita e nem o uso de framework, mas recomendamos a utilização de Javascript;
- Para melhorar segurança da aplicação sugerimos a utilização de JWT para a autenticação;
- Sugerimos a utilização de um banco de dados relacional;
- É obrigatório utilizar API com arquitetura REST.


# node_sample_projects

Dependencies and modules:  express, mongoose, ejs, cors, jsonwebtoken, bcryptjs, node-fetch