# Project Stranger Things 🚀

## PROJETO DESENVOLVIDO DURANTE O CURSO DA TRYBE!!

## Para instalar as dependências do projeto:
  `npm install`;


# Habilidades

Nesse projeto, você será capaz de:
  - Publicar aplicações através do `Heroku`;
  - Visualizar logs das suas aplicações publicadas;
  - Monitorar suas aplicações publicadas;
  - Utilizar variáveis de ambiente dentro do `Heroku`;
  - Instalar, utilizar e aproveitar os principais recursos do `PM2`;
  - Fazer deploy no `Heroku` aproveitando recursos de um process manager.


## O que deverá ser desenvolvido

Você vai adaptar e configurar os projetos descritos nesse README para que seja feito o deploy deles. Você vai colocar os projetos frontend e backend no ar com o `Heroku`, utilizando o `PM2` para gerenciar e monitorar os processos. Além disso, você vai alterar alguns comportamentos aplicando os conceitos vistos no conteúdo.

## Desenvolvimento

Adapte e configure os projetos descritos nesse *README* para que seja feito o deploy por meio do `Heroku` e monitorado pelo gerenciador do `PM2`.


# Requisitos do projeto

### Backend

#### 1 - Verifica as variáveis de ambiente

Altere o backend para utilizar variáveis de ambiente para contrololar os seguintes comportamentos:

   1. A porta que a API escutará, essa variável deve ter, nescessariamente, o nome PORT e o seu valor deve ser 3000.

   2. O modo "upsideDown". Essa variável espera um valor boleano e deverá se chamar UPSIDEDOWN_MODE. Lembre-se que as variáveis de ambiente são `strings`.

   O que será testado:
   - Se existe a variável de ambiente PORT.
   - Se a variável de ambiente UPSIDEDOWN_MODE existe e se ela é um boleano.

**Importante**: Para esse projeto, as variáveis de ambiente devem ser definidas em um arquivo .env e o arquivo deve ser enviando no seu PR(Pull Request). ISSO NÃO É UMA PRÁTICA DE MERCADO, o arquivo .env deve ser sempre incluido do .gitignore pois contém informações sensíveis, aqui será enviado apenas por motivo de avaliação.

#### 2 - Verifica se o módulo pm2 foi instalado no projeto

Adicione o módulo PM2 à API.

O que será testado:
 - Se o módulo `pm2` esta instalado nas dependências.

#### 3 - Verifica a configuração do ecosystem.config.yml

