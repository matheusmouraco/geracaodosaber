export type Project = {
  slug: string;
  tagline: string;
  title: string;
  summary: string;
  body: string;
  image: string;
  progress: number;
  /** Variações de texto usadas na Home */
  home?: { title?: string; summary?: string; body?: string };
};

export const projects: Project[] = [
  {
    slug: "educacao-infantil",
    tagline: "Juntos escrevemos um futuro de esperança",
    title: "Educação Infantil",
    summary: "Ensino de qualidade com princípios que transformam vidas e comunidades.",
    body: "Apadrinhar uma criança na África significa muito mais do que oferecer apoio financeiro; é garantir dignidade, educação e a chance de sonhar com um futuro diferente. Essas crianças recebem café da manhã, almoço, uniforme, material escolar e ensino fundamentado em princípios cristãos. Em um contexto de extrema pobreza, o apadrinhamento transforma vidas, promove saúde, aprendizado e esperança. Sua contribuição é um gesto de amor que ilumina o futuro de uma geração.",
    image: "/img/projetos/educacao-infantil.jpg",
    progress: 80,
    home: {
      summary: "Ensino de qualidade com princípios cristãos, transformando vidas e comunidades.",
    },
  },
  {
    slug: "formacao-de-professores",
    tagline: "Um professor para um pequeno mestre",
    title: "Formação de Professores",
    summary: "Capacitação de educadores locais para inspirar e liderar novas gerações.",
    body: "O projeto visa apoiar professores que já foram beneficiados por nossos programas e hoje retornam para ensinar em suas comunidades. Garantimos salários justos, formações continuadas, transporte e materiais pedagógicos. Esses educadores, com profundo entendimento da realidade local, inspiram as crianças a sonhar e a construir uma sociedade mais forte. Investir em um professor é investir no impacto duradouro que a educação pode gerar em toda uma geração.",
    image: "/img/projetos/formacao-de-professores.jpg",
    progress: 20,
  },
  {
    slug: "voluntariado-do-amor",
    tagline: "Seja parte desta história de transformação",
    title: "Voluntariado do amor",
    summary: "Dedique tempo e habilidades para transformar vidas.",
    body: "Seja um voluntário em nossos projetos e vamos juntos levar esperança às crianças mais vulneráveis. Todas as profissões são bem-vindas para apoiar em áreas como saúde, educação e infraestrutura. Além disso, mesmo sem formação específica, voluntários podem doar amor, ensinar habilidades básicas e oferecer presença acolhedora. É uma experiência transformadora que conecta o coração de quem doa e de quem recebe, promovendo dignidade e amor.",
    image: "/img/projetos/voluntariado.jpg",
    progress: 30,
  },
  {
    slug: "nucleo-de-saude",
    tagline: "Cuidando com Amor e Esperança",
    title: "Núcleo de Saúde",
    summary: "Cuidados e combate à malária e saúde infantil nas aldeias.",
    body: "Dentro das nossas escolas em aldeias remotas, nosso Projeto Saúde oferece cuidados essenciais, especialmente para as crianças vulneráveis a doenças como a malária. Uma enfermeira dedicada visita as comunidades, realiza consultas e distribui medicamentos. Além de assistência médica, promovemos educação em saúde, higiene e nutrição. Esse trabalho é um ato de amor e um reflexo da nossa missão de levar cuidado, vida e esperança para quem mais precisa.",
    image: "/img/projetos/nucleo-de-saude.jpg",
    progress: 5,
    home: {
      title: "Centro de Saúde",
      summary: "Cuidados domiciliares, combate à malária e saúde infantil nas aldeias.",
      body: "Em aldeias remotas de Guiné-Bissau, nosso Projeto Saúde oferece cuidados essenciais, especialmente para as crianças vulneráveis a doenças como a malária. Uma enfermeira dedicada visita as comunidades, realiza consultas e distribui medicamentos. Além de assistência médica, promovemos educação em saúde, higiene e nutrição. Esse trabalho é um ato de amor e um reflexo da nossa missão de levar cuidado, vida e esperança para quem mais precisa.",
    },
  },
  {
    slug: "alimentacao-infantil",
    tagline: "Nutrir para Transformar Vidas",
    title: "Alimentação Infantil",
    summary: "Café da manhã e almoço diários para crianças que enfrentam fome e miséria.",
    body: "Garantimos duas refeições diárias para as crianças atendidas: um nutritivo café da manhã e um almoço completo. Para muitas delas, essas são as únicas refeições do dia. O projeto, além de combater a fome, melhora o aprendizado, incentiva a frequência escolar e promove saúde. Alimentar uma criança vai além de prover sustento; é nutrir sonhos e abrir caminhos para um futuro cheio de possibilidades e dignidade.",
    image: "/img/projetos/alimentacao-infantil.jpg",
    progress: 80,
  },
  {
    slug: "esportes-para-todos",
    tagline: "Treinando Corpos, Moldando Futuros",
    title: "Esportes para Todos",
    summary: "Desenvolvimento físico, valores e esperança através de atividades esportivas.",
    body: "O esporte é uma ferramenta poderosa para o desenvolvimento integral das crianças. Nosso projeto oferece atividades regulares que promovem saúde, disciplina, trabalho em equipe e valores cristãos. Além disso, formamos líderes locais para orientar as crianças, mostrando que sonhos podem se tornar realidade. Através do esporte, construímos uma geração mais forte, resiliente e cheia de esperança, preparando crianças para o futuro com propósito.",
    image: "/img/projetos/esportes.jpg",
    progress: 10,
  },
  {
    slug: "projetos-em-desenvolvimento",
    tagline: "Grandes Transformações: Juntos por uma Comunidade Melhor",
    title: "Projetos em Desenvolvimento",
    summary: "Construção de casas, poços e sustentabilidade com hortas e galinheiros.",
    body: "Desenvolvemos projetos assistenciais como construção de casas, perfuração de poços, reforma de escolas e implementação de projetos agrícolas. Cada iniciativa é uma resposta prática às necessidades locais, promovendo dignidade e melhores condições de vida. Esses projetos são um reflexo do nosso compromisso em transformar realidades. Com sua ajuda, podemos continuar construindo comunidades fortes, seguras e cheias de esperança.",
    image: "/img/projetos/projetos-em-desenvolvimento.jpg",
    progress: 20,
  },
];

export const homeProjectSlugs = ["educacao-infantil", "formacao-de-professores", "nucleo-de-saude"];

/** Rótulo da barra de progresso (a confirmar com o cliente) */
export const progressLabel = "Meta alcançada";
