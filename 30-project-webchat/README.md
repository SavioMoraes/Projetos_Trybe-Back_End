# Project WebChat 🚀

## PROJETO DESENVOLVIDO DURANTE O CURSO DA TRYBE!!

# Habilidades

- Conseguir desenvolver um server socket usando o socket.io;

- Emitir eventos personalizados usando o socket.io;

- Usar o pacote `socket.io` do Node.js para criar aplicações que trafeguem mensagens através de sockets.

---

# Entregáveis

---

## O que deverá ser desenvolvido
Neste projeto você vai desenvolver um _chat_ online e ao utilizar essa aplicação um usuário deverá ser capaz de:

 - Usar um front-end para enviar mensagens a clientes conectados;
 - Visualizar o histórico de mensagens da conversa;
 - Visualizar os usuários online no momento;
 - Alterar o nome de usuário no chat em tempo real;


## Desenvolvimento

Deverá ser desenvolvida uma aplicação `Node.js` de _chat_, usando `socket.io` para emitir eventos e atualizar estado no servidor e cliente.

Através do cliente será possível enviar e receber mensagens, trocar seu nome, ver usuários online.

O MVC será usado para renderizar as mensagens do histórico e usuários online, com ambos vindo direto do servidor.


## Variáveis

Haverá um arquivo no caminho: `sd-012-project-webchat/models/connection.js` que fará a conexão com o Banco de Dados. Neste arquivo, na linha 9, haverá o seguinte comando:

`.connect(process.env.DB_URL, {`

e na linha 13:

`.then((conn) => conn.db(process.env.DB_NAME))`

**Você irá precisar configurar as variáveis globais do MongoDB.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/) como referência.

** ⚠️ Neste projeto é obrigatório deixar o nome do database como `webchat` **

## Conexão com o banco:
As variáveis de ambiente receberão os seguintes valores

```
DB_URL=mongodb://localhost:27017/webchat/    // conexão local com o seu MongoDB
DB_NAME=webchat                             // nome do database
```


# Requisitos do projeto

## Lista de Requisitos

### 1 - Crie um back-end para conexão simultânea de clientes e troca de mensagens em chat público.

#### ⚠️ &nbsp; DICA: Para desenvolver esse requisito não é necessário se conectar ao banco de dados.

- Sua aplicação deve ser inicializada no arquivo `server.js`;

- Seu back-end deve permitir que vários clientes se conectem simultaneamente;

- Seu back-end deve permitir que cada cliente mande mensagens para todas os outros clientes online de forma simultânea;

- Toda mensagem que um cliente recebe deve conter as informações acerca de quem a enviou: _nickname_ (apelido), data-hora do envio e o conteúdo da mensagem em si.

 - O evento da mensagem deve ter o nome `message` e deve enviar como parâmetro o objeto `{ chatMessage, nickname }`. O `chatMessage` deve ser a mensagem enviada enquanto o `nickname` deverá ser o apelido de quem a enviou;

 - A data na mensagem deve seguir o padrão 'dd-mm-yyyy' e o horário deve seguir o padrão 'hh:mm:ss' sendo os segundos opcionais;

 - O formato da mensagem deve seguir esse padrão:

`DD-MM-yyyy HH:mm:ss ${nickname} ${chatMessage}`

- Exemplo prático:

`09-10-2020 2:35:09 PM - Joel: Olá meu caros amigos!`

- O back-end deve enviar a mensagem ao front-end **já formatada**, ela deve ser uma `string`, como no exemplo acima;

- Tanto o evento enviado do cliente para o servidor, como do servidor para o cliente deve ser **message**.


#### As seguintes verificações serão feitas:
```
- Será validado que todos os clientes que estão conectados ao chat recebem as mensagens enviadas;

- Será validado que toda mensagem que um cliente recebe contém as informações acerca de quem a enviou, data-hora do envio e o conteúdo da mensagem em si.
```
---

### 2 - Crie um frontend para que as pessoas interajam com o chat.

#### ⚠️ &nbsp; DICA: Para desenvolver esse requisito não é necessário se conectar ao banco de dados.

#### ⚠️ &nbsp; DICA: Para facilitar armazenar e/ou recuperar o _nickname_ do cliente, lembre-se de usar o _sessionStorage_.

- O front-end e o back-end têm que usar a mesma porta - `localhost:3000`;

- O front-end deve gerar um um _nickname_ **aleatório de 16 caracteres** quando um novo cliente se conecta, para identificar quem está enviando a mensagem.
  - O elemento com o nome do cliente deve conter o `data-testid="online-user"`.

