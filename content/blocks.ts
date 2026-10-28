/* Blocos reutilizáveis: países, contadores, depoimentos, visão, galeria */

export type Country = { name: string; code: string };

/** code = ISO 3166-1 alpha-2, usado para os SVGs de bandeira em /components/flags */
export const countries: Country[] = [
  { name: "Brasil", code: "br" },
  { name: "Guiné-Bissau", code: "gw" },
  { name: "Portugal", code: "pt" },
  { name: "Cabo Verde", code: "cv" },
  { name: "Guiné Equatorial", code: "gq" },
  { name: "São Tomé e Príncipe", code: "st" },
  { name: "Angola", code: "ao" },
  { name: "Moçambique", code: "mz" },
  { name: "Timor-Leste", code: "tl" },
  { name: "Macau", code: "mo" },
];

export type Stat = { value: number; prefix?: string; suffix?: string; label: string };

export const stats: Stat[] = [
  { value: 1400, prefix: "+", label: "Crianças formadas" },
  { value: 7000, prefix: "+", label: "Famílias atendidas" },
  { value: 25000, prefix: "+", label: "Crianças alcançadas" },
  { value: 12, suffix: " anos", label: "de existência" },
];

export const achievementsText = [
  "A expressiva taxa de recuperação e integração social que alcançamos vai muito além de números — é a prova concreta de que, juntos, podemos fazer a diferença. A cada criança que superou desafios e a cada família que encontrou apoio, reafirmamos o nosso propósito.",
  "Obrigado por fazer parte dessa jornada de transformação!",
];

export type Testimonial = { name: string; photo: string; text: string; context: string };

export const testimonials: Testimonial[] = [
  {
    name: "Soraia Leal",
    photo: "/img/depoimentos/soraia-leal.jpg",
    context: "Viagem missionária",
    text: "Minha viagem missionária à Guiné-Bissau foi transformadora. Inspirado pelos pastores Alessandro e Mariana, testemunhei o amor de Deus em ação, vidas sendo restauradas e a esperança renascendo. Em cada passo dado nesse chamado, senti Sua presença renovando corações.",
  },
  {
    name: "Yara Silva",
    photo: "/img/depoimentos/yara-silva.jpg",
    context: "Voluntária",
    text: "Como voluntária, conectei empresas e comunidades por meio de artes, palestras e ações, mostrando como o amor de Cristo transforma vidas. Essa união supriu necessidades básicas e trouxe esperança, revelando o poder de uma causa mobilizadora e transformadora.",
  },
  {
    name: "Zinha Naque",
    photo: "/img/depoimentos/zinha-naque.jpg",
    context: "Moradora atendida pelo projeto",
    text: "Minha vida mudou com o projeto social. Agora temos água limpa, luz à noite, uma escola para nossas crianças e uma igreja onde louvamos a Deus. Com isso, nossa aldeia foi transformada, suprindo carências e restaurando sonhos, mostrando o quanto a fé renova esperanças e dignifica.",
  },
];


export type VisionItem = { icon: string; text: string };

export const visionStrip: VisionItem[] = [
  { icon: "/img/icones/visao-amor-v2.png", text: "Impactando Vidas com Amor, Esperança e Solidariedade" },
  { icon: "/img/icones/visao-futuro-v2.png", text: "Construindo um Futuro Sustentável na Guiné-Bissau" },
  { icon: "/img/icones/visao-forcas-v2.png", text: "Unindo Forças para Promover Mudanças Duradouras" },
  { icon: "/img/icones/visao-comunidades-v2.png", text: "Transformação de Comunidades: Educação, Saúde e Fé" },
];

export type GalleryPhoto = { src: string; alt: string; w: number; h: number };

export const gallery: GalleryPhoto[] = [
  { src: "/img/fotos/selfie-na-escola.jpg", alt: "Voluntário fazendo selfie com crianças em frente à escola", w: 2560, h: 1920 },
  { src: "/img/fotos/voluntaria-cocar.jpg", alt: "Voluntária com cocar durante ação missionária", w: 1706, h: 2560 },
  { src: "/img/fotos/muro-pintado.jpg", alt: "Voluntários com crianças diante de um muro pintado", w: 2560, h: 1920 },
  { src: "/img/fotos/missionarios-acao-social.jpg", alt: "Missionários abraçados durante ação social", w: 1706, h: 2560 },
  { src: "/img/fotos/criancas-na-areia.jpg", alt: "Crianças brincando na areia em frente à escola", w: 2560, h: 1920 },
  { src: "/img/fotos/voluntaria-na-aldeia.jpg", alt: "Voluntária com um grupo de crianças em uma aldeia", w: 1080, h: 1461 },
  { src: "/img/fotos/aluno-formado.jpg", alt: "Aluno formado segurando seu certificado", w: 780, h: 1040 },
  { src: "/img/fotos/familia-na-estrada.jpg", alt: "Família da missão em uma estrada", w: 864, h: 1920 },
  { src: "/img/fotos/lideres-locais.jpg", alt: "Líderes locais com a equipe da missão", w: 500, h: 500 },
  { src: "/img/fotos/menina-vestido-amarelo.jpg", alt: "Voluntária abraçando uma menina de vestido amarelo", w: 500, h: 500 },
  { src: "/img/fotos/equipe-e-comunidade.jpg", alt: "Equipe da missão com moradores da comunidade", w: 500, h: 500 },
  { src: "/img/fotos/meninas-na-viela.jpg", alt: "Duas meninas pequenas em uma viela", w: 500, h: 500 },
  { src: "/img/fotos/criancas-uniforme.jpg", alt: "Voluntária com crianças de uniforme escolar", w: 500, h: 500 },
];


export const goals = [
  {
    icon: "/img/icones/alvo-apadrinhamento.png",
    title: "Apadrinhamento Infantil",
    text: "O projeto visa alcançar diariamente 30.000 crianças em países de língua portuguesa, oferecendo educação de qualidade, alimentação diária e apoio para fortalecer a esperança. O apadrinhamento conecta padrinhos a crianças, garantindo uma base sólida para seu futuro.",
  },
  {
    icon: "/img/icones/alvo-construcao.png",
    title: "Projetos e construção",
    text: "Nosso objetivo é construir centros de aprendizagem que ofereçam educação de qualidade, capacitação e lazer seguro, promovendo oportunidades, desenvolvimento e esperança para o futuro das comunidades locais.",
  },
  {
    icon: "/img/icones/alvo-professores.png",
    title: "Formação de Professores",
    text: "Estamos em constante aprimoramento dos programas de treinamento, focando em técnicas pedagógicas modernas e valores éticos, para aumentar a eficiência dos professores e prepará-los como agentes de transformação, garantindo uma educação de qualidade e um futuro promissor.",
  },
];
