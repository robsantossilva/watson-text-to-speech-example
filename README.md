#### Instruções para iniciar o projeto

##### Pré Requisitos

- Ter instalado Docker e Docker Compose

##### Passo a Passo

1. Em um local de sua preferência faça o clone do repositório: 
``` bash
git clone https://github.com/robsantossilva/watson-text-to-speech-example.git
```

2. Existem dois arquivos que são importantes para a inicialização dos containers, e se faz necessário dar permissão a eles:
``` bash
cd watson-text-to-speech-example
sudo chmod 777 backend/.docker/entrypoint.sh
sudo chmod 777 frontend/.docker/entrypoint.sh
```

3. Configure, se desejar, a API_KEY e URL do serviço <strong>Text to Speech.</strong>
```bash
/backend/.env
API_KEY_TEXT_TO_SPEECH = {API_KEY}
URL_TEXT_TO_SPEECH = {URL}
``` 

4. Execute o comando do Docker Compose:
``` bash
sudo docker-compose up
```

Pronto, só aguardar. Isso pode demorar um pouquinho :D principalmente na inicialização do container do Reacj.JS

Após ter finalizado, use a URL abaixo para acessar a aplicação.
Frontend da Aplicação: http://localhost:3000