- O front-end deve ter uma caixa de texto através da qual seja possível enviar mensagens para o _chat_:
  - A caixa de texto deve conter o `data-testid="message-box"`;
  - O botão de enviar mensagem deve conter o `data-testid="send-button"`.

- As mensagens devem ser renderizadas na tela;
  - Cada mensagem deve conter o `data-testid="message"`.

- O front-end deve exibir todas as mensagens já enviadas no _chat_, ordenadas verticalmente da mais antiga para a mais nova _(as mensagens mais recentes devem aparecer abaixo das mensagens mais antigas)_;

- O front-end deve permitir a quem usa escolher um apelido (_nickname_) para si. Para que a pessoa usuária consiga escolher um apelido, o front-end deve ter um campo de texto e um botão. O campo de texto será onde a pessoa digitará o _nickname_ que deseja. Após escolher o _nickname_, o cliente deverá clicar no botão para que o dado seja salvo:
  - O campo onde o _nickname_ será inserido deve conter o `data-testid="nickname-box"`;
  - O botão que será clicado para salvar o _nickname_ deve conter `data-testid="nickname-button"`;
  - Ao salvar o _nickname_ ele deve ser atualizado para todos os clientes conectados.


#### As seguintes verificações serão feitas:
```
- Será validado que um _nickname_ aleatório é gerado quando o cliente se conecta;

- Será validado que o front-end tem uma caixa de texto para preencher e um botão para enviar mensagens;

- Será validado que as mensagens enviadas possuem o _data-test-id_ correto;

- Será validado que as mensagens são exibidas na ordem correta;

- Será validado que o front-end tem um campo de texto para preencher e um botão para alterar o apelido _(nickname)_;

- Será validado que é possível enviar mensagens após alterar o _nickname_.
```
---

### 3 - Elabore o histórico do chat para que as mensagens persistam.

#### ⚠️ &nbsp; DICA: Para desenvolver esse requisito é estritamente necessário se conectar ao banco de dados.

#### ⚠️ &nbsp; DICA: Uma boa forma de renderizar o histórico de mensagens via HTML é usando uma template engine _(exemplo: EJS)_.

#### ⚠️ &nbsp; DICA: Lembre-se de aplicar a arquitetura MVC.

- Você deve configurar o banco de dados `webchat` com uma coleção chamada `messages`, em que cada documento representa uma mensagem;

- O seu banco de dados deve salvar o _nickname_ de quem enviou a mensagem, a mensagem em si e uma _timestamp_ com precisão de segundos de quando ela foi salva no banco;

  - Exemplo de um documento:
      ```js
      {
        message: 'Lorem ipsum',
        nickname: 'xablau',
        timestamp: '2021-04-01 12:00:00'
      }
      ```

- Envie o histórico de mensagens salvo no banco via `html` quando um novo cliente se conectar.

#### As seguintes verificações serão feitas:
```
- Será validado que todo o histórico de mensagens irá aparecer quando o cliente se conectar;

- Será validado que ao enviar uma mensagem e recarregar a página, a mensagem persistirá;

- Será validado que ao alterar o _nickname_ e enviar uma mensagem, a mensagem persistirá;
```
---

### 4 - Informe a todos os clientes quem está online no momento.

#### ⚠️ &nbsp; DICA: Para desenvolver esse requisito não é necessário se conectar ao banco de dados.

- No front-end deve haver uma lista na tela de cada cliente que mostra quais clientes estão _online_ em um dado momento. Um cliente é identificado pelo seu _nickname_.
  - O elemento com o nome do cliente deve conter o `data-testid="online-user"`;
  - Quando um cliente se conecta, a lista de clientes deve ser atualizada para todos:
      - Para o cliente que acabou de se conectar, seu nickname deve ser colocado no começo da lista;
      - Para os demais clientes, o nickname do cliente que acabou de se conectar deve ser colocado no final da lista.
  - A lista de clientes _online_ deve ser renderizada no `html` ao carregar a página;
  - Quando um cliente atualiza seu _nickname_ a lista de clientes deve ser atualizada para todos da mesma forma.


#### As seguintes verificações serão feitas:
```
- Será validado que quando um cliente se conecta, seu _nickname_ aparece no front-end de todos;

- Será validado que quando um cliente se desconecta, seu _nickname_ desaparece do front-end dos outros clientes;

- Será validado que quando um cliente atualiza seu _nickname_, o nickname é atualizado no front-end de todos os clientes;

- Será validado que os _nicknames_ são mostrados na ordem correta.
```

---

## Dicas

:star: Tomar decisões de projeto em prol do bom desenvolvimento faz parte do projeto! Interprete os requisitos, tome suas decisões e, em caso de dúvidas, valide-as conosco no _Slack_!

