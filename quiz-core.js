const QUIZ_QUESTIONS = [
  {
    tag: "OBJETIVO",
    text: "Qual é o principal objetivo do projeto Fire Watch?",
    answers: [
      "Substituir completamente os bombeiros",
      "Auxiliar profissionais em áreas de risco",
      "Transportar pessoas em longas distâncias",
      "Produzir vídeos para redes sociais",
    ],
    correct: 1,
    explanation: "O drone coleta informações para apoiar profissionais e reduzir sua exposição ao perigo.",
  },
  {
    tag: "APLICAÇÃO",
    text: "Qual profissional foi usado como exemplo na apresentação?",
    answers: ["Professor", "Motorista", "Bombeiro", "Cozinheiro"],
    correct: 2,
    explanation: "Bombeiros podem usar as imagens do drone para conhecer melhor uma área perigosa.",
  },
  {
    tag: "INCÊNDIO",
    text: "Como o drone pode ajudar em um incêndio na vegetação?",
    answers: [
      "Apagando sozinho todo o incêndio",
      "Observando a área e ajudando a localizar focos",
      "Plantando novas árvores automaticamente",
      "Substituindo todos os equipamentos da equipe",
    ],
    correct: 1,
    explanation: "A visão aérea ajuda a localizar focos e a entender por onde a equipe pode começar.",
  },
  {
    tag: "SEGURANÇA",
    text: "Por que enviar o drone antes de aproximar a equipe?",
    answers: [
      "Para obter informações com menor exposição humana ao risco",
      "Para deixar o trabalho mais demorado",
      "Apenas para produzir imagens bonitas",
      "Para afastar toda a fumaça do local",
    ],
    correct: 0,
    explanation: "O drone observa primeiro para que os profissionais planejem a atuação com mais segurança.",
  },
  {
    tag: "TRABALHO EM EQUIPE",
    text: "O drone substitui o trabalho dos bombeiros?",
    answers: [
      "Sim, em qualquer situação",
      "Sim, mas apenas durante o dia",
      "Não, ele funciona como uma ferramenta de apoio",
      "Não, porque serve somente como brinquedo",
    ],
    correct: 2,
    explanation: "A tecnologia oferece informações; as decisões e a atuação continuam com os profissionais.",
  },
];

// Vinte setores iguais: 50% uma bala, 30% duas, 15% três e 5% cinco.
const PRIZE_SECTORS = [1, 2, 1, 3, 1, 2, 1, 2, 1, 5, 1, 2, 1, 3, 1, 2, 1, 3, 1, 2];

function selectPrize(randomValue) {
  if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) {
    throw new RangeError("O valor aleatório deve estar entre 0 e 1.");
  }
  const sector = Math.floor(randomValue * PRIZE_SECTORS.length);
  return { sector, amount: PRIZE_SECTORS[sector] };
}

if (typeof module !== "undefined") module.exports = { QUIZ_QUESTIONS, PRIZE_SECTORS, selectPrize };