Adicione o [arquivo](https://app.betrybe.com/course/back-end/deployment/deploy-gerenciadores-de-processos/915a6dce-162b-4015-b499-31ecae9e9411/conteudo/a3b991be-5a2d-4a82-9a38-d96eab5534b5/ecosystem-file/90d1dda4-555a-4cc3-9757-22d72836e230?use_case=side_bar) `ecosystem.config.yml`. O arquivo deverá realizar as seguintes configurações:

  1. Ativar o Modo Cluster;

  2. Subir duas instâncias do processo;

  3. Não assistir à alterações no diretório (modo`watch` desativado);

  4. Reiniciar o processo caso ele consuma mais de 200MB de memória.

  **importante**: O arquivo `ecosystem` deve ter a extensão yml e não yaml.

  O que será testado:
  - Se o ecosystem tem a propriedade name
  - Se o script a ser executado é o index.js.
  - Se o modo de execução está configurado para cluster.
  - Se o numero de instancias está definido como 2.
  - Se o modo watch esta configurado para estar desativado.
  - Se a reiniciação de memória máxima esta configurada como 200M. [Documentação do pm2](https://pm2.keymetrics.io/docs/usage/memory-limit)

#### 4 - Verifica se os scripts do package.json estão corretos

Adicione/altere dois `scripts` no `package.json`:

  1. `start`: Deverá iniciar o server utilizando o módulo do `PM2` e apontando para o arquivo `ecosystem` criado;

  2. `start:dev`: Deverá iniciar o server utilizando o módulo do `PM2`, **sem** apontar para o arquivo `ecosystem` e com o parâmetro para "observar alterações no diretório" **ativado**.

Execute ambos em sua máquina para validar se o comportamento é o esperado.

O que será testado:
  - Se o comando `start` inicia o server com pm2 e se usa o ecosystem.
  - Se o comando `start:dev` inicia o server com pm2, se não usa o ecosystem e abre em watchMode.

#### 5 - Verifica a configuração do arquivo Procfile

Defina um [arquivo](https://app.betrybe.com/course/back-end/deployment/infraestrutura-deploy-com-heroku/30597149-145b-49a1-924c-bd8050a8f249/conteudo/dcb89fc5-1093-458d-9b2f-fbac0b18f9bc/introducao-ao-heroku/8e3bf957-decc-40b9-a854-eb406ede0ca9?use_case=side_bar) `Procfile`, utilizando a mesma configuração do script `start` do `package.json`: iniciar o server utilizando o módulo do `PM2`, apontando para o arquivo `ecosystem` criado anteriormente.

Lembre-se: como nossos serviços receberão acessos HTTP externos, precisamos definir os `Dynos` como sendo do tipo `web`.

O que será testado:
- Se o dyno é do tipo web.
- Se o script inicia o server com pm2 e se usa o ecosystem.

#### 6 - Verifica o Deploy no Heroku

**IMPORTANTE**: Uma variável de ambiente com o nome GITHUB_USER deverá ser criada com o seu usuário do github.

**IMPORTANTE**: O heroku limita o tamanho do nome de uma aplicação para ter no máximo **30 caracteres**, se o seu usuário do GitHub possuir mais que 27 caracteres você não conseguirá criar uma aplicação com o nome no padrão solicitado pelo requisito. Caso esteja nessa condição, avise nosso time de instrução que iremos ajudá-lo.

1. Crie dois `apps` do Heroku a partir do mesmo código fonte (código da API). O nome do seu app no heroku deverá conter seu nome de usuário no github seguido de "-bk" ou "-bd". Por exemplo, se seu nome de usuário no github for "student" seus app deverão ter o nome "sudent-bk" e "student-bd" e as urls abaixo:

   - https://student-bk.herokuapp.com/ -para o app hawkins

   - https://student-bd.herokuapp.com/ -para o app upside-down

2. Configure a variável de ambiente criada para controlar o modo `upsideDown`. Cada um dos `apps` deverá ter valores distintos, da seguinte maneira:

   - O app `hawkins` deverá ter o valor `false`;

   - O app `upside-down` deverá ter o valor `true`.

3. Utilizando o `git`, faça o deploy de ambos os `apps` no Heroku.

Acesse os URLs geradas e valide se ambas as API's estão no ar e funcionando como esperado.
**Importante**: As URLS deverão ser geradas pelo heroku e não devem ser modificadas.

O que será testado:
  - Se ao fazer uma requisição do tipo GET para o endpoint da api Hawkins serão retornadas as informações corretas.
  - Se ao fazer uma requisição do tipo GET para o endpoint da api upsideDown serão retornadas as informações corretas.

### Frontend

#### 7 - Verifica as variáveis de ambiente do frontend

Altere o frontend para utilizar variáveis de ambiente para controlar as **URLs** e **Timeouts** de comunicação com a API.

Perceba que o código está esperando por duas **APIs**. Uma para o modo `upside-down` e a outra para o modo normal.

O nome das variáveis deve ser o seguinte:

- Para seu back-end hawkins:
  - REACT_APP_HAWKINS_URL para a URL;
  - REACT_APP_HAWKINS_TIMEOUT para o timeout;

- Para seu back-end UPSIDEDOWN:
  - REACT_APP_UPSIDEDOWN_URL para a URL;
  - REACT_APP_UPSIDEDOWN_TIMEOUT para o timeout;

O que será testado:
- Se existem as 4 variáveis de ambiente citadas acima.

**Importante**: Para esse projeto, as variáveis de ambiente devem ser definidas em um arquivo .env e o arquivo deve ser enviando no seu PR(Pull Request). ISSO NÃO É UMA PRÁTICA DE MERCADO, o arquivo .env deve ser sempre incluido do .gitignore pois contém informações sensíveis, aqui será enviado apenas por motivo de avaliação.

#### 8 - Verifica se foi feito o deploy do frontend no Heroku

**IMPORTANTE**: Assim como no backend, a variável de ambiente GITHUB_USER

deverá ser criada com o seu usuário do github.

Faça o deploy do front-end:

   1. Crie um app do Heroku com o front-end. Não é necessário a criação do `Procfile` aqui. Vamos deixar o Heroku utilizar as configurações padrões. No momento de criar o app do Heroku, utilize o `buildpack` descrito abaixo, em **Dicas**.

   2. O nome do seu app no heroku deve ser seu nome de usuário do github seguido de "-ft". Por exemplo, se o seu usuário do github for "student", o nome do seu app será "student-ft" e a url ***precisar ser*** https://student-ft.herokuapp.com/.

   2. Configure as variáveis de ambiente do app para apontar para as API's publicadas.

   3. Faça o deploy com o git.

**Dicas**:

Para publicar seu frontend React, utilize o buildpack [mars/create-react-app](https://elements.heroku.com/buildpacks/mars/create-react-app-buildpack).

Lembre-se de que é possível testar o comportamento definindo as variáveis de ambiente em sua máquina. Você pode fazê-las apontar tanto para o backend rodando localmente em sua máquina, quanto para as APIs já publicadas nos requisitos anteriores.

O que será testado:
  - Se ao visitar sua pagina no heroku, o botão de mudar de realidade existe.
  - Se a pesquisa funciona como deveria, fazendo chamada a API externa.
  - Se o botão de mudar de realidade funciona.
  - Se os botões de proxima pagina e pagina anterior funcionam.  

### Bônus

#### 9 - Verifica os multi-ambientes e modo de desenvolvimento.

Utilize a estratégia de multi-ambientes no frontend. Para isso:

   - Renomeie o *remote* atual para `development`;

   - Refaça o deploy com um item no frontend que identifique o layout como rodando em modo de "desenvolvimento". Esse tag item **deve** conter o texto "Em desenvolvimento"

   - Crie um novo app no heroku cujo nome deve ser seu nome de usuário do github seguido de "-pd". Por exemplo, se o seu usuário do github for "student", o nome do seu app será "student-pd" e a url ***precisar ser*** https://student-pd.herokuapp.com/.

   - Lembre-se que a boa prática para essa situação é criar uma variável de ambiente para controlar esse comportamento, configurando-a para ter um valor diferente em cada um dos ambientes.

O que será testado:
 - Se ao acessar o frontend de desenvolvimento, haverá a tag com o texto "Em desenvolvimento"
 - Se ao acessar o frontend de produção, não haverá a tag.

