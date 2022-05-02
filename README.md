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
- Nodemailer para receber token de redefinição de senha no e-mail
- Multer para upload de imagens
- AWS-S3 para cadastrar imagens dos produtos

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
![tela-login](https://user-images.githubusercontent.com/101877534/166282468-67367aca-0bb5-4371-b410-20ccbddbf750.png)

### Cadastro da Aplicação
![tela-register](https://user-images.githubusercontent.com/101877534/166283100-a039b3c8-0783-48c7-8d2e-f27c0fc29b01.png)

### Primeiro passo para redefinir senha
![screen-forgot-password](https://user-images.githubusercontent.com/101877534/166283668-a6f91ed1-8c2c-4f5e-8e6f-d57674497a6e.png)

### Ultimo passo para redefinir senha
![screen-reset-password](https://user-images.githubusercontent.com/101877534/166285024-ab7b75b5-0f15-4bb6-9ffb-359dfb11c307.png)

### Home page
![home-page](https://user-images.githubusercontent.com/101877534/166285978-d01ff3d2-bea6-4547-b526-572904f4b9d4.png)

### Modal de visualização de pedidos
![modal-order](https://user-images.githubusercontent.com/101877534/166286377-5f9d0074-d399-414f-929b-bf4131054501.png)

### Página de Categorias cadastradas
![screen-categories](https://user-images.githubusercontent.com/101877534/166286836-26ce825f-c507-49b9-838f-53b7861c9e96.png)

### Modal para cadastrar nova categoria
![modal-register-category](https://user-images.githubusercontent.com/101877534/166287586-38eb0eca-4b6e-470a-bc2e-338131d92910.png)

### Página de Produtos cadastrados
![screen-products](https://user-images.githubusercontent.com/101877534/166287965-ad9aa2c2-3a5e-4be0-a2e4-b95799159ef4.png)

### Modal para cadastrar novo produto
![modal-register-product](https://user-images.githubusercontent.com/101877534/166288479-3b8c1f78-c88a-47ca-a0a0-0e9e3de08776.png)

## Interface Mobile

### Inicialização
![Screenshot_20220429-180008_Expo Go](https://user-images.githubusercontent.com/101877534/166270277-68090809-d730-4e51-88de-c458a0a4c152.jpg)

### Tela para criar novo pedido para uma mesa
![Screenshot_20220429-180047_Expo Go](https://user-images.githubusercontent.com/101877534/166270378-cfe9ddba-4183-4f2e-bd41-10f18df7d14f.jpg)

### Tela para inserir novos items na mesa
![Screenshot_20220429-180107_Expo Go](https://user-images.githubusercontent.com/101877534/166270542-3a0dca1f-3ad1-453f-84d0-7ab9a1916204.jpg)

### Tela para concluir pedido
![Screenshot_20220429-180155_Expo Go](https://user-images.githubusercontent.com/101877534/166270757-68442147-6542-446f-ad5d-5e758f4ad5da.jpg)
