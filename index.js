
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Inicializa o Express
const app = express();

// Configuração do caminho da aplicação
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura o EJS como mecanismo de visualização
app.set('view engine', 'ejs');

// Informa onde estão os arquivos EJS
app.set('views', path.join(__dirname, 'views'));

// Array com os dados dos times
const times = [
    {
        id: 1,
        nome: 'Grêmio',
        estadio: 'Arena do Grêmio',
        cidade: 'Porto Alegre'
    },
    {
        id: 2,
        nome: 'Internacional',
        estadio: 'Estádio Beira-Rio',
        cidade: 'Porto Alegre'
    },
    {
        id: 3,
        nome: 'Palmeiras',
        estadio: 'Estádio Palestra Itália',
        cidade: 'São Paulo'
    },
    {
        id: 4,
        nome: 'Flamengo',
        estadio: 'Estádio Maracanã',
        cidade: 'Rio de Janeiro'
    }
];

// Rota principal
app.get('/', (req, res) => {
    res.render('index', {
        mensagem: 'Bem-vindo ao Catálogo de Times!'
    });
});

// Rota para exibir todos os times
app.get('/times', (req, res) => {
    res.render('times', {
        times: times
    });
});

// Rota para exibir os detalhes de um time
app.get('/times/:id', (req, res) => {

    // Recebe o ID enviado pela URL
    const id = Number(req.params.id);

    // Procura o time correspondente ao ID
    const time = times.find(time => time.id === id);

    // Verifica se o time foi encontrado
    if (!time) {
        return res.status(404).send('Time não encontrado!');
    }

    // Envia os dados para a página de detalhes
    res.render('detalhe', {
        time: time
    });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor funcionando em http://localhost:3000');
});