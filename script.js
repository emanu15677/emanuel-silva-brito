const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const textoResultado = document.querySelector(".texto-resultado");
const indicadorProgresso = document.querySelector(".indicador-progresso");
const botaoReiniciar = document.querySelector(".botao-reiniciar");
const botaoVoltar = document.querySelector(".botao-voltar");
const estadoQuiz = document.querySelector(".estado-quiz");

const perguntas = [
    {
        enunciado: "Ao sair da escola, você conhece uma inteligência artificial que responde perguntas e cria imagens e áudios. Qual é sua primeira reação?",
        alternativas: [
            {
                texto: "Fico curioso, mas quero entender melhor como ela funciona e quais são seus limites."
            },
            {
                texto: "Fico animado com as novas possibilidades que essa tecnologia pode oferecer."
            }
        ]
    },
    {
        enunciado: "Em uma aula sobre IA, a professora pede um trabalho sobre o uso da tecnologia na escola. Como você começa a pesquisa?",
        alternativas: [
            {
                texto: "Uso uma ferramenta de IA para encontrar ideias e fontes, confiro as informações e escrevo o trabalho com minhas palavras."
            },
            {
                texto: "Pesquiso em livros e sites confiáveis, converso com colegas e organizo as ideias por conta própria."
            }
        ]
    },
    {
        enunciado: "Durante um debate sobre o futuro do trabalho, a turma conversa sobre os impactos da IA. Que ponto de vista você apresenta?",
        alternativas: [
            {
                texto: "A automação pode afetar empregos; precisamos preparar e apoiar as pessoas durante essas mudanças."
            },
            {
                texto: "A IA também pode criar novas funções e ajudar as pessoas a desenvolver outras habilidades."
            }
        ]
    },
    {
        enunciado: "Para uma atividade, você precisa criar uma imagem que represente sua opinião sobre a IA. O que escolhe?",
        alternativas: [
            {
                texto: "Faço a imagem em uma ferramenta de desenho ou design, criando cada parte manualmente."
            },
            {
                texto: "Uso um gerador de imagens com IA e ajusto o resultado para representar minha ideia."
            }
        ]
    },
    {
        enunciado: "O trabalho de biologia do seu grupo está atrasado, e uma pessoa usou IA para escrever um trecho que ficou igual à resposta gerada. Como você reage?",
        alternativas: [
            {
                texto: "Proponho conferir as informações, reescrever o trecho com nossas ideias e indicar o uso da ferramenta."
            },
            {
                texto: "Acho melhor entregar o trecho como está para ganhar tempo, já que a IA ajudou a produzi-lo."
            }
        ]
    },
];

let atual = 0; 
let perguntaAtual;
let aguardandoResposta = false;
let respostasSelecionadas = [];
let temporizadorTrava;

