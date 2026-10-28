/* Bloco "4 pilares": o texto muda por página */

export type Pillar = { key: "impacto" | "responsabilidade" | "transformacao" | "beneficios"; title: string; text: string };

const doacaoBase = {
  impacto:
    "Sua doação para os projetos sociais em Guiné-Bissau tem o poder de transformar comunidades inteiras. Cada contribuição se traduz em obras fundamentais como escolas, centros de saúde, poços, casas e estruturas que fortalecem o desenvolvimento local, trazendo dignidade e esperança para centenas de famílias.",
  responsabilidade:
    "Contribuir para esses projetos é assumir o compromisso de melhorar a qualidade de vida em comunidades que enfrentam desafios extremos. Sua doação ajuda a garantir que crianças, famílias e comunidades tenham acesso à infraestrutura básica, necessária para seu crescimento e bem-estar.",
  transformacao:
    "Ao doar, você participa de um movimento que muda realidades. Ver uma escola erguida, um poço jorrando água potável ou uma casa oferecendo abrigo são transformações tangíveis que a sua generosidade possibilita. Você terá a certeza de que está investindo em um impacto duradouro para as gerações futuras.",
};

export const pillars: Record<"home" | "apadrinhamento" | "voluntarios" | "doacao", Pillar[]> = {
  home: [
    { key: "impacto", title: "Impacto", text: "Como voluntário, você contribui para transformar comunidades em Guiné-Bissau, participando de projetos que criam infraestrutura e promovem dignidade e esperança para milhares." },
    { key: "responsabilidade", title: "Responsabilidade", text: "Voluntariar-se é assumir um compromisso com o desenvolvimento de comunidades, contribuindo com habilidades para mudanças reais e duradouras." },
    { key: "transformacao", title: "Transformação", text: "O trabalho voluntário vai além das estruturas físicas; é um ato de amor que transforma vidas e amplia sua visão sobre impacto coletivo." },
    { key: "beneficios", title: "Benefícios", text: "Essa experiência única permite vivenciar solidariedade, desenvolver habilidades e criar conexões que deixam um legado em sua vida e nas comunidades." },
  ],
  apadrinhamento: [
    { key: "impacto", title: "Impacto", text: "Sua participação no programa de apadrinhamento tem um efeito direto e duradouro na vida de crianças em Guiné-Bissau. Ao oferecer acesso à educação de qualidade, alimentação e cuidados essenciais, você ajuda a construir um futuro mais justo e cheio de oportunidades, quebrando o ciclo de miséria em comunidades vulneráveis." },
    { key: "responsabilidade", title: "Responsabilidade", text: "Apadrinhar uma criança é assumir um papel ativo em sua jornada de transformação. Sua responsabilidade como padrinho ou madrinha garante que ela tenha as condições necessárias para aprender, crescer e alcançar o seu pleno potencial. É um compromisso que reflete valores de solidariedade e amor ao próximo." },
    { key: "transformacao", title: "Transformação", text: "Ao se tornar padrinho ou madrinha, você ajuda a mudar não apenas a vida de uma criança, mas de toda uma comunidade. Além disso, você terá a alegria de acompanhar o impacto do seu gesto por meio de atualizações regulares, fotos e relatos sobre o progresso escolar e as atividades do seu afilhado(a)." },
    { key: "beneficios", title: "Benefícios como Padrinho", text: "Como padrinho ou madrinha, você passa a fazer parte de uma rede de pessoas engajadas na transformação de vidas na Guiné-Bissau. Você acompanha de perto o crescimento do seu afilhado(a) e vive, na prática, a alegria de ser resposta para uma criança e sua comunidade." },
  ],
  voluntarios: [
    { key: "impacto", title: "Impacto", text: "Como voluntário, você se torna uma força essencial para transformar comunidades vulneráveis em Guiné-Bissau. Ao participar de projetos de construção e reforma de escolas, centros de saúde, poços, casas e outras iniciativas comunitárias, você ajuda a criar infraestruturas que impactam diretamente a vida de milhares de pessoas, promovendo dignidade e esperança para o futuro." },
    { key: "responsabilidade", title: "Responsabilidade", text: "Ser voluntário em nossos projetos sociais significa assumir um compromisso com o desenvolvimento e a melhoria das condições de vida de comunidades carentes. Através da sua dedicação e habilidades, contribuímos para a construção de espaços que são verdadeiros pilares de mudança e crescimento comunitário. É um chamado que une solidariedade e ação prática." },
    { key: "transformacao", title: "Transformação", text: "O trabalho voluntário vai além da entrega de estruturas físicas; é uma transformação profunda e significativa. Cada tijolo colocado, cada poço escavado, e cada reforma realizada reflete um ato de amor que transforma não apenas a vida das pessoas atendidas, mas também a sua própria visão sobre o impacto que podemos gerar juntos." },
    { key: "beneficios", title: "Benefícios como Voluntário", text: "Ao se unir a essa missão, você terá a oportunidade de vivenciar a solidariedade em sua forma mais pura, enquanto desenvolve habilidades, amplia sua perspectiva e cria conexões profundas com outras pessoas que compartilham o mesmo propósito. Essa experiência única será um legado para as comunidades e para sua própria jornada de vida." },
  ],
  doacao: [
    { key: "impacto", title: "Impacto", text: doacaoBase.impacto },
    { key: "responsabilidade", title: "Responsabilidade", text: doacaoBase.responsabilidade },
    { key: "transformacao", title: "Transformação", text: doacaoBase.transformacao },
    { key: "beneficios", title: "Benefícios como Parceiro", text: "Ao se engajar como doador, você se torna parte de uma rede de solidariedade e transformação, que conecta pessoas com o propósito de gerar impacto social. Além disso, você acompanha de perto as iniciativas que a sua generosidade torna possíveis." },
  ],
};
