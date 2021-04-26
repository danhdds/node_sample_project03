# node_sample_projects

Dependencies and modules:  express, mongoose, ejs, cors, jsonwebtoken, bcryptjs, node-fetch
- Linguagem: JavaScript
- Banco de Dados MongoDB (não precisa instalar banco de dados local se for instalar uma versão local desse app, ele está na nuvem em um cluster).
- Arquitetura: MVC

* Para rodar a aplicação acesse o diretório "sample_node_project02" e rode os seguintes comandos:

1 - npm i ejs
2 - npm i express
3 - npm i node-fetch
4 - npm i mongoose
5 - npm i cors
6 - npm i jsonwebtoken
7 - npm i bcryptjs

Para mais detalhes acerca do modulos e dependencias do projeto, favor acessar:
package-lock.json
package.json
no diretótio principal

Nota: O ambiente deve estar configurado para rodar projetos Node.js

O ponto de entrada da aplicação é "app.js", você encontra este arquivo no diretório "src".

Só precisa rodar o comando: node app ou nodemon app
A aplicação poderá ser acessada em: http://localhost:5000/ 

To do list:

* Iterface responsiva. OBS: (se quiser ter uma noção de minhas habilidades em páginas responsivas, favor visitar: https://kesso.uk/search (meu atual projeto)).
* Test unitários utilizando JEST.
* Melhorar performance das requisições, evitar requisições desnecessárias de conteúdo.

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
