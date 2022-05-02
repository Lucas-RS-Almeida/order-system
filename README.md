# ORDER SYSTEM

Este projeto foi criado com o intuito de aprofundar os conhecimentos em nodeJS, React js e React-native. Consiste em um sistema no qual os restaurantes utilizam para agilizar o sistema de pedidos, os garçons usam o aplicativo mobile para realizar os pedidos e a cozinha usa o sistema web para receber os pedidos em tempo real. Tendo o seguinte funcionamento: 

- O restaurante se cadastra na plataforma web
- Após concluir o cadastro o restaurante pode entrar normalmente na plataforma 
- Em seguida, a mesma pode incluir novas categorias e novos produtos para o seu menu 
- Por fim, o garçon entra no aplicativo mobile com a conta do estabelecimento e realiza os pedidos de acordo com o menu cadastrado por cada restaurante.

## Tecnologias usadas:
- Banco de dados Postegres 
- http requests com Axios
- Prisma para o acesso ao banco de dados no servidor
- Socket.io para notificações do pedido em tempo real

## Scripts
*Ao entrar nos respectivos diretorios usando o terminal como administrador, rode:

- Backend:
### `yarn start` ou `npm start`
OBS - ao isntalar todas as dependencias rodando o script, será necessário a porta 8080 está liberada e incluir a url dp seu frontend dentro do diretorio:
### api/src/server.ts

- Frontend: 
### `yarn start` ou `npm start`
OBS - ao isntalar todas as dependencias rodando o script, será necessário incluir um arquivo .env com a viriavel REACT_APP_BASE_URL com a url para o seu backend dentro do diretorio raiz.

- Mobile:
### `expo start`
OBS: ao instalar todas as dependencias rodando o script, será necessário alterar o endereço do servidor dentro dos diretorios:
#### mobile/src/services/api.js
altere o valor da baseURL para o ip da sua maquina, assim o app poderá fazer as requisições à api rest do backend.
### mobile/src/contexts/AuthContext.js
altere o valor da url de conexão do socket.io

## Interface Web

### Login da Aplicação
![Captura de tela de 2022-04-27 14-08-08](https://user-images.githubusercontent.com/101877534/166269044-e087b2fc-34f2-4814-b58e-9d8841b4a320.png)

### Cadastro da Aplicação
![Captura de tela de 2022-04-29 17-57-03](https://user-images.githubusercontent.com/101877534/166269236-1810e64a-d1af-4655-b292-8e1f74c9cb9b.png)

### Home page
![Captura de tela de 2022-04-29 17-58-54](https://user-images.githubusercontent.com/101877534/166269316-eff98d97-7cfb-4aa0-9861-500963698db7.png)

### Modal de visualização de pedidos
![Captura de tela de 2022-04-29 17-58-58](https://user-images.githubusercontent.com/101877534/166269427-cf67ac5c-f843-4039-aacf-a40d9b8aebc7.png)

### Página de Categorias cadastradas
![Captura de tela de 2022-04-29 17-59-04](https://user-images.githubusercontent.com/101877534/166269558-fb11c010-4798-42d6-a251-737afdf4a113.png)

### Modal para cadastrar nova categoria
![Captura de tela de 2022-04-29 17-59-22](https://user-images.githubusercontent.com/101877534/166269613-ec0dbdd3-ac6c-495d-aa91-079d50ce8431.png)

### Página de Produtos cadastrados
![Captura de tela de 2022-04-29 17-59-10](https://user-images.githubusercontent.com/101877534/166269695-bcc18ddf-f52b-4729-b301-9f3c60024049.png)

### Modal para cadastrar novo produto
![Captura de tela de 2022-04-29 17-59-15](https://user-images.githubusercontent.com/101877534/166269736-f6659cc1-1a01-443e-b8a8-6886c706e5af.png)

## Interface Mobile

### Inicialização
![Screenshot_20220429-180008_Expo Go](https://user-images.githubusercontent.com/101877534/166270277-68090809-d730-4e51-88de-c458a0a4c152.jpg)

### Tela para criar novo pedido para uma mesa
![Screenshot_20220429-180047_Expo Go](https://user-images.githubusercontent.com/101877534/166270378-cfe9ddba-4183-4f2e-bd41-10f18df7d14f.jpg)

### Tela para inserir novos items na mesa
![Screenshot_20220429-180107_Expo Go](https://user-images.githubusercontent.com/101877534/166270542-3a0dca1f-3ad1-453f-84d0-7ab9a1916204.jpg)

### Tela para concluir pedido
![Screenshot_20220429-180155_Expo Go](https://user-images.githubusercontent.com/101877534/166270757-68442147-6542-446f-ad5d-5e758f4ad5da.jpg)
