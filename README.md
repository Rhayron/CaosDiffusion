# CaosDiffusion

O projeto  consiste de um script, em linguagem JavaScript, que aleatoriza um prompt para geração de imagens por inteligência artificial, a partir de uma lista de prompts pré-definida, gera uma arte visual a partir deste prompt e cria uma postagem no Twitter com a arte gerada, por meio de utilização da API do Twitter. O script é executado diariamente, com horário definido pelo usuário, e pode ser monitorado por meio de uma contagem regressiva.

## Antes de executar

### ⚠ IMPORTANTE ⚠
Renomear o arquivo "*keysTEMPLATE.js*" para "*keys.js*" e inserir as chaves/tokens da conta do Twitter (necessário conta de desenvolvedor). O arquivo "*keys.js*" está incluido no *.gitignore* e não é monitorado pelo repositório, por questões de segurança.

Caso isso não seja feito, o código resultará em erro pela falta do arquivo "*keys.js*".

## Comandos para execução

* Instalar dependências:
```
npm install
```

* Executar o back-end separadamente:
```
npm run start:back
```

* Executar o front-end separadamente:
```
npm run start:front
```

* Executar ambos:
```
npm start
```
