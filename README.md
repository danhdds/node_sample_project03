# Simple Marvel App

Dependencies and modules:  express, mongoose, ejs, cors, jsonwebtoken, bcryptjs, node-fetch
- Linguagem: JavaScript
- Banco de Dados MongoDB (não precisa instalar banco de dados local se for instalar uma versão local desse app, ele está na nuvem em um cluster).
  Por que a escolha noSql: Como estamos manipulando basicamente objetos, fez todo o sentindo utilizar noSql, pois noSql em si tem esse design de modelo baseado em objetos(favor não confundir a semântica no sentindo de paradigma orientado a objetos, OO DB ... rsrs...), como não vi uma 
  necessidade de criar relações mais complexas e robustas com as diferentes entidades manipuladas, escolhi noSql, pois vi que poderia juntar todos os dados manipulados em uma só estrutura.
  Os bancos de dados SQL são mais adequados para transações pesadas ou complexas porque são mais estáveis e garantem a integridade dos dados.

- Arquitetura: MVC

* Para rodar este app, clone o projeto e rode os seguintes comandos no diretório principal:

1 - npm install
2 - npm start

Para mais detalhes acerca das dependências da aplicação, favor acessar:
package-lock.json
package.json
no diretótio principal

Nota: O ambiente deve estar configurado para rodar projetos Node.js

O ponto de entrada da aplicação é "app.js", você encontra este arquivo no diretório "src".

Só precisa rodar o comando: node app ou nodemon app
A aplicação poderá ser acessada em: http://localhost:5000/ 
Ou visite: https://simple-marvel-app09.herokuapp.com/ para ver a aplicação rodando...

To do list:

* Implementar a função desfavoritar;
* Comentar partes pertinentes do código;
* Iterface responsiva. OBS: (se quiser ter uma noção de minhas habilidades em páginas responsivas, favor visitar: https://kesso.uk/search (meu atual projeto));
* Test unitários utilizando JEST;
* Melhorar performance das requisições, evitar requisições desnecessárias de conteúdo;
* Excluir conta do usuário
* Excluir favoritos/ Characters ou Comics

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
