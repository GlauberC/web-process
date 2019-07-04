# Sobre
Esse é um projeto de iniciação cientifica desenvolvido por Glauber Carvalho sob a orientação de Carlos Alberto Olarte Vega. Esse sistema tem como objetivo realizar simulações de processos concorrentes a partir da criação de uma árvore de decisões, o qual o usuário poderá decidir qual processo ele deseja executar. Essa ferramenta foi desenvolvida utilizando a linguagem de programação Maude e, para o backend, foi usado o NodeJS.

# Requisitos
Para que o programa rode é necessário realizar o download e a instalação dos sistemas abaixo:
* [Maude](http://maude.cs.illinois.edu)
* [Node.JS](https://nodejs.org)

# Configuração
* O programa está dividido entre backend e frontend. Antes de começar leia as instruções abaixo para a configuração de cada ambiente. 

## Backend
* Inicialmente é necessário fazer o download de todos os módulos do node necessários para o projeto, para isso navegue na pasta do backend e execute, no terminal, o comando:

```sh
$ sudo npm install
```

* Após a instalação, basta ativar o servidor node através do comando:
```sh
$ npm start
```

* Além disso, é necessário ativar o servidor Maude, para isso basta ir até o diretório backend/maude e executar o Maude em outra janela do terminal com o comando: 
```sh
$ maude server.maude
```
Em seguida executar os comandos: 
```sh
Maude> set print attribute on .
Maude> erew init .
```


## Frontend
* Inicialmente é necessário fazer o download de todos os módulos do react necessários para o projeto, para isso navegue na pasta do frontend e execute, no terminal(em outra janela), o comando:

```sh
$ sudo npm install
```

* Logo em seguida digite, no terminal, o comando:

```sh
$ npm start
```
