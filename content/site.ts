export const site = {
  name: "New Generation",
  /** Organização responsável pelo projeto */
  parent: "Cross Missions",
  legalName: "Associação Cross Missions",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://geracaodosaber.vercel.app",
  description:
    "New Generation, projeto da Cross Missions na Guiné-Bissau: educação infantil, alimentação, saúde, formação de professores e apadrinhamento de crianças.",
  phone: "+55 11 98927-0283",
  phoneHref: "tel:+5511989270283",
  email: "contato.cmissions@gmail.com",
  instagram: {
    handle: "@crossmissionsorg",
    url: "https://www.instagram.com/crossmissionsorg/",
  },
  whatsapp:
    "https://api.whatsapp.com/send/?phone=5511989270283&text=Ol%C3%A1%21+Vim+do+seu+site%21",
  logo: {
    color: "/img/marca/new-generation.png",
    white: "/img/marca/new-generation-branco.png",
    /** proporção largura/altura do logo */
    ratio: 1000 / 380,
  },
  verse: "O que fizer a estes pequeninos a mim fizestes",
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Página Inicial", href: "/" },
  { label: "Sobre Nós", href: "/sobre-nos" },
  { label: "Nossos Projetos", href: "/o-que-fazemos" },
  { label: "Apadrinhamento", href: "/apadrinhamento" },
  { label: "Voluntários", href: "/voluntarios" },
  { label: "Eventos", href: "/agenda" },
];

export const footerNav: NavItem[] = [
  { label: "Página inicial", href: "/" },
  { label: "Sobre", href: "/sobre-nos" },
  { label: "O Que Fazemos", href: "/o-que-fazemos" },
  { label: "Apadrinhe", href: "/apadrinhamento" },
  { label: "Voluntários", href: "/voluntarios" },
  { label: "Eventos", href: "/agenda" },
  { label: "Privacidade", href: "/privacidade" },
];

export const heroPhotos = [
  { src: "/img/fotos/voluntarias-com-criancas.jpg", alt: "Voluntárias brincando com dezenas de crianças em uma aldeia da Guiné-Bissau" },
  { src: "/img/fotos/sala-de-aula-madeira.jpg", alt: "Voluntários e crianças reunidos em uma sala de aula de madeira" },
  { src: "/img/fotos/equipe-na-aldeia.jpg", alt: "Equipe da missão com moradores de uma aldeia, em campo aberto" },
  { src: "/img/fotos/construcao-tijolos.jpg", alt: "Crianças reunidas junto a uma construção de tijolos de barro" },
  { src: "/img/fotos/festa-dia-feliz.jpg", alt: "Festa com crianças em frente a uma faixa de Dia Feliz" },
];
