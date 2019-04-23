# Sobre
Esse é um projeto de iniciação cientifica desenvolvido por Glauber Carvalho sob a orientação de Carlos Alberto Olarte Vega. Esse sistema tem como objetivo realizar simulações de processos concorrentes a partir da criação de uma árvore de decisões, o qual o usuário poderá decidir qual processo ele deseja executar. Essa ferramenta foi desenvolvida utilizando a linguagem de programação Maude e, para o backend, foi usado o NodeJS.

# Requisitos
Para que o programa rode é necessário realizar o download e a instalação dos sistemas abaixo:
* [Maude](http://maude.cs.illinois.edu)
* [Node.JS](https://nodejs.org)

# Configuração
* Inicialmente é necessário fazer o download de todos os módulos do node necessários para o projeto, para isso basta executar, no terminal, o comando:

```sh
$ sudo npm install
```

Em seguida é necessário configurar as variáveis do Maude. Basta criar o arquivo .env e informar a porta e qual os caminhos para o sistema maude e para o arquivo predule.maude.

```sh
PORT = 3000
MAUDE_DIR = /usr/bin/maude
MAUDE_LIB = /usr/share/maude
```

# Executando o programa
Para iniciar o programa é necessário ir até o diretório do projeto e executar, no terminal, o comando: 
```sh
$ npm start
```
