import type { BlogPost, Product } from '../types'

export const navItems = ['HOME', 'PRODUTOS', 'BLOG', 'FALE CONOSCO']

export const benefits = [
  { title: 'Entrega em todo o Brasil', subtitle: 'Confiança e agilidade' },
  { title: 'Pagamento Rápido', subtitle: '100% seguro' },
  { title: 'Suporte 24/7', subtitle: 'Pronto para você' },
]

export const categoryItems = ['Jogo Americano', 'Guardanapos', 'Porta Guardanapos', 'Kits', 'Novidades', 'Assinados']
export const workshopItems = ['WORKSHOP ENJOY', 'WORKSHOP DE NATAL']

export const helpLinks = [
  'Home',
  'Sobre a Enjoy',
  'Política de Segurança e Privacidade',
  'Fale Conosco',
  'Termos e Condições Brindes',
]

export const paymentMethods = ['VISA', 'Mastercard', 'American Express', 'Hipercard', 'elo', 'Diners Club', 'Boleto', 'pix']

export const categoryProducts: Product[] = [
  { id: 'jogo-botanica', name: 'Jogo Americano - Botânica', price: 44 },
  { id: 'jogo-buque', name: 'Jogo Americano - Buquê', price: 44 },
  { id: 'jogo-butterfly', name: 'Jogo Americano - Butterfly', price: 44 },
  { id: 'jogo-calma-tranquilidade', name: 'Jogo Americano - Calma e Tranquilidade', price: 44 },
  { id: 'jogo-casa-campo', name: 'Jogo Americano - Casa de Campo', price: 44 },
  { id: 'jogo-colmeia-preto-branco', name: 'Jogo Americano - Colmeia Preto e Branco', price: 44 },
  { id: 'jogo-copa-passaros', name: 'Jogo Americano - Copa de Pássaros', price: 44 },
  { id: 'jogo-costela-adao', name: 'Jogo Americano - Costela de Adão', price: 44 },
  { id: 'jogo-enjoy', name: 'Jogo Americano - Enjoy', price: 44 },
  { id: 'jogo-florecer-alamanda', name: 'Jogo Americano - Florecer de Alamanda', price: 44 },
  { id: 'jogo-florenca', name: 'Jogo Americano - Florença', price: 44 },
  { id: 'jogo-listras-rosa-groselha', name: 'Jogo Americano - Listras Rosa Groselha', price: 44 },
  { id: 'jogo-listras-verde-kiwi', name: 'Jogo Americano - Listras Verde Kiwi', price: 44 },
  { id: 'jogo-love-blue', name: 'Jogo Americano - Love Blue', price: 44 },
  { id: 'jogo-mar-caribe', name: 'Jogo Americano - Mar do Caribe', price: 44 },
  { id: 'jogo-miami', name: 'Jogo Americano - Miami', price: 44 },
]

export const extraProducts: Product[] = [
  { id: 'necessaires-estojo-nau', name: 'Necessairies Slim - Estojo Nau', price: 110 },
  { id: 'assinado-prato-colorido', name: 'Jogo Americano Assinado Prato Colorido', price: 47 },
]

export const allProducts: Product[] = [...categoryProducts, ...extraProducts]

export const blogPosts: BlogPost[] = [
  {
    id: 'mesa-aconchegante-inverno',
    title: 'Mesa Posta Aconchegante para Dias Frios',
    excerpt: 'Combinações simples de tecido e cor para uma mesa acolhedora.',
    category: 'Decoração',
    date: '18 Jan 2026',
    readTime: '6 min',
    author: 'Equipe Enjoy',
    content: [
      'Montar uma mesa acolhedora nos dias frios não exige excessos. O ponto principal é combinar tecidos encorpados com uma paleta quente.',
      'Com um jogo americano neutro e guardanapo contrastante, você cria um resultado elegante e funcional para o dia a dia.',
      'Use um centro de mesa baixo para manter conforto visual e conversa livre entre convidados.',
    ],
  },
  {
    id: 'guia-rapido-jogo-americano',
    title: 'Guia Rápido para Escolher o Jogo Americano Ideal',
    excerpt: 'Entenda formato, estampa e combinações para acertar na escolha.',
    category: 'Dicas',
    date: '05 Fev 2026',
    readTime: '5 min',
    author: 'Equipe Enjoy',
    content: [
      'Para rotina, prefira modelos de fácil manutenção com cores versáteis.',
      'Estampas marcantes ficam melhores com louça neutra. Bases lisas permitem mais ousadia nos detalhes.',
      'Monte uma base coringa e complemente com peças sazonais para ocasiões especiais.',
    ],
  },
  {
    id: 'como-cuidar-dos-guardanapos',
    title: 'Como Cuidar dos Guardanapos e Preservar as Cores',
    excerpt: 'Rotina de lavagem e armazenamento para manter as peças bonitas.',
    category: 'Cuidados',
    date: '14 Fev 2026',
    readTime: '7 min',
    author: 'Equipe Enjoy',
    content: [
      'Lave com sabão neutro e evite alvejantes agressivos em estampas digitais.',
      'Secar na sombra e passar em temperatura média ajuda a preservar textura e caimento.',
      'Guarde seco e organizado por família de cor para otimizar a composição da mesa.',
    ],
  },
  {
    id: 'mesa-do-dia-a-dia',
    title: 'Mesa do Dia a Dia com Aparência Premium',
    excerpt: 'Ajustes simples para elevar refeições rotineiras sem complicação.',
    category: 'Estilo',
    date: '03 Mar 2026',
    readTime: '5 min',
    author: 'Equipe Enjoy',
    content: [
      'Padronize uma base e alterne guardanapos para variar sem refazer toda a composição.',
      'Bandejas pequenas para condimentos ajudam na organização e melhoram a leitura visual da mesa.',
      'Com poucos ajustes, cada refeição ganha personalidade e praticidade.',
    ],
  },
]

export const listingTitleByCategory: Record<string, string> = {
  'Jogo Americano': 'Jogos Americanos',
  Guardanapos: 'Guardanapos',
  'Porta Guardanapos': 'Porta Guardanapos',
  Kits: 'Kits',
  Novidades: 'Novidades',
  Assinados: 'Assinados',
}

export const defaultCategoryName = 'Jogo Americano'