const finaisPorCaminho = {
    "00000": "Em 2049, sua cautela virou prática responsável: você usou a IA com verificação, defendeu quem poderia ser afetado e criou a imagem com as próprias mãos.",
    "00001": "Em 2049, você percebeu que a pressa do grupo podia enfraquecer a autoria; sua pesquisa apoiada por IA e sua preocupação social pediam mais revisão.",
    "00010": "Em 2049, você combinou pesquisa assistida, defesa dos trabalhadores e criação com IA; conferir e declarar o uso manteve a tecnologia sob seu controle.",
    "00011": "Em 2049, o contraste entre conferir fontes e entregar texto automático deixou uma lição: usar IA para criar não elimina a responsabilidade pelo trabalho.",
    "00100": "Em 2049, sua curiosidade se transformou em iniciativa: você pesquisou com IA, enxergou novas oportunidades e escolheu expressar sua ideia por meio do desenho manual.",
    "00101": "Em 2049, você viu potencial na IA e em novas profissões, mas a entrega sem revisão mostrou que inovação também precisa de autoria e transparência.",
    "00110": "Em 2049, você explorou a IA na pesquisa e na imagem, valorizou as oportunidades futuras e mostrou responsabilidade ao revisar o trabalho em grupo.",
    "00111": "Em 2049, sua abertura a novas tecnologias foi acompanhada por uma decisão apressada no grupo; essa experiência ensinou a separar experimentação de autoria.",
    "01000": "Em 2049, sua trajetória foi construída com pesquisa independente, atenção aos trabalhadores e criação manual; a IA foi um tema para avaliar, não um atalho.",
    "01001": "Em 2049, pesquisar por conta própria e criar manualmente fortaleceu sua autoria; entregar o texto automático no grupo revelou um ponto que você precisou rever.",
    "01010": "Em 2049, você reuniu fontes por conta própria, debateu oportunidades e usou IA para criar imagens, sempre tratando cada ferramenta como uma escolha consciente.",
    "01011": "Em 2049, sua pesquisa independente e seu interesse por novas ferramentas coexistiram com uma entrega sem revisão, que trouxe dúvidas sobre a autoria coletiva.",
    "01100": "Em 2049, você pesquisou sem depender de IA, defendeu proteção aos trabalhadores e experimentou gerar imagens, revisando com cuidado o texto do grupo.",
    "01101": "Em 2049, você manteve a pesquisa independente e experimentou gerar imagens; no trabalho coletivo, a pressa de entregar deixou a autoria em segundo plano.",
    "01110": "Em 2049, suas escolhas juntaram pesquisa independente, esperança em novas oportunidades e criação com IA, além de cuidado ao revisar o trabalho do grupo.",
    "01111": "Em 2049, você apostou em novas oportunidades e ferramentas, mas a entrega sem revisão mostrou que autonomia também exige responsabilidade sobre o texto final.",
    "10000": "Em 2049, seu entusiasmo virou exploração cuidadosa: você usou IA para pesquisar e criar, defendeu os trabalhadores e revisou o texto antes da entrega.",
    "10001": "Em 2049, você começou animado e usou IA como apoio, mas a cópia entregue pelo grupo mostrou por que entusiasmo precisa caminhar junto com revisão.",
    "10010": "Em 2049, você transformou curiosidade em experimentação: usou IA na pesquisa e na imagem, considerou os impactos no emprego e agiu com transparência.",
    "10011": "Em 2049, sua abertura à IA apareceu na pesquisa e na criação; entregar um texto sem revisão, porém, deixou a colaboração do grupo incompleta.",
    "10100": "Em 2049, você combinou entusiasmo com pesquisa assistida, valorizou novas oportunidades e preferiu criar a imagem manualmente, sem abrir mão de revisar o trabalho.",
    "10101": "Em 2049, você viu possibilidades na IA e nas novas profissões, mas a decisão de entregar o texto pronto mostrou o custo de priorizar a pressa.",
    "10110": "Em 2049, você apostou em novas oportunidades e experimentou IA para pesquisar e criar; ao revisar o texto do grupo, equilibrou inovação e cuidado.",
    "10111": "Em 2049, a IA esteve presente em quase todas as etapas; a entrega sem revisão foi o momento que mais colocou sua autoria à prova.",
    "11000": "Em 2049, você começou animado, pesquisou em fontes próprias, defendeu apoio aos trabalhadores e criou a imagem manualmente com atenção à autoria.",
    "11001": "Em 2049, sua pesquisa independente e sua preocupação social contrastaram com a entrega apressada do texto; essa escolha abriu espaço para repensar o processo.",
    "11010": "Em 2049, você equilibrou pesquisa independente com experimentação visual em IA, defendeu os trabalhadores e cuidou da integridade do trabalho em grupo.",
    "11011": "Em 2049, você explorou novas ferramentas e pesquisou por conta própria, mas entregar o texto gerado sem revisão deixou a colaboração com uma pendência.",
    "11100": "Em 2049, sua confiança nas possibilidades da IA veio acompanhada de escolhas cuidadosas: pesquisa independente, criação manual e revisão transparente do trabalho.",
    "11101": "Em 2049, você destacou oportunidades e pesquisou por conta própria; a entrega sem revisão mostrou que uma boa intenção não substitui a autoria do grupo.",
    "11110": "Em 2049, você enxergou oportunidades, experimentou IA para criar e pesquisar, e mostrou que inovação funciona melhor com verificação e transparência.",
    "11111": "Em 2049, você abraçou as possibilidades da IA em várias etapas; a experiência do trabalho copiado mostrou que o próximo passo é usá-la com mais revisão e autoria.",
};

function mostraPergunta(focar = false) {
    if(atual >= perguntas.length){
        indicadorProgresso.textContent = "Quiz concluído";
        mostraResultado();
        if (focar) caixaPerguntas.focus({ preventScroll: true });
        return;
    }
    indicadorProgresso.textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
    botaoVoltar.hidden = atual === 0;
    estadoQuiz.textContent = "";
    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    mostraAlternativas();
    if (focar) caixaPerguntas.focus({ preventScroll: true });
}

function mostraAlternativas(){
    for(const alternativa of perguntaAtual.alternativas){
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada){
    if (aguardandoResposta) return;
    aguardandoResposta = true;

    respostasSelecionadas.push(perguntaAtual.alternativas.indexOf(opcaoSelecionada));
    atual++;
    mostraPergunta(true);
    definirTrava(true);
    temporizadorTrava = setTimeout(() => definirTrava(false), 400);
}

function definirTrava(ativa) {
    aguardandoResposta = ativa;
    caixaAlternativas.querySelectorAll("button").forEach((botao) => {
        botao.disabled = ativa;
    });
    botaoVoltar.disabled = ativa;
    botaoReiniciar.disabled = ativa;
    estadoQuiz.textContent = ativa ? "Só um instante..." : "";
}

function voltarPergunta() {
    if (aguardandoResposta || atual === 0) return;

    respostasSelecionadas.pop();
    atual--;
    textoResultado.textContent = "";
    botaoReiniciar.hidden = true;
    botaoReiniciar.disabled = false;
    mostraPergunta(true);
}

function mostraResultado(){
    caixaPerguntas.textContent = "Em 2049...";
    botaoVoltar.hidden = false;
    const caminho = respostasSelecionadas.join("");
    textoResultado.textContent = finaisPorCaminho[caminho];
    caixaAlternativas.textContent = ""; 
    botaoReiniciar.hidden = false;
}

function reiniciarQuiz() {
    clearTimeout(temporizadorTrava);
    atual = 0;
    respostasSelecionadas = [];
    aguardandoResposta = false;
    textoResultado.textContent = "";
    botaoReiniciar.hidden = true;
    definirTrava(false);
    mostraPergunta();
}

botaoReiniciar.addEventListener("click", reiniciarQuiz);
botaoVoltar.addEventListener("click", voltarPergunta);

mostraPergunta();