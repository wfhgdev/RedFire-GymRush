import brockSprite from '../assets/svg/Brock.svg'
import mistySprite from '../assets/svg/Misty.svg'
import surgeSprite from '../assets/svg/Surge.svg'
import erikaSprite from '../assets/svg/Erika.svg'
import kogaSprite from '../assets/svg/Koga.svg'
import sabrinaSprite from '../assets/svg/Sabrina.svg'
import blaineSprite from '../assets/svg/Blaine.svg'
import giovanniSprite from '../assets/svg/Giovanni.svg'

import brookBackground from '../assets/png/BrookBackground.png'
import mistyBackground from '../assets/png/MistyBattleground.png'
import surgeBackground from '../assets/png/SurgeBackground.png'
import erikaBackground from '../assets/png/ErikaBackground.png'
import kogaBackground from '../assets/png/KogaBackground.png'
import sabrinaBackground from '../assets/png/SabrinaBackground.png'
import blaineBackground from '../assets/png/BlaineBackground.png'
import giovanniBackground from '../assets/png/GiovanniBackground.png'

export const GYM_LEADERS = [
  {
    id: 1,
    name: 'Brock',
    badgeName: 'Medalla Roca',
    city: 'Ciudad Plateada',
    title: 'Líder de Gimnasio Plateada',
    sprite: brockSprite,
    backgroundImg: brookBackground,
    dialogue:
      '¡Soy Brock! ¡Soy el Líder del Gimnasio de Ciudad Plateada! Creo firmemente en la resistencia de la roca y en la fuerza de mis Pokémon de tipo Roca. ¡Mi defensa es impenetrable! ¡Demuéstrame de qué estás hecho!',
    pokemonTeam: [
      { id: 74, name: 'Geodude', level: 12 },
      { id: 95, name: 'Onix', level: 14 }
    ]
  },
  {
    id: 2,
    name: 'Misty',
    badgeName: 'Medalla Cascada',
    city: 'Ciudad Celeste',
    title: 'Líder de Gimnasio Celeste',
    sprite: mistySprite,
    backgroundImg: mistyBackground,
    dialogue:
      '¡Hola! ¡Soy Misty! ¿Eres un entrenador novato? Los Pokémon de tipo Agua pueden adaptarse a cualquier situación. ¡Prepárate para ahogarte en mi estrategia!',
    pokemonTeam: [
      { id: 120, name: 'Staryu', level: 18 },
      { id: 121, name: 'Starmie', level: 21 }
    ]
  },
  {
    id: 3,
    name: 'Lt. Surge',
    badgeName: 'Medalla Trueno',
    city: 'Ciudad Carmín',
    title: 'Líder de Gimnasio Carmín',
    sprite: surgeSprite,
    backgroundImg: surgeBackground,
    dialogue:
      '¡Hey, chico! ¡Estás en el ejército ahora! ¡Los Pokémon eléctricos me salvaron en la guerra! ¡Te voy a electrocutar con mi velocidad de rayo!',
    pokemonTeam: [
      { id: 100, name: 'Voltorb', level: 21 },
      { id: 25, name: 'Pikachu', level: 18 },
      { id: 26, name: 'Raichu', level: 24 }
    ]
  },
  {
    id: 4,
    name: 'Erika',
    badgeName: 'Medalla Arcoíris',
    city: 'Ciudad Azulona',
    title: 'Líder de Gimnasio Azulona',
    sprite: erikaSprite,
    backgroundImg: erikaBackground,
    dialogue:
      'Hola... Qué día tan agradable. Me llamo Erika y soy la Líder del Gimnasio de Ciudad Azulona. Cultivo Pokémon de tipo Planta... Mi estilo es tranquilo, pero ten cuidado con mis esporas.',
    pokemonTeam: [
      { id: 114, name: 'Tangela', level: 29 },
      { id: 70, name: 'Weepinbell', level: 29 },
      { id: 45, name: 'Vileplume', level: 29 }
    ]
  },
  {
    id: 5,
    name: 'Koga',
    badgeName: 'Medalla Alma',
    city: 'Ciudad Fucsia',
    title: 'Líder de Gimnasio Fucsia',
    sprite: kogaSprite,
    backgroundImg: kogaBackground,
    dialogue:
      '¡Fwahahaha! ¡Un intruso en mi gimnasio ninja! Los Pokémon de tipo Veneno desgastarán a tu equipo lentamente. ¡Siente la agonía de las toxinas secretas de los ninjas!',
    pokemonTeam: [
      { id: 109, name: 'Koffing', level: 37 },
      { id: 89, name: 'Muk', level: 39 },
      { id: 109, name: 'Koffing', level: 37 },
      { id: 110, name: 'Weezing', level: 43 }
    ]
  },
  {
    id: 6,
    name: 'Sabrina',
    badgeName: 'Medalla Pantano',
    city: 'Ciudad Azafrán',
    title: 'Líder de Gimnasio Azafrán',
    sprite: sabrinaSprite,
    backgroundImg: sabrinaBackground,
    dialogue:
      'Tuve una visión de tu llegada... No me gusta pelear, pero mi telequinesis y mis Pokémon Psíquicos doblegarán tu mente. El destino ya decidió que yo ganaré esta batalla.',
    pokemonTeam: [
      { id: 64, name: 'Kadabra', level: 38 },
      { id: 122, name: 'Mr. Mime', level: 37 },
      { id: 49, name: 'Venomoth', level: 38 },
      { id: 65, name: 'Alakazam', level: 43 }
    ]
  },
  {
    id: 7,
    name: 'Blaine',
    badgeName: 'Medalla Volcán',
    city: 'Isla Canela',
    title: 'Líder de Gimnasio Canela',
    sprite: blaineSprite,
    backgroundImg: blaineBackground,
    dialogue:
      '¡Hah! ¡Soy Blaine, el maestro ardiente del Gimnasio Canela! ¡Mis Pokémon de tipo Fuego van a incinerar tus sueños de medalla! ¡Espero que tengas listos tus antiquemaduras!',
    pokemonTeam: [
      { id: 58, name: 'Growlithe', level: 42 },
      { id: 77, name: 'Ponyta', level: 40 },
      { id: 78, name: 'Rapidash', level: 42 },
      { id: 59, name: 'Arcanine', level: 47 }
    ]
  },
  {
    id: 8,
    name: 'Giovanni',
    badgeName: 'Medalla Tierra',
    city: 'Ciudad Verde',
    title: 'Líder de Gimnasio Verde',
    sprite: giovanniSprite,
    backgroundImg: giovanniBackground,
    dialogue:
      '¡Bienvenidos a mi verdadero cubil! Fui el líder del Team Rocket, y ahora verás por qué soy el Líder definitivo de Ciudad Verde. La tierra misma temblará ante el poder de mis Pokémon Tipo Tierra. ¡Este es tu fin!',
    pokemonTeam: [
      { id: 111, name: 'Rhyhorn', level: 45 },
      { id: 51, name: 'Dugtrio', level: 42 },
      { id: 31, name: 'Nidoqueen', level: 44 },
      { id: 34, name: 'Nidoking', level: 45 },
      { id: 112, name: 'Rhydon', level: 50 }
    ]
  }
]
