# dfcom-api

## Dependencias para rodar a api

### ENV rodando no Atlas
.env {
  NODE_ENV=development
  
  SERVER_PORT=3333

  DB_HOST=sextafeira.atpeu.mongodb.net
  DB_PORT=27017
  DB_NAME=dfcom-teste
  DB_USER=dfcom-teste
  DB_PASS=dfcom-teste

  SECRET=khjbafkdhlgfwekygfhi3472tyr924g724924gf
}

### ENV rodando a database no Docker

.env {
  NODE_ENV=development
  
  SERVER_PORT=3333

  DB_HOST=127.0.0.1
  DB_PORT=27017
  DB_NAME=dfcom-teste
  DB_USER=dfcom-teste
  DB_PASS=dfcom-teste

  SECRET=khjbafkdhlgfwekygfhi3472tyr924g724924gf
}

## Rodando o código

### Yarn dev

Estando com o .env correto, apenas digite no terminal de sua escolha o comando "yarn dev"

## Docker-compose para database

### Para rodar a database com docker-compose

Estando com o docker-compose na sua máquina:

Na pasta raiz onde o docker-compose.yml arquivo está execute o comando: docker-compose up -d db
