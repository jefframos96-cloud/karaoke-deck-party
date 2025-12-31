import { CardCategory, CardData } from './types';

export const CATEGORY_COLORS: Record<string, string> = {
  [CardCategory.QUICK]: 'from-teal-400 to-emerald-600', // Fresh, fast, easy
  [CardCategory.CLASSIC]: 'from-blue-500 to-cyan-500',
  [CardCategory.DUET]: 'from-purple-500 to-indigo-500', // Group/Social
  [CardCategory.CHALLENGE]: 'from-orange-500 to-red-600', // Intense
  [CardCategory.ACTING]: 'from-pink-500 to-rose-500', // Showman
  [CardCategory.WILDCARD]: 'from-yellow-400 to-amber-600', // Gold/Special
};

export const INITIAL_DECK: CardData[] = [
  // --- CARTAS RÁPIDAS (Ice Breakers) ---
  { 
    id: 'q1', 
    text: 'Canta una sola palabra de una canción famosa.', 
    category: CardCategory.QUICK, 
    color: CATEGORY_COLORS[CardCategory.QUICK],
    suggestions: ['"Baby" (Justin Bieber)', '"Corazón" (Maluma)', '"Libre" (Frozen)']
  },
  { 
    id: 'q2', 
    text: 'Canta 15 segundos de cualquier canción.', 
    category: CardCategory.QUICK, 
    color: CATEGORY_COLORS[CardCategory.QUICK],
    suggestions: ['"Despacito"', '"La Bamba"', '"Happy Birthday"']
  },
  { 
    id: 'q3', 
    text: 'Canta el último verso de una canción que conozcas.', 
    category: CardCategory.QUICK, 
    color: CATEGORY_COLORS[CardCategory.QUICK],
    suggestions: ['"Bohemian Rhapsody"', '"Color Esperanza"', '"Música Ligera"']
  },
  { 
    id: 'q4', 
    text: 'Tararea una canción y que otros adivinen.', 
    category: CardCategory.QUICK, 
    color: CATEGORY_COLORS[CardCategory.QUICK],
    suggestions: ['Intro de Star Wars', '"Pantera Rosa"', '"Shape of You"']
  },
  { 
    id: 'q5', 
    text: 'Canta solo el estribillo (máx. 15 segundos).', 
    category: CardCategory.QUICK, 
    color: CATEGORY_COLORS[CardCategory.QUICK],
    suggestions: ['"Y.M.C.A."', '"Wannabe" (Spice Girls)', '"Livin’ on a Prayer"']
  },
  { 
    id: 'q6', 
    text: 'Canta una canción empezando desde la mitad.', 
    category: CardCategory.QUICK, 
    color: CATEGORY_COLORS[CardCategory.QUICK],
    suggestions: ['Himno Nacional', '"Gasolina"', '"Someone Like You"']
  },
  { 
    id: 'q7', 
    text: 'Canta una canción usando solo “la la la”.', 
    category: CardCategory.QUICK, 
    color: CATEGORY_COLORS[CardCategory.QUICK],
    suggestions: ['"Hey Jude"', '"Can’t Get You Out of My Head"', '"Around the World"']
  },
  { 
    id: 'q8', 
    text: 'Canta una nota larga hasta quedarte sin aire.', 
    category: CardCategory.QUICK, 
    color: CATEGORY_COLORS[CardCategory.QUICK],
    suggestions: ['Final de "Chandelier"', 'Final de "I Will Always Love You"', 'Cualquier ópera']
  },
  { 
    id: 'q9', 
    text: 'Canta una canción sin mover la boca.', 
    category: CardCategory.QUICK, 
    color: CATEGORY_COLORS[CardCategory.QUICK],
    suggestions: ['"Tusa"', '"Dance Monkey"', '"La Cucaracha"']
  },
  { 
    id: 'q10', 
    text: 'Canta una palabra repetida con ritmo durante 15 segundos.', 
    category: CardCategory.QUICK, 
    color: CATEGORY_COLORS[CardCategory.QUICK],
    suggestions: ['"Tequila!"', '"Dame más gasolina"', '"Bailando"']
  },

  // --- CARTAS DE ACTUACIÓN (Show) ---
  { 
    id: 'a1', 
    text: 'Canta como si fueras un cantante famoso exagerado.', 
    category: CardCategory.ACTING, 
    color: CATEGORY_COLORS[CardCategory.ACTING],
    suggestions: ['Elvis Presley', 'Shakira', 'Luis Miguel']
  },
  { 
    id: 'a2', 
    text: 'Canta como si estuvieras en una telenovela dramática.', 
    category: CardCategory.ACTING, 
    color: CATEGORY_COLORS[CardCategory.ACTING],
    suggestions: ['"Olvídame y pega la vuelta" (Pimpinela)', '"Maldita Primavera"', '"Rata de dos patas"']
  },
  { 
    id: 'a3', 
    text: 'Canta como si estuvieras muy borracho.', 
    category: CardCategory.ACTING, 
    color: CATEGORY_COLORS[CardCategory.ACTING],
    suggestions: ['"Amigo" (Roberto Carlos)', '"El Rey"', '"Culpable o no"']
  },
  { 
    id: 'a4', 
    text: 'Canta como si fueras un niño chico.', 
    category: CardCategory.ACTING, 
    color: CATEGORY_COLORS[CardCategory.ACTING],
    suggestions: ['"Baby Shark"', '"La Vaca Lola"', '"Chuchuwa"']
  },
  { 
    id: 'a5', 
    text: 'Canta como si estuvieras en un estadio lleno.', 
    category: CardCategory.ACTING, 
    color: CATEGORY_COLORS[CardCategory.ACTING],
    suggestions: ['"We Will Rock You"', '"Seven Nation Army"', '"Matador"']
  },
  { 
    id: 'a6', 
    text: 'Canta como si estuvieras enojado con la canción.', 
    category: CardCategory.ACTING, 
    color: CATEGORY_COLORS[CardCategory.ACTING],
    suggestions: ['"In the End" (Linkin Park)', '"Mientes"', '"Vete" (Bad Bunny)']
  },
  { 
    id: 'a7', 
    text: 'Canta como si fuera una ópera.', 
    category: CardCategory.ACTING, 
    color: CATEGORY_COLORS[CardCategory.ACTING],
    suggestions: ['"Figaro"', '"Despacito" (versión lírica)', '"Ave Maria"']
  },
  { 
    id: 'a8', 
    text: 'Canta como si fuera un anuncio publicitario.', 
    category: CardCategory.ACTING, 
    color: CATEGORY_COLORS[CardCategory.ACTING],
    suggestions: ['Jingle de Coca-Cola', 'Canción de Marolio', '"Me encanta" (McDonalds)']
  },
  { 
    id: 'a9', 
    text: 'Canta con voz de villano.', 
    category: CardCategory.ACTING, 
    color: CATEGORY_COLORS[CardCategory.ACTING],
    suggestions: ['"Pobres almas en desgracia"', '"Bad Guy" (Billie Eilish)', 'Marcha Imperial']
  },
  { 
    id: 'a10', 
    text: 'Canta como si fuera el mejor momento de tu vida.', 
    category: CardCategory.ACTING, 
    color: CATEGORY_COLORS[CardCategory.ACTING],
    suggestions: ['"I Gotta Feeling"', '"Viva la Vida"', '"Celebration"']
  },

  // --- CARTAS DE GRUPO (Social) ---
  { 
    id: 'g1', 
    text: 'Todos cantan el estribillo juntos.', 
    category: CardCategory.DUET, 
    color: CATEGORY_COLORS[CardCategory.DUET],
    suggestions: ['"Sweet Caroline"', '"Un velero llamado libertad"', '"Aserejé"']
  },
  { 
    id: 'g2', 
    text: 'Vos empezás, otra persona continúa.', 
    category: CardCategory.DUET, 
    color: CATEGORY_COLORS[CardCategory.DUET],
    suggestions: ['"Colgando en tus manos"', '"Don’t Go Breaking My Heart"', '"Vivo por ella"']
  },
  { 
    id: 'g3', 
    text: 'Cantan en ronda: una línea cada uno.', 
    category: CardCategory.DUET, 
    color: CATEGORY_COLORS[CardCategory.DUET],
    suggestions: ['"Arroz con leche"', '"La cucaracha"', 'Cualquier Villancico']
  },
  { 
    id: 'g4', 
    text: 'Elegí a alguien para cantar con vos.', 
    category: CardCategory.DUET, 
    color: CATEGORY_COLORS[CardCategory.DUET],
    suggestions: ['"Shallow"', '"Fotografía" (Juanes)', '"Empire State of Mind"']
  },
  { 
    id: 'g5', 
    text: 'El grupo elige la canción.', 
    category: CardCategory.DUET, 
    color: CATEGORY_COLORS[CardCategory.DUET],
    suggestions: ['¡Lo que pida el público!', 'Un clásico de fiesta', 'Reggaeton viejo']
  },
  { 
    id: 'g6', 
    text: 'Todos cantan bajito… y al final gritan.', 
    category: CardCategory.DUET, 
    color: CATEGORY_COLORS[CardCategory.DUET],
    suggestions: ['"Twist and Shout"', '"Bohemian Rhapsody" (parte rock)', '"El grito de Tarzán"']
  },
  { 
    id: 'g7', 
    text: 'Vos cantás, el grupo hace los coros.', 
    category: CardCategory.DUET, 
    color: CATEGORY_COLORS[CardCategory.DUET],
    suggestions: ['"I Will Survive"', '"Like a Prayer"', '"Lamento Boliviano"']
  },
  { 
    id: 'g8', 
    text: 'Todos cantan una palabra a la vez.', 
    category: CardCategory.DUET, 
    color: CATEGORY_COLORS[CardCategory.DUET],
    suggestions: ['Himno Nacional', '"Cumpleaños feliz"', '"Despacito" (muy lento)']
  },

  // --- CARTAS VERGONZOSAS/RETOS (Challenge) ---
  { 
    id: 'c1', 
    text: 'Canta mirando a alguien fijo sin reírte.', 
    category: CardCategory.CHALLENGE, 
    color: CATEGORY_COLORS[CardCategory.CHALLENGE],
    suggestions: ['"I Will Always Love You"', '"Hello" (Adele)', '"Mirada" (Ivan Cornejo)']
  },
  { 
    id: 'c2', 
    text: 'Canta con los ojos cerrados.', 
    category: CardCategory.CHALLENGE, 
    color: CATEGORY_COLORS[CardCategory.CHALLENGE],
    suggestions: ['"My Heart Will Go On"', '"Imagine"', '"A mi manera"']
  },
  { 
    id: 'c3', 
    text: 'Canta exagerando cada gesto.', 
    category: CardCategory.CHALLENGE, 
    color: CATEGORY_COLORS[CardCategory.CHALLENGE],
    suggestions: ['"Single Ladies"', '"Thriller"', '"Macarena"']
  },
  { 
    id: 'c4', 
    text: 'Canta como si nadie te estuviera mirando.', 
    category: CardCategory.CHALLENGE, 
    color: CATEGORY_COLORS[CardCategory.CHALLENGE],
    suggestions: ['"Dancing Queen"', '"Girls Just Wanna Have Fun"', '"Firework"']
  },
  { 
    id: 'c5', 
    text: 'Canta una canción que te dé un poco de vergüenza admitir.', 
    category: CardCategory.CHALLENGE, 
    color: CATEGORY_COLORS[CardCategory.CHALLENGE],
    suggestions: ['"Barbie Girl"', '"Call Me Maybe"', 'Opening de Anime']
  },
  { 
    id: 'c6', 
    text: 'Canta mientras alguien te mira muy seriamente.', 
    category: CardCategory.CHALLENGE, 
    color: CATEGORY_COLORS[CardCategory.CHALLENGE],
    suggestions: ['"Careless Whisper"', '"Total Eclipse of the Heart"', '"Lose Yourself"']
  },

  // --- CARTAS COMODÍN (Wildcard) ---
  { 
    id: 'w1', 
    text: 'Podés elegir a alguien para que cante por vos.', 
    category: CardCategory.WILDCARD, 
    color: CATEGORY_COLORS[CardCategory.WILDCARD],
    suggestions: ['Elige al más desafinado', 'Elige al más tímido', 'Elige al dueño de casa']
  },
  { 
    id: 'w2', 
    text: 'Podés cantar a dúo.', 
    category: CardCategory.WILDCARD, 
    color: CATEGORY_COLORS[CardCategory.WILDCARD],
    suggestions: ['"Colgando en tus manos"', '"No me ames"', '"Lucky"']
  },
  { 
    id: 'w3', 
    text: 'Podés cambiar la carta por otra.', 
    category: CardCategory.WILDCARD, 
    color: CATEGORY_COLORS[CardCategory.WILDCARD],
    suggestions: ['¡Zafaste!', 'Prueba suerte de nuevo', 'Tira otra vez']
  },
  { 
    id: 'w4', 
    text: 'Podés tararear en vez de cantar.', 
    category: CardCategory.WILDCARD, 
    color: CATEGORY_COLORS[CardCategory.WILDCARD],
    suggestions: ['Intro de Series', 'Canciones instrumentales', 'Tecno']
  },
  { 
    id: 'w5', 
    text: 'Podés elegir una canción muy corta.', 
    category: CardCategory.WILDCARD, 
    color: CATEGORY_COLORS[CardCategory.WILDCARD],
    suggestions: ['"Happy Birthday"', 'Un jingle', 'Intro de Netflix']
  },
  { 
    id: 'w6', 
    text: 'Podés pasar… pero la próxima carta es doble.', 
    category: CardCategory.WILDCARD, 
    color: CATEGORY_COLORS[CardCategory.WILDCARD],
    suggestions: ['Descansa la voz', 'Prepara agua', 'Reza para que toque una fácil']
  },

  // --- CARTAS CLÁSICAS (The Originals/Oldies) - Para Modo Mezclado ---
  { 
    id: 'cl1', 
    text: 'Canta el estribillo de "Despacito".', 
    category: CardCategory.CLASSIC, 
    color: CATEGORY_COLORS[CardCategory.CLASSIC],
    suggestions: ['"Despacito" (Luis Fonsi)', '"Echame la culpa"', '"Calypso"']
  },
  { 
    id: 'cl2', 
    text: 'Canta una canción de Disney.', 
    category: CardCategory.CLASSIC, 
    color: CATEGORY_COLORS[CardCategory.CLASSIC],
    suggestions: ['"Libre soy" (Frozen)', '"Un mundo ideal" (Aladdin)', '"Bajo el mar" (Sirenita)']
  },
  { 
    id: 'cl3', 
    text: 'Canta tu canción favorita de la ducha.', 
    category: CardCategory.CLASSIC, 
    color: CATEGORY_COLORS[CardCategory.CLASSIC],
    suggestions: ['"I Will Survive"', '"Umbrella" (Rihanna)', '"La Bikina"']
  },
  { 
    id: 'cl4', 
    text: 'Canta una canción de los 80s.', 
    category: CardCategory.CLASSIC, 
    color: CATEGORY_COLORS[CardCategory.CLASSIC],
    suggestions: ['"Persiana Americana"', '"Sweet Child O’ Mine"', '"Take on Me"']
  },
  { 
    id: 'cl5', 
    text: 'Canta una canción de reggaeton sin bailar.', 
    category: CardCategory.CLASSIC, 
    color: CATEGORY_COLORS[CardCategory.CLASSIC],
    suggestions: ['"Gasolina"', '"Danza Kuduro"', '"Pepas"']
  },
  { 
    id: 'cl6', 
    text: 'Imita a Shakira cantando el "Waka Waka".', 
    category: CardCategory.CLASSIC, 
    color: CATEGORY_COLORS[CardCategory.CLASSIC],
    suggestions: ['"Waka Waka"', '"Hips Don’t Lie"', '"La Tortura"']
  },
  { 
    id: 'cl7', 
    text: 'Rap improvisado (30 segundos).', 
    category: CardCategory.CLASSIC, 
    color: CATEGORY_COLORS[CardCategory.CLASSIC],
    suggestions: ['Base de Eminem', 'Tema libre', 'Cuenta tu día']
  },
  { 
    id: 'cl8', 
    text: 'Canta una canción romántica mirando al techo.', 
    category: CardCategory.CLASSIC, 
    color: CATEGORY_COLORS[CardCategory.CLASSIC],
    suggestions: ['"Entra en mi vida" (Sin Bandera)', '"Si tú no estás aquí"', '"Un siglo sin ti"']
  },
  { 
    id: 'cl9', 
    text: 'Canta el intro de tu serie favorita.', 
    category: CardCategory.CLASSIC, 
    color: CATEGORY_COLORS[CardCategory.CLASSIC],
    suggestions: ['"Friends" (I’ll be there for you)', '"Game of Thrones"', '"El Príncipe del Rap"']
  },
  { 
    id: 'cl10', 
    text: 'Canta una canción que sepa todo el mundo.', 
    category: CardCategory.CLASSIC, 
    color: CATEGORY_COLORS[CardCategory.CLASSIC],
    suggestions: ['"Cielito Lindo"', '"La Bamba"', '"Ai Se Eu Te Pego"']
  },
];