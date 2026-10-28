/* Eventos (migrados do The Events Calendar). Blocos de texto em formato simples para render. */

export type EventBlock =
  | { type: "lead"; text: string }
  | { type: "verse"; text: string; ref: string }
  | { type: "p"; text: string; strong?: string[] }
  | { type: "list"; title?: string; items: string[]; ordered?: boolean }
  | { type: "cta"; text: string };

export type MissionEvent = {
  slug: string;
  title: string;
  /** ISO local, fuso de Lisboa/Bissau/Brasil conforme o local */
  start: string;
  end: string;
  allDay?: boolean;
  timeLabel: string;
  location: string;
  country: string;
  blocks: EventBlock[];
};

const evangelismo: EventBlock[] = [
  { type: "lead", text: "“Como ouvirão, se não há quem pregue?”" },
  {
    type: "verse",
    text: "Como, pois, invocarão aquele em quem não creram? E como crerão naquele de quem nada ouviram? E como ouvirão, se não há quem pregue?",
    ref: "Romanos 10:14",
  },
  { type: "p", text: "O chamado é urgente! O mundo precisa da mensagem de salvação, e Deus quer usar a Sua Igreja como voz viva do Evangelho." },
  {
    type: "p",
    text: "Você é nosso convidado para a Conferência de Evangelismo 2025, um tempo de capacitação, renovação e despertamento para cumprir o Ide de Jesus com ousadia e amor.",
    strong: ["Conferência de Evangelismo 2025"],
  },
  { type: "cta", text: "Vidas estão esperando pela sua voz. Responda ao chamado!" },
];

export const events: MissionEvent[] = [
  {
    slug: "culto-missionario",
    title: "Culto Missionário",
    start: "2025-08-17T10:00:00+01:00",
    end: "2025-08-17T12:00:00+01:00",
    timeLabel: "10:00",
    location: "Porto",
    country: "Portugal",
    blocks: [
      { type: "lead", text: "“O campo está pronto, mas onde estão os trabalhadores?”" },
      { type: "verse", text: "Rogai, pois, ao Senhor da seara que mande trabalhadores para a sua seara", ref: "Mateus 9:38" },
      { type: "p", text: "Este é o tempo de nos levantarmos, de reacender o amor pelas almas e de ouvir o chamado que ecoa do coração de Deus para as nações e para nossa própria cidade." },
      {
        type: "p",
        text: "Convidamos você para um Culto Missionário Especial, um momento de despertamento espiritual, oração e clamor pelas vidas que precisam conhecer a Jesus.",
        strong: ["Culto Missionário Especial", "despertamento espiritual"],
      },
      { type: "cta", text: "Venha ser parte do que Deus está fazendo! Sua presença e oração podem mudar destinos eternos." },
    ],
  },
  {
    slug: "culto-missionario-2",
    title: "Culto Missionário",
    start: "2025-08-24T10:00:00+01:00",
    end: "2025-08-24T13:00:00+01:00",
    timeLabel: "10:00 às 13:00",
    location: "Santo Tirso",
    country: "Portugal",
    blocks: evangelismo,
  },
  {
    slug: "conferencia-evangelismo",
    title: "Conferência Evangelismo",
    start: "2025-08-30T00:00:00+01:00",
    end: "2025-08-31T23:59:00+01:00",
    allDay: true,
    timeLabel: "Dia inteiro",
    location: "Santo Tirso",
    country: "Portugal",
    blocks: evangelismo,
  },
  {
    slug: "viagem-guine-bissau",
    title: "Viagem Guiné-Bissau",
    start: "2025-09-25T00:00:00+00:00",
    end: "2025-11-20T23:59:00+00:00",
    allDay: true,
    timeLabel: "Temporada de 2 meses",
    location: "Guiné-Bissau",
    country: "África",
    blocks: [
      { type: "lead", text: "“Até os confins da terra…”" },
      {
        type: "verse",
        text: "Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas tanto em Jerusalém como em toda a Judeia e Samaria, e até aos confins da terra",
        ref: "Atos 1:8",
      },
      {
        type: "p",
        text: "Estamos iniciando uma Temporada Missionária de 2 meses na Guiné-Bissau, um tempo de serviço, amor e proclamação do Evangelho entre crianças, famílias e comunidades que precisam conhecer a esperança em Cristo.",
        strong: ["Temporada Missionária de 2 meses na Guiné-Bissau"],
      },
      {
        type: "list",
        title: "Durante este período, vamos:",
        items: [
          "Apoiar projetos de educação e discipulado cristão",
          "Servir em ações sociais e de saúde",
          "Levar o Evangelho a aldeias e vilas pouco alcançadas",
          "Capacitar líderes e igrejas locais",
        ],
      },
      { type: "cta", text: "Ore, contribua e, se Deus tocar no seu coração, venha conosco!" },
      { type: "p", text: "O campo está pronto, e o Senhor nos chama para ser Suas mãos e pés onde poucos têm ido." },
    ],
  },
  {
    slug: "viagem-missionaria",
    title: "Viagem Missionária",
    start: "2025-11-08T00:00:00+00:00",
    end: "2025-11-20T23:59:00+00:00",
    allDay: true,
    timeLabel: "13 dias",
    location: "Guiné-Bissau",
    country: "África",
    blocks: [
      { type: "lead", text: "Trip Missionária África 2025 – “Levando Luz às Nações”" },
      { type: "verse", text: "Ide por todo o mundo, pregai o evangelho a toda criatura", ref: "Marcos 16:15" },
      {
        type: "p",
        text: "Estamos formando uma equipe para uma viagem missionária à África, com foco especial na Guiné-Bissau.",
        strong: ["viagem missionária à África", "Guiné-Bissau"],
      },
      { type: "p", text: "Será um tempo de impacto, serviço e transformação, tanto para quem vai quanto para quem recebe." },
      {
        type: "list",
        title: "Durante a trip, vamos:",
        items: [
          "Compartilhar o Evangelho em comunidades locais",
          "Realizar atividades com crianças e jovens",
          "Apoiar igrejas e líderes em treinamentos",
          "Servir em ações sociais e humanitárias",
        ],
      },
      {
        type: "list",
        title: "Participe através de três formas:",
        ordered: true,
        items: ["Indo – Faça parte da equipe", "Orando – Interceda diariamente", "Contribuindo – Invista nessa missão"],
      },
      { type: "cta", text: "O chamado é agora. O campo está pronto. Seja resposta de Deus para a África!" },
    ],
  },
];

export const getEvent = (slug: string) => events.find((e) => e.slug === slug);

const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });

/** Formata o período usando a parte de data do ISO (independente de fuso do servidor) */
export function formatEventRange(e: MissionEvent) {
  const s = new Date(e.start.slice(0, 10) + "T12:00:00Z");
  const en = new Date(e.end.slice(0, 10) + "T12:00:00Z");
  const a = dateFmt.format(s).replace(".", "");
  const b = dateFmt.format(en).replace(".", "");
  return a === b ? a : `${a} – ${b}`;
}

export function eventDayParts(e: MissionEvent) {
  const d = new Date(e.start.slice(0, 10) + "T12:00:00Z");
  return {
    day: new Intl.DateTimeFormat("pt-BR", { day: "2-digit", timeZone: "UTC" }).format(d),
    month: new Intl.DateTimeFormat("pt-BR", { month: "short", timeZone: "UTC" }).format(d).replace(".", ""),
    year: new Intl.DateTimeFormat("pt-BR", { year: "numeric", timeZone: "UTC" }).format(d),
  };
}
