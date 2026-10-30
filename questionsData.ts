export interface QuizOption {
  key: 'A' | 'B' | 'C' | 'D';
  textEs: string;
  textHy: string;
}

export interface QuizQuestion {
  id: number;
  part: 1 | 2 | 3;
  partTitleEs: string;
  partTitleHy: string;
  questionEs: string;
  questionHy: string;
  options: QuizOption[];
  correct: 'A' | 'B' | 'C' | 'D';
  moneyReward: number; // e.g. 500, 1000, ... up to 1,000,000
}

export const PRIZE_LADDER = [
  500, 1000, 2000, 3000, 5000, // 1-5 (5 is safe haven 5,000)
  7500, 10000, 15000, 20000, 25000, // 6-10 (10 is safe haven 25,000)
  35000, 50000, 65000, 80000, 100000, // 11-15 (15 is safe haven 100,000)
  125000, 150000, 175000, 200000, 250000, // 16-20 (20 is safe haven 250,000)
  300000, 350000, 400000, 450000, 500000, // 21-25 (25 is safe haven 500,000)
  600000, 700000, 800000, 900000, 1000000 // 26-30 (30 is Grand Prize 1,000,000)
];

export const QUESTIONS_DATA: QuizQuestion[] = [
  // --- PARTE 1 ---
  {
    id: 1,
    part: 1,
    partTitleEs: "Parte 1. Situaciones cotidianas",
    partTitleHy: "Մաս 1. Առօրյա իրավիճակներ",
    questionEs: "¿Qué harías si te despertaras por la mañana y descubrieras que tienes solamente diez minutos para llegar al trabajo?",
    questionHy: "Ի՞նչ կանեիր, եթե առավոտյան արթնանայիր և պարզեիր, որ ընդամենը տասը րոպե ունես աշխատանքի հասնելու համար։",
    options: [
      {
        key: 'A',
        textEs: "Me levantaría rápidamente, me vestiría y saldría sin desayunar.",
        textHy: "Արագ վեր կկենայի, կհագնվեի և դուրս կգայի առանց նախաճաշելու։"
      },
      {
        key: 'B',
        textEs: "Prepararía una cena especial porque todavía tengo mucho tiempo.",
        textHy: "Հատուկ ընթրիք կպատրաստեի, որովհետև դեռ շատ ժամանակ ունեմ։"
      },
      {
        key: 'C',
        textEs: "Llamaría a mi jefe para preguntarle si podemos trabajar en pijama.",
        textHy: "Կզանգեի ղեկավարիս և կհարցնեի՝ կարո՞ղ ենք աշխատել գիշերազգեստով։"
      },
      {
        key: 'D',
        textEs: "Me volvería a dormir y esperaría a que empezara el fin de semana.",
        textHy: "Նորից կքնեի և կսպասեի, մինչև հանգստյան օրերը սկսվեին։"
      }
    ],
    correct: 'A',
    moneyReward: PRIZE_LADDER[0]
  },
  {
    id: 2,
    part: 1,
    partTitleEs: "Parte 1. Situaciones cotidianas",
    partTitleHy: "Մաս 1. Առօրյա իրավիճակներ",
    questionEs: "Estás en un restaurante y el camarero te trae un plato completamente diferente del que habías pedido. ¿Qué haces?",
    questionHy: "Դու ռեստորանում ես, և մատուցողը քեզ բերում է բոլորովին այլ ուտեստ, քան պատվիրել էիր։ Ի՞նչ ես անում։",
    options: [
      {
        key: 'A',
        textEs: "Me como el plato y después pregunto qué era exactamente.",
        textHy: "Ուտում եմ ուտեստը, հետո հարցնում, թե իրականում ինչ էր դա։"
      },
      {
        key: 'B',
        textEs: "Le digo educadamente que ha habido una confusión y le pido mi plato.",
        textHy: "Քաղաքավարի ասում եմ, որ շփոթություն է եղել, և խնդրում եմ իմ պատվիրած ուտեստը։"
      },
      {
        key: 'C',
        textEs: "Me levanto y empiezo a trabajar como camarero para solucionar el problema.",
        textHy: "Վեր եմ կենում և սկսում աշխատել որպես մատուցող՝ խնդիրը լուծելու համար։"
      },
      {
        key: 'D',
        textEs: "Le pregunto al plato por qué ha venido a mi mesa sin permiso.",
        textHy: "Ուտեստին հարցնում եմ, թե ինչու է առանց թույլտվության եկել իմ սեղանի մոտ։"
      }
    ],
    correct: 'B',
    moneyReward: PRIZE_LADDER[1]
  },
  {
    id: 3,
    part: 1,
    partTitleEs: "Parte 1. Situaciones cotidianas",
    partTitleHy: "Մաս 1. Առօրյա իրավիճակներ",
    questionEs: "Tu amigo te llama a medianoche y te dice que quiere contarte algo muy importante. ¿Cómo reaccionas?",
    questionHy: "Ընկերդ կեսգիշերին զանգում է և ասում, որ ուզում է քեզ շատ կարևոր բան պատմել։ Ինչպե՞ս ես արձագանքում։",
    options: [
      {
        key: 'A',
        textEs: "Le digo que primero necesito preparar una pizza para escuchar mejor.",
        textHy: "Ասում եմ, որ նախ պետք է պիցցա պատրաստեմ, որպեսզի ավելի լավ լսեմ։"
      },
      {
        key: 'B',
        textEs: "Le pregunto si la noticia puede esperar hasta el próximo año.",
        textHy: "Հարցնում եմ՝ արդյոք նորությունը կարող է սպասել մինչև հաջորդ տարի։"
      },
      {
        key: 'C',
        textEs: "Le pregunto si está bien y qué ha ocurrido.",
        textHy: "Հարցնում եմ՝ արդյոք ամեն ինչ կարգին է, և ինչ է պատահել։"
      },
      {
        key: 'D',
        textEs: "Le digo que mi almohada tiene una reunión muy importante conmigo.",
        textHy: "Ասում եմ, որ իմ բարձն ինձ հետ շատ կարևոր հանդիպում ունի։"
      }
    ],
    correct: 'C',
    moneyReward: PRIZE_LADDER[2]
  },
  {
    id: 4,
    part: 1,
    partTitleEs: "Parte 1. Situaciones cotidianas",
    partTitleHy: "Մաս 1. Առօրյա իրավիճակներ",
    questionEs: "Vas al supermercado para comprar solamente pan, pero ves muchas ofertas interesantes. ¿Qué decides hacer?",
    questionHy: "Գնում ես սուպերմարկետ միայն հաց գնելու համար, բայց տեսնում ես բազմաթիվ հետաքրքիր զեղչեր։ Ի՞նչ ես որոշում անել։",
    options: [
      {
        key: 'A',
        textEs: "Compro todo el supermercado porque algún día podría necesitarlo.",
        textHy: "Գնում եմ ամբողջ սուպերմարկետի ապրանքները, որովհետև մի օր կարող են պետք գալ։"
      },
      {
        key: 'B',
        textEs: "Me llevo diez carritos y llamo a todos mis vecinos para ayudarme.",
        textHy: "Վերցնում եմ տասը սայլակ և զանգում բոլոր հարևաններիս, որ օգնեն։"
      },
      {
        key: 'C',
        textEs: "Me escondo detrás de las verduras para no gastar dinero.",
        textHy: "Թաքնվում եմ բանջարեղենի հետևում, որպեսզի գումար չծախսեմ։"
      },
      {
        key: 'D',
        textEs: "Comparo los precios y compro solamente lo que realmente necesito.",
        textHy: "Համեմատում եմ գները և գնում միայն այն, ինչ ինձ իսկապես անհրաժեշտ է։"
      }
    ],
    correct: 'D',
    moneyReward: PRIZE_LADDER[3]
  },
  {
    id: 5,
    part: 1,
    partTitleEs: "Parte 1. Situaciones cotidianas",
    partTitleHy: "Մաս 1. Առօրյա իրավիճակներ",
    questionEs: "Tu vecino escucha música muy alta todas las noches y no puedes dormir. ¿Qué sería lo más adecuado?",
    questionHy: "Քո հարևանը ամեն գիշեր շատ բարձր երաժշտություն է լսում, և դու չես կարողանում քնել։ Ո՞րն է ամենահարմար քայլը։",
    options: [
      {
        key: 'A',
        textEs: "Hablar con él tranquilamente y pedirle que baje el volumen.",
        textHy: "Հանգիստ խոսել նրա հետ և խնդրել, որ ձայնը ցածրացնի։"
      },
      {
        key: 'B',
        textEs: "Comprar unos altavoces enormes y organizar un concierto en el pasillo.",
        textHy: "Գնել հսկայական բարձրախոսներ և համերգ կազմակերպել միջանցքում։"
      },
      {
        key: 'C',
        textEs: "Aprender a tocar la batería a las tres de la mañana.",
        textHy: "Սովորել թմբուկ նվագել առավոտյան ժամը երեքին։"
      },
      {
        key: 'D',
        textEs: "Mudarse a la Luna, donde probablemente hay menos vecinos.",
        textHy: "Տեղափոխվել Լուսին, որտեղ հավանաբար ավելի քիչ հարևաններ կան։"
      }
    ],
    correct: 'A',
    moneyReward: PRIZE_LADDER[4]
  },
  {
    id: 6,
    part: 1,
    partTitleEs: "Parte 1. Situaciones cotidianas",
    partTitleHy: "Մաս 1. Առօրյա իրավիճակներ",
    questionEs: "Estás hablando con una persona española, pero habla tan rápido que no entiendes casi nada. ¿Qué le dices?",
    questionHy: "Դու խոսում ես իսպանացու հետ, բայց նա այնքան արագ է խոսում, որ գրեթե ոչինչ չես հասկանում։ Ի՞նչ ես ասում նրան։",
    options: [
      {
        key: 'A',
        textEs: "¿Puedes hablar todavía más rápido? Quiero practicar mis superpoderes.",
        textHy: "Կարո՞ղ ես ավելի արագ խոսել։ Ուզում եմ մարզել իմ գերբնական կարողությունները։"
      },
      {
        key: 'B',
        textEs: "Perdona, ¿podrías hablar un poco más despacio y repetir lo último?",
        textHy: "Կներես, կարո՞ղ ես մի փոքր ավելի դանդաղ խոսել և կրկնել վերջին ասածդ։"
      },
      {
        key: 'C',
        textEs: "Voy a fingir que entiendo todo y responderé siempre «patata».",
        textHy: "Կձևացնեմ, թե ամեն ինչ հասկանում եմ, և միշտ կպատասխանեմ «կարտոֆիլ»։"
      },
      {
        key: 'D',
        textEs: "Espera un momento, voy a llamar a mi profesor de español.",
        textHy: "Մի պահ սպասիր, հիմա կզանգեմ իմ իսպաներենի ուսուցչին։"
      }
    ],
    correct: 'B',
    moneyReward: PRIZE_LADDER[5]
  },
  {
    id: 7,
    part: 1,
    partTitleEs: "Parte 1. Situaciones cotidianas",
    partTitleHy: "Մաս 1. Առօրյա իրավիճակներ",
    questionEs: "Has preparado una cena para tus amigos, pero accidentalmente has puesto demasiada sal en la comida. ¿Qué haces?",
    questionHy: "Դու ընթրիք ես պատրաստել ընկերներիդ համար, բայց պատահաբար չափազանց շատ աղ ես ավելացրել ուտելիքին։ Ի՞նչ ես անում։",
    options: [
      {
        key: 'A',
        textEs: "Les explico que es una receta secreta de otro planeta.",
        textHy: "Բացատրում եմ, որ դա այլ մոլորակի գաղտնի բաղադրատոմս է։"
      },
      {
        key: 'B',
        textEs: "Les digo que coman sin hacer preguntas porque soy un gran cocinero.",
        textHy: "Ասում եմ՝ թող ուտեն առանց հարցեր տալու, որովհետև ես հիանալի խոհարար եմ։"
      },
      {
        key: 'C',
        textEs: "Intento arreglar la comida y, si no puedo, preparo otra cosa.",
        textHy: "Փորձում եմ շտկել ուտելիքի համը, իսկ եթե չկարողանամ, ուրիշ բան եմ պատրաստում։"
      },
      {
        key: 'D',
        textEs: "Declaro oficialmente que la sal es el ingrediente principal de la noche.",
        textHy: "Պաշտոնապես հայտարարում եմ, որ աղը երեկոյի գլխավոր բաղադրիչն է։"
      }
    ],
    correct: 'C',
    moneyReward: PRIZE_LADDER[6]
  },
  {
    id: 8,
    part: 1,
    partTitleEs: "Parte 1. Situaciones cotidianas",
    partTitleHy: "Մաս 1. Առօրյա իրավիճակներ",
    questionEs: "Tu teléfono cae al suelo y la pantalla deja de funcionar justo antes de una reunión importante. ¿Qué haces?",
    questionHy: "Հեռախոսդ ընկնում է հատակին, և էկրանը դադարում է աշխատել հենց կարևոր հանդիպումից առաջ։ Ի՞նչ ես անում։",
    options: [
      {
        key: 'A',
        textEs: "Le pido al teléfono que se recupere porque tenemos mucho trabajo.",
        textHy: "Խնդրում եմ հեռախոսին վերականգնվել, որովհետև շատ գործ ունենք։"
      },
      {
        key: 'B',
        textEs: "Lo pongo debajo de la almohada para que descanse unas horas.",
        textHy: "Դնում եմ բարձի տակ, որպեսզի մի քանի ժամ հանգստանա։"
      },
      {
        key: 'C',
        textEs: "Compro un teléfono de juguete y finjo que todo funciona perfectamente.",
        textHy: "Գնում եմ խաղալիք հեռախոս և ձևացնում, թե ամեն ինչ հիանալի աշխատում է։"
      },
      {
        key: 'D',
        textEs: "Busco otra forma de comunicarme y después llevo el móvil a reparar.",
        textHy: "Գտնում եմ կապ հաստատելու այլ միջոց, հետո հեռախոսը տանում եմ վերանորոգման։"
      }
    ],
    correct: 'D',
    moneyReward: PRIZE_LADDER[7]
  },
  {
    id: 9,
    part: 1,
    partTitleEs: "Parte 1. Situaciones cotidianas",
    partTitleHy: "Մաս 1. Առօրյա իրավիճակներ",
    questionEs: "Un amigo te invita a una fiesta, pero al día siguiente tienes un examen muy difícil. ¿Qué decides?",
    questionHy: "Ընկերդ քեզ հրավիրում է երեկույթի, բայց հաջորդ օրը շատ դժվար քննություն ունես։ Ի՞նչ ես որոշում։",
    options: [
      {
        key: 'A',
        textEs: "Le explico que tengo que estudiar y propongo quedar después del examen.",
        textHy: "Բացատրում եմ, որ պետք է սովորեմ, և առաջարկում եմ հանդիպել քննությունից հետո։"
      },
      {
        key: 'B',
        textEs: "Voy a la fiesta con todos mis libros y empiezo a dar clases.",
        textHy: "Գնում եմ երեկույթ բոլոր գրքերովս և սկսում եմ դասավանդել։"
      },
      {
        key: 'C',
        textEs: "Le pido al profesor que venga a hacer el examen en la fiesta.",
        textHy: "Խնդրում եմ ուսուցչին գալ և քննությունը անցկացնել երեկույթի ժամանակ։"
      },
      {
        key: 'D',
        textEs: "Decido que bailar toda la noche es la mejor manera de memorizar gramática.",
        textHy: "Ուրիշ տարբերակ՝ որոշում եմ, որ ամբողջ գիշեր պարելը քերականությունը հիշելու լավագույն միջոցն է։"
      }
    ],
    correct: 'A',
    moneyReward: PRIZE_LADDER[8]
  },
  {
    id: 10,
    part: 1,
    partTitleEs: "Parte 1. Situaciones cotidianas",
    partTitleHy: "Մաս 1. Առօրյա իրավիճակներ",
    questionEs: "Te encuentras con una persona conocida en la calle, pero no recuerdas su nombre. ¿Cómo puedes salir de la situación?",
    questionHy: "Փողոցում հանդիպում ես ծանոթ մարդու, բայց չես հիշում նրա անունը։ Ինչպե՞ս կարող ես դուրս գալ իրավիճակից։",
    options: [
      {
        key: 'A',
        textEs: "Le digo que ha cambiado tanto que necesito ver su pasaporte.",
        textHy: "Ասում եմ, որ այնքան է փոխվել, որ պետք է տեսնեմ նրա անձնագիրը։"
      },
      {
        key: 'B',
        textEs: "La saludo amablemente y, si es necesario, le pregunto su nombre otra vez.",
        textHy: "Բարեհամբույր բարևում եմ և անհրաժեշտության դեպքում նորից հարցնում նրա անունը։"
      },
      {
        key: 'C',
        textEs: "Empiezo a llamarla «señor misterioso» durante toda la conversación.",
        textHy: "Ամբողջ զրույցի ընթացքում սկսում եմ նրան անվանել «պարոն խորհրդավոր»։"
      },
      {
        key: 'D',
        textEs: "Finjo que estoy hablando por teléfono y camino en dirección contraria.",
        textHy: "Ձևացնում եմ, թե հեռախոսով եմ խոսում, և քայլում եմ հակառակ ուղղությամբ։"
      }
    ],
    correct: 'B',
    moneyReward: PRIZE_LADDER[9]
  },

  // --- PARTE 2 ---
  {
    id: 11,
    part: 2,
    partTitleEs: "Parte 2. Viajes y aventuras",
    partTitleHy: "Մաս 2. Ճանապարհորդություններ և արկածներ",
    questionEs: "Llegas al aeropuerto y descubres que tu vuelo se ha retrasado cuatro horas. ¿Qué es lo más razonable?",
    questionHy: "Հասնում ես օդանավակայան և պարզում, որ չվերթդ չորս ժամով ուշացել է։ Ո՞րն է ամենախելամիտ քայլը։",
    options: [
      {
        key: 'A',
        textEs: "Empiezo a correr por el aeropuerto para que el avión salga antes.",
        textHy: "Սկսում եմ վազել օդանավակայանով, որպեսզի ինքնաթիռն ավելի շուտ մեկնի։"
      },
      {
        key: 'B',
        textEs: "Le pregunto al piloto si puedo conducir el avión personalmente.",
        textHy: "Օդաչուին հարցնում եմ՝ կարո՞ղ եմ անձամբ վարել ինքնաթիռը։"
      },
      {
        key: 'C',
        textEs: "Consulto la información del vuelo y busco un lugar cómodo para esperar.",
        textHy: "Ստուգում եմ չվերթի տեղեկությունները և հարմար տեղ փնտրում սպասելու համար։"
      },
      {
        key: 'D',
        textEs: "Compro una bicicleta y decido viajar hasta España por mi cuenta.",
        textHy: "Հեծանիվ եմ գնում և որոշում ինքնուրույն հասնել Իսպանիա։"
      }
    ],
    correct: 'C',
    moneyReward: PRIZE_LADDER[10]
  },
  {
    id: 12,
    part: 2,
    partTitleEs: "Parte 2. Viajes y aventuras",
    partTitleHy: "Մաս 2. Ճանապարհորդություններ և արկածներ",
    questionEs: "Estás de vacaciones en Madrid y te das cuenta de que has tomado el metro en dirección equivocada. ¿Qué haces?",
    questionHy: "Արձակուրդում ես Մադրիդում և հասկանում ես, որ մետրոյով սխալ ուղղությամբ ես գնացել։ Ի՞նչ ես անում։",
    options: [
      {
        key: 'A',
        textEs: "Continúo hasta el final porque quizás encuentre un tesoro secreto.",
        textHy: "Շարունակում եմ մինչև վերջ, որովհետև գուցե գաղտնի գանձ գտնեմ։"
      },
      {
        key: 'B',
        textEs: "Le pregunto al conductor si puede llevarme directamente a mi hotel.",
        textHy: "Վարորդին հարցնում եմ՝ կարո՞ղ է ինձ անմիջապես հյուրանոց տանել։"
      },
      {
        key: 'C',
        textEs: "Decido vivir para siempre en la última estación.",
        textHy: "Որոշում եմ ընդմիշտ ապրել վերջին կայարանում։"
      },
      {
        key: 'D',
        textEs: "Me bajo en una estación adecuada y busco la línea correcta.",
        textHy: "Իջնում եմ հարմար կայարանում և գտնում ճիշտ գիծը։"
      }
    ],
    correct: 'D',
    moneyReward: PRIZE_LADDER[11]
  },
  {
    id: 13,
    part: 2,
    partTitleEs: "Parte 2. Viajes y aventuras",
    partTitleHy: "Մաս 2. Ճանապարհորդություններ և արկածներ",
    questionEs: "Durante un viaje conoces a alguien que habla español y quiere practicar contigo. ¿Qué sería una buena idea?",
    questionHy: "Ճանապարհորդության ընթացքում ծանոթանում ես մեկի հետ, ով խոսում է իսպաներեն և ուզում է քեզ հետ պարապել։ Ի՞նչը լավ գաղափար կլինի։",
    options: [
      {
        key: 'A',
        textEs: "Aprovechar la oportunidad para conversar y aprender expresiones nuevas.",
        textHy: "Օգտվել հնարավորությունից՝ զրուցելու և նոր արտահայտություններ սովորելու համար։"
      },
      {
        key: 'B',
        textEs: "Decirle que solamente hablo español los miércoles a las ocho.",
        textHy: "Ասել, որ իսպաներեն խոսում եմ միայն չորեքշաբթի օրերին՝ ժամը ութին։"
      },
      {
        key: 'C',
        textEs: "Responder a todas sus preguntas cantando canciones inventadas.",
        textHy: "Նրա բոլոր հարցերին պատասխանել հորինված երգեր երգելով։"
      },
      {
        key: 'D',
        textEs: "Explicarle que mi español está de vacaciones y no quiere trabajar.",
        textHy: "Բացատրել, որ իմ իսպաներենն արձակուրդում է և չի ուզում աշխատել։"
      }
    ],
    correct: 'A',
    moneyReward: PRIZE_LADDER[12]
  },
  {
    id: 14,
    part: 2,
    partTitleEs: "Parte 2. Viajes y aventuras",
    partTitleHy: "Մաս 2. Ճանապարհորդություններ և արկածներ",
    questionEs: "Llegas a un hotel, pero la habitación que te han dado no tiene la vista al mar que habías reservado. ¿Qué dices?",
    questionHy: "Հասնում ես հյուրանոց, բայց քեզ տրված սենյակը չունի ծովի տեսարան, որը դու ամրագրել էիր։ Ի՞նչ ես ասում։",
    options: [
      {
        key: 'A',
        textEs: "Me parece perfecto, porque siempre he soñado con mirar un aparcamiento.",
        textHy: "Հիանալի է, որովհետև միշտ երազել եմ ավտոկայանատեղի նայել։"
      },
      {
        key: 'B',
        textEs: "Disculpe, reservé una habitación con vistas al mar. ¿Podrían comprobar mi reserva?",
        textHy: "Կներեք, ես ամրագրել եմ ծովի տեսարանով սենյակ։ Կարո՞ղ եք ստուգել իմ ամրագրումը։"
      },
      {
        key: 'C',
        textEs: "Voy a pintar un mar enorme en la pared para solucionar el problema.",
        textHy: "Պատին հսկայական ծով կնկարեմ՝ խնդիրը լուծելու համար։"
      },
      {
        key: 'D',
        textEs: "Le pido al recepcionista que traslade el mar delante de mi ventana.",
        textHy: "Ադմինիստրատորին խնդրում եմ ծովը տեղափոխել իմ պատուհանի դիմաց։"
      }
    ],
    correct: 'B',
    moneyReward: PRIZE_LADDER[13]
  },
  {
    id: 15,
    part: 2,
    partTitleEs: "Parte 2. Viajes y aventuras",
    partTitleHy: "Մաս 2. Ճանապարհորդություններ և արկածներ",
    questionEs: "Estás visitando un museo y un turista te pregunta cómo llegar a la estación, pero tú tampoco conoces el camino. ¿Qué respondes?",
    questionHy: "Թանգարան ես այցելում, և զբոսաշրջիկը հարցնում է՝ ինչպես հասնել կայարան, բայց դու նույնպես ճանապարհը չգիտես։ Ի՞նչ ես պատասխանում։",
    options: [
      {
        key: 'A',
        textEs: "Le doy unas instrucciones inventadas para parecer una persona inteligente.",
        textHy: "Հորինված ուղղություններ եմ տալիս, որպեսզի խելացի մարդ երևամ։"
      },
      {
        key: 'B',
        textEs: "Le digo que siga a cualquier gato porque los gatos conocen la ciudad.",
        textHy: "Ասում եմ՝ թող հետևի ցանկացած կատվի, որովհետև կատուները ճանաչում են քաղաքը։"
      },
      {
        key: 'C',
        textEs: "Le explico que no conozco la zona y le sugiero consultar un mapa.",
        textHy: "Բացատրում եմ, որ տարածքը չգիտեմ, և առաջարկում եմ քարտեզով ստուգել։"
      },
      {
        key: 'D',
        textEs: "Le digo que la estación probablemente está detrás de la Luna.",
        textHy: "Ասում եմ, որ կայարանը հավանաբար Լուսնի հետևում է։"
      }
    ],
    correct: 'C',
    moneyReward: PRIZE_LADDER[14]
  },
  {
    id: 16,
    part: 2,
    partTitleEs: "Parte 2. Viajes y aventuras",
    partTitleHy: "Մաս 2. Ճանապարհորդություններ և արկածներ",
    questionEs: "Viajas con un amigo que quiere sacar fotografías de absolutamente todo, incluso de los semáforos. ¿Qué le dices?",
    questionHy: "Ճանապարհորդում ես ընկերոջ հետ, որը ցանկանում է լուսանկարել բացարձակապես ամեն ինչ, նույնիսկ լուսացույցները։ Ի՞նչ ես ասում նրան։",
    options: [
      {
        key: 'A',
        textEs: "¿Quieres que organicemos una exposición internacional de semáforos?",
        textHy: "Ուզո՞ւմ ես կազմակերպենք լուսացույցների միջազգային ցուցահանդես։"
      },
      {
        key: 'B',
        textEs: "Creo que deberíamos comprar otra maleta exclusivamente para las fotos.",
        textHy: "Կարծում եմ՝ պետք է ևս մեկ ճամպրուկ գնենք՝ միայն լուսանկարների համար։"
      },
      {
        key: 'C',
        textEs: "¿Podemos quedarnos aquí toda la semana para fotografiar este árbol?",
        textHy: "Կարո՞ղ ենք ամբողջ շաբաթ այստեղ մնալ՝ այս ծառը լուսանկարելու համար։"
      },
      {
        key: 'D',
        textEs: "Las fotos están muy bien, pero también deberíamos disfrutar del viaje sin mirar siempre la cámara.",
        textHy: "Լուսանկարները շատ լավ են, բայց պետք է նաև վայելենք ճանապարհորդությունը՝ առանց անընդհատ տեսախցիկին նայելու։"
      }
    ],
    correct: 'D',
    moneyReward: PRIZE_LADDER[15]
  },
  {
    id: 17,
    part: 2,
    partTitleEs: "Parte 2. Viajes y aventuras",
    partTitleHy: "Մաս 2. Ճանապարհորդություններ և արկածներ",
    questionEs: "Has reservado una excursión a la montaña, pero por la mañana empieza a llover muy fuerte. ¿Qué haces?",
    questionHy: "Դեպի լեռներ էքսկուրսիա ես ամրագրել, բայց առավոտյան սկսվում է շատ ուժեղ անձրև։ Ի՞նչ ես անում։",
    options: [
      {
        key: 'A',
        textEs: "Consulto el pronóstico y pregunto a los organizadores si la excursión es segura.",
        textHy: "Ստուգում եմ եղանակի կանխատեսումը և կազմակերպիչներին հարցնում՝ արդյոք էքսկուրսիան անվտանգ է։"
      },
      {
        key: 'B',
        textEs: "Salgo con un paraguas de papel y espero que no se moje.",
        textHy: "Դուրս եմ գալիս թղթե հովանոցով և հույս ունեմ, որ այն չի թրջվի։"
      },
      {
        key: 'C',
        textEs: "Intento convencer a las nubes de que se vayan de vacaciones.",
        textHy: "Փորձում եմ ամպերին համոզել արձակուրդ գնալ։"
      },
      {
        key: 'D',
        textEs: "Llevo un secador de pelo para secar toda la montaña.",
        textHy: "Վերցնում եմ վարսահարդարիչ՝ ամբողջ լեռը չորացնելու համար։"
      }
    ],
    correct: 'A',
    moneyReward: PRIZE_LADDER[16]
  },
  {
    id: 18,
    part: 2,
    partTitleEs: "Parte 2. Viajes y aventuras",
    partTitleHy: "Մաս 2. Ճանապարհորդություններ և արկածներ",
    questionEs: "Estás en una ciudad desconocida y tu teléfono se queda sin batería. Necesitas volver al hotel. ¿Qué puedes hacer?",
    questionHy: "Անծանոթ քաղաքում ես, հեռախոսիդ մարտկոցը լիցքաթափվում է, և պետք է վերադառնաս հյուրանոց։ Ի՞նչ կարող ես անել։",
    options: [
      {
        key: 'A',
        textEs: "Preguntarle a una estatua si conoce el camino más corto.",
        textHy: "Արձանին հարցնել՝ գիտի՞ ամենակարճ ճանապարհը։"
      },
      {
        key: 'B',
        textEs: "Pedir indicaciones a alguien o buscar un mapa de la ciudad.",
        textHy: "Ինչ-որ մեկից ուղղություն հարցնել կամ քաղաքի քարտեզ գտնել։"
      },
      {
        key: 'C',
        textEs: "Esperar a que el hotel venga a buscarme caminando.",
        textHy: "Սպասել, մինչև հյուրանոցը ոտքով գա ինձ փնտրելու։"
      },
      {
        key: 'D',
        textEs: "Elegir una dirección al azar y caminar hasta encontrar otro país.",
        textHy: "Պատահական ուղղություն ընտրել և քայլել, մինչև մեկ այլ երկիր գտնեմ։"
      }
    ],
    correct: 'B',
    moneyReward: PRIZE_LADDER[17]
  },
  {
    id: 19,
    part: 2,
    partTitleEs: "Parte 2. Viajes y aventuras",
    partTitleHy: "Մաս 2. Ճանապարհորդություններ և արկածներ",
    questionEs: "En un restaurante español quieres pedir un plato típico, pero no entiendes los ingredientes del menú. ¿Qué haces?",
    questionHy: "Իսպանական ռեստորանում ուզում ես պատվիրել ավանդական ուտեստ, բայց չես հասկանում ճաշացանկի բաղադրիչները։ Ի՞նչ ես անում։",
    options: [
      {
        key: 'A',
        textEs: "Pido todos los platos para descubrir cuál era el correcto.",
        textHy: "Պատվիրում եմ բոլոր ուտեստները՝ պարզելու համար, թե որն էր ճիշտը։"
      },
      {
        key: 'B',
        textEs: "Le pregunto al camarero si la comida puede explicarse por sí misma.",
        textHy: "Մատուցողին հարցնում եմ՝ կարո՞ղ է ուտելիքն ինքն իրեն բացատրել։"
      },
      {
        key: 'C',
        textEs: "Le pido al camarero que me explique los ingredientes y me recomiende algo.",
        textHy: "Խնդրում եմ մատուցողին բացատրել բաղադրիչները և ինչ-որ բան խորհուրդ տալ։"
      },
      {
        key: 'D',
        textEs: "Cierro los ojos, señalo una palabra y espero una sorpresa.",
        textHy: "Փակում եմ աչքերս, մատով ցույց եմ տալիս մի բառ և սպասում անակնկալի։"
      }
    ],
    correct: 'C',
    moneyReward: PRIZE_LADDER[18]
  },
  {
    id: 20,
    part: 2,
    partTitleEs: "Parte 2. Viajes y aventuras",
    partTitleHy: "Մաս 2. Ճանապարհորդություններ և արկածներ",
    questionEs: "Estás en la playa y tu amigo insiste en jugar al fútbol, aunque tú prefieres descansar. ¿Qué le propones?",
    questionHy: "Լողափում ես, և ընկերդ պնդում է ֆուտբոլ խաղալ, թեև դու նախընտրում ես հանգստանալ։ Ի՞նչ ես առաջարկում։",
    options: [
      {
        key: 'A',
        textEs: "Le digo que el balón necesita vacaciones y no puede jugar hoy.",
        textHy: "Ասում եմ, որ գնդակը արձակուրդի կարիք ունի և այսօր չի կարող խաղալ։"
      },
      {
        key: 'B',
        textEs: "Le propongo jugar un partido de fútbol imaginario sin levantarnos.",
        textHy: "Առաջարկում եմ երևակայական ֆուտբոլ խաղալ՝ առանց տեղից վեր կենալու։"
      },
      {
        key: 'C',
        textEs: "Le digo que primero tenemos que pedir permiso a todos los peces.",
        textHy: "Ասում եմ, որ նախ պետք է թույլտվություն խնդրենք բոլոր ձկներից։"
      },
      {
        key: 'D',
        textEs: "Le propongo descansar un rato y jugar juntos un poco más tarde.",
        textHy: "Առաջարկում եմ մի քիչ հանգստանալ, հետո միասին խաղալ։"
      }
    ],
    correct: 'D',
    moneyReward: PRIZE_LADDER[19]
  },

  // --- PARTE 3 ---
  {
    id: 21,
    part: 3,
    partTitleEs: "Parte 3. Amigos, familia y situaciones divertidas",
    partTitleHy: "Մաս 3. Ընկերներ, ընտանիք և զվարճալի իրավիճակներ",
    questionEs: "Tu mejor amigo decide aprender a cocinar, pero su primer plato está completamente quemado. ¿Qué le dices?",
    questionHy: "Լավագույն ընկերդ որոշում է սովորել պատրաստել, բայց նրա առաջին ուտեստն ամբողջությամբ այրվել է։ Ի՞նչ ես ասում նրան։",
    options: [
      {
        key: 'A',
        textEs: "No pasa nada, todos cometemos errores. La próxima vez podemos cocinar juntos.",
        textHy: "Ոչինչ, բոլորս էլ սխալներ ենք թույլ տալիս։ Հաջորդ անգամ կարող ենք միասին պատրաստել։"
      },
      {
        key: 'B',
        textEs: "¡Felicidades! Has inventado una nueva variedad de carbón comestible.",
        textHy: "Շնորհավորում եմ։ Դու հորինել ես ուտելի ածուխի նոր տեսակ։"
      },
      {
        key: 'C',
        textEs: "Creo que deberíamos llamar a un museo para conservar esta obra de arte.",
        textHy: "Կարծում եմ՝ պետք է թանգարան զանգենք՝ արվեստի այս գործը պահպանելու համար։"
      },
      {
        key: 'D',
        textEs: "No vuelvas a tocar una sartén hasta que cumplas cien años.",
        textHy: "Այլևս թավային ձեռք չտաս, մինչև հարյուր տարեկան չդառնաս։"
      }
    ],
    correct: 'A',
    moneyReward: PRIZE_LADDER[20]
  },
  {
    id: 22,
    part: 3,
    partTitleEs: "Parte 3. Amigos, familia y situaciones divertidas",
    partTitleHy: "Մաս 3. Ընկերներ, ընտանիք և զվարճալի իրավիճակներ",
    questionEs: "Tu hermano lleva dos horas buscando sus gafas, pero las tiene puestas en la cabeza. ¿Qué le dices?",
    questionHy: "Եղբայրդ արդեն երկու ժամ է՝ ակնոցն է փնտրում, բայց այն իր գլխին է։ Ի՞նչ ես ասում նրան։",
    options: [
      {
        key: 'A',
        textEs: "Quizás las gafas se han ido de vacaciones sin avisarte.",
        textHy: "Գուցե ակնոցն առանց քեզ զգուշացնելու արձակուրդ է գնացել։"
      },
      {
        key: 'B',
        textEs: "Mira encima de tu cabeza. Creo que tus gafas llevan dos horas buscándote a ti.",
        textHy: "Նայի՛ր գլխիդ վրա։ Կարծում եմ՝ ակնոցդ արդեն երկու ժամ է՝ ինքն է քեզ փնտրում։"
      },
      {
        key: 'C',
        textEs: "Vamos a comprar otras gafas para poder encontrar las primeras.",
        textHy: "Գնանք ուրիշ ակնոց գնենք, որպեսզի կարողանանք գտնել առաջինը։"
      },
      {
        key: 'D',
        textEs: "Deberíamos llamar a la policía porque este caso es muy misterioso.",
        textHy: "Պետք է ոստիկանություն զանգենք, որովհետև այս դեպքը շատ խորհրդավոր է։"
      }
    ],
    correct: 'B',
    moneyReward: PRIZE_LADDER[21]
  },
  {
    id: 23,
    part: 3,
    partTitleEs: "Parte 3. Amigos, familia y situaciones divertidas",
    partTitleHy: "Մաս 3. Ընկերներ, ընտանիք և զվարճալի իրավիճակներ",
    questionEs: "Tu profesor te pregunta por qué no has hecho los deberes y quieres responder de manera sincera. ¿Qué dices?",
    questionHy: "Ուսուցիչդ հարցնում է՝ ինչու չես կատարել տնային առաջադրանքը, և դու ուզում ես անկեղծ պատասխանել։ Ի՞նչ ես ասում։",
    options: [
      {
        key: 'A',
        textEs: "Mi cuaderno se enamoró de otro cuaderno y se escaparon juntos.",
        textHy: "Իմ տետրը սիրահարվել է ուրիշ տետրի, և նրանք միասին փախել են։"
      },
      {
        key: 'B',
        textEs: "Un extraterrestre vino a casa y se llevó todos mis ejercicios.",
        textHy: "Այլմոլորակայինը եկավ տուն և տարավ իմ բոլոր վարժությունները։"
      },
      {
        key: 'C',
        textEs: "Lo siento, no organicé bien mi tiempo y no pude terminarlos.",
        textHy: "Կներեք, ժամանակս լավ չկազմակերպեցի և չկարողացա ավարտել դրանք։"
      },
      {
        key: 'D',
        textEs: "Pensé que hoy era domingo y que los profesores también estaban de vacaciones.",
        textHy: "Կարծում էի՝ այսօր կիրակի է, և ուսուցիչները նույնպես արձակուրդում են։"
      }
    ],
    correct: 'C',
    moneyReward: PRIZE_LADDER[22]
  },
  {
    id: 24,
    part: 3,
    partTitleEs: "Parte 3. Amigos, familia y situaciones divertidas",
    partTitleHy: "Մաս 3. Ընկերներ, ընտանիք և զվարճալի իրավիճակներ",
    questionEs: "Un amigo te invita a jugar al fútbol, pero te das cuenta de que has olvidado las zapatillas deportivas. ¿Qué haces?",
    questionHy: "Ընկերդ քեզ հրավիրում է ֆուտբոլ խաղալու, բայց հասկանում ես, որ մոռացել ես մարզակոշիկներդ։ Ի՞նչ ես անում։",
    options: [
      {
        key: 'A',
        textEs: "Intento convencer al entrenador de que jugar con zapatillas invisibles es mejor.",
        textHy: "Փորձում եմ մարզչին համոզել, որ անտեսանելի մարզակոշիկներով խաղալն ավելի լավ է։"
      },
      {
        key: 'B',
        textEs: "Les pregunto a los jugadores si puedo jugar montado en una bicicleta.",
        textHy: "Խաղացողներին հարցնում եմ՝ կարո՞ղ եմ խաղալ հեծանիվի վրա նստած։"
      },
      {
        key: 'C',
        textEs: "Le digo al balón que hoy tendrá que correr sin mí.",
        textHy: "Գնդակին ասում եմ, որ այսօր ստիպված կլինի առանց ինձ վազել։"
      },
      {
        key: 'D',
        textEs: "Pregunto si alguien tiene unas zapatillas de repuesto de mi talla.",
        textHy: "Հարցնում եմ՝ արդյոք որևէ մեկն ունի իմ չափսի պահեստային մարզակոշիկներ։"
      }
    ],
    correct: 'D',
    moneyReward: PRIZE_LADDER[23]
  },
  {
    id: 25,
    part: 3,
    partTitleEs: "Parte 3. Amigos, familia y situaciones divertidas",
    partTitleHy: "Մաս 3. Ընկերներ, ընտանիք և զվարճալի իրավիճակներ",
    questionEs: "Estás viendo una película con tus amigos y uno de ellos cuenta todo lo que va a suceder. ¿Qué le dices?",
    questionHy: "Ընկերներիդ հետ ֆիլմ ես դիտում, և նրանցից մեկը պատմում է այն ամենը, ինչ հետո տեղի է ունենալու։ Ի՞նչ ես ասում նրան։",
    options: [
      {
        key: 'A',
        textEs: "¡No nos cuentes el final! Queremos descubrirlo mientras vemos la película.",
        textHy: "Մի՛ պատմիր ավարտը։ Մենք ուզում ենք ինքներս բացահայտել այն ֆիլմը դիտելիս։"
      },
      {
        key: 'B',
        textEs: "¿Puedes contar también el final de todas las películas del próximo año?",
        textHy: "Կարո՞ղ ես պատմել նաև հաջորդ տարվա բոլոր ֆիլմերի ավարտները։"
      },
      {
        key: 'C',
        textEs: "Gracias, ahora podemos apagar la televisión e irnos a dormir.",
        textHy: "Շնորհակալություն, հիմա կարող ենք անջատել հեռուստացույցը և քնել։"
      },
      {
        key: 'D',
        textEs: "Deberías trabajar como una máquina profesional de contar finales.",
        textHy: "Դու պետք է աշխատես որպես ֆիլմերի ավարտներ պատմող պրոֆեսիոնալ մեքենա։"
      }
    ],
    correct: 'A',
    moneyReward: PRIZE_LADDER[24]
  },
  {
    id: 26,
    part: 3,
    partTitleEs: "Parte 3. Amigos, familia y situaciones divertidas",
    partTitleHy: "Մաս 3. Ընկերներ, ընտանիք և զվարճալի իրավիճակներ",
    questionEs: "Tu amigo quiere aprender español en una semana y hablar perfectamente como un presentador de televisión. ¿Qué le aconsejas?",
    questionHy: "Ընկերդ ուզում է մեկ շաբաթում իսպաներեն սովորել և կատարյալ խոսել՝ ինչպես հեռուստահաղորդավարը։ Ի՞նչ խորհուրդ ես տալիս նրան։",
    options: [
      {
        key: 'A',
        textEs: "Duerme con un diccionario debajo de la almohada y mañana serás bilingüe.",
        textHy: "Քնիր բառարանը բարձիդ տակ դրած, և վաղը երկլեզու կլինես։"
      },
      {
        key: 'B',
        textEs: "Practica todos los días, escucha conversaciones y ten paciencia con tu progreso.",
        textHy: "Ամեն օր պարապիր, լսիր խոսակցություններ և համբերատար եղիր առաջընթացիդ նկատմամբ։"
      },
      {
        key: 'C',
        textEs: "Compra cien libros y míralos fijamente hasta que aprendas todas las palabras.",
        textHy: "Գնիր հարյուր գիրք և ուշադիր նայիր դրանց, մինչև բոլոր բառերը սովորես։"
      },
      {
        key: 'D',
        textEs: "Habla solamente con los gatos porque nunca corrigen tus errores.",
        textHy: "Խոսիր միայն կատուների հետ, որովհետև նրանք երբեք չեն ուղղում սխալներդ։"
      }
    ],
    correct: 'B',
    moneyReward: PRIZE_LADDER[25]
  },
  {
    id: 27,
    part: 3,
    partTitleEs: "Parte 3. Amigos, familia y situaciones divertidas",
    partTitleHy: "Մաս 3. Ընկերներ, ընտանիք և զվարճալի իրավիճակներ",
    questionEs: "Tu madre te pide que limpies tu habitación, pero encuentras cosas que llevabas años sin ver. ¿Qué haces?",
    questionHy: "Մայրդ խնդրում է մաքրել սենյակդ, բայց դու գտնում ես իրեր, որոնք տարիներ շարունակ չէիր տեսել։ Ի՞նչ ես անում։",
    options: [
      {
        key: 'A',
        textEs: "Abro un museo en mi habitación y empiezo a vender entradas.",
        textHy: "Իմ սենյակում թանգարան եմ բացում և սկսում տոմսեր վաճառել։"
      },
      {
        key: 'B',
        textEs: "Declaro que mi habitación es una zona arqueológica protegida.",
        textHy: "Հայտարարում եմ, որ իմ սենյակը պահպանվող հնագիտական տարածք է։"
      },
      {
        key: 'C',
        textEs: "Organizo las cosas, guardo lo que necesito y tiro lo que ya no sirve.",
        textHy: "Դասավորում եմ իրերը, պահում այն, ինչ պետք է, և դեն նետում անպետքները։"
      },
      {
        key: 'D',
        textEs: "Llamo a unos científicos para investigar todos los objetos misteriosos.",
        textHy: "Զանգում եմ գիտնականներին՝ բոլոր խորհրդավոր իրերը ուսումնասիրելու համար։"
      }
    ],
    correct: 'C',
    moneyReward: PRIZE_LADDER[26]
  },
  {
    id: 28,
    part: 3,
    partTitleEs: "Parte 3. Amigos, familia y situaciones divertidas",
    partTitleHy: "Մաս 3. Ընկերներ, ընտանիք և զվարճալի իրավիճակներ",
    questionEs: "Estás jugando un partido de fútbol y tu compañero falla un penalti muy importante. ¿Cómo reaccionas?",
    questionHy: "Դու ֆուտբոլային հանդիպում ես խաղում, և թիմակիցդ վրիպում է շատ կարևոր 11-մետրանոց հարվածը կատարելիս։ Ինչպե՞ս ես արձագանքում։",
    options: [
      {
        key: 'A',
        textEs: "Le digo que el balón probablemente estaba enfadado con él.",
        textHy: "Ասում եմ, որ գնդակը հավանաբար նրա վրա բարկացած էր։"
      },
      {
        key: 'B',
        textEs: "Le propongo cambiar el balón por una sandía más fácil de controlar.",
        textHy: "Առաջարկում եմ գնդակը փոխել ձմերուկով, որն ավելի հեշտ կլինի կառավարել։"
      },
      {
        key: 'C',
        textEs: "Le explico que ahora tendrá que marcar cien goles para pedir perdón.",
        textHy: "Բացատրում եմ, որ հիմա պետք է հարյուր գոլ խփի՝ ներողություն խնդրելու համար։"
      },
      {
        key: 'D',
        textEs: "Le animo y le digo que todos podemos fallar, incluso los mejores jugadores.",
        textHy: "Քաջալերում եմ և ասում, որ բոլորս կարող ենք վրիպել, նույնիսկ լավագույն խաղացողները։"
      }
    ],
    correct: 'D',
    moneyReward: PRIZE_LADDER[27]
  },
  {
    id: 29,
    part: 3,
    partTitleEs: "Parte 3. Amigos, familia y situaciones divertidas",
    partTitleHy: "Մաս 3. Ընկերներ, ընտանիք և զվարճալի իրավիճակներ",
    questionEs: "Te ofrecen participar en un concurso de preguntas y sabes responder casi todo, pero te pones muy nervioso. ¿Qué haces?",
    questionHy: "Քեզ առաջարկում են մասնակցել հարցուպատասխանի մրցույթի, և դու գրեթե ամեն ինչ գիտես, բայց շատ ես հուզվում։ Ի՞նչ ես անում։",
    options: [
      {
        key: 'A',
        textEs: "Respiro profundamente, escucho bien cada pregunta e intento responder con calma.",
        textHy: "Խորը շնչում եմ, ուշադիր լսում յուրաքանչյուր հարցը և փորձում հանգիստ պատասխանել։"
      },
      {
        key: 'B',
        textEs: "Les pido a los organizadores que cambien todas las preguntas por nombres de frutas.",
        textHy: "Կազմակերպիչներին խնդրում եմ բոլոր հարցերը փոխարինել մրգերի անուններով։"
      },
      {
        key: 'C',
        textEs: "Contesto «Real Madrid» a todas las preguntas porque es mi respuesta favorita.",
        textHy: "Բոլոր հարցերին պատասխանում եմ «Ռեալ Մադրիդ», որովհետև դա իմ սիրելի պատասխանն է։"
      },
      {
        key: 'D',
        textEs: "Finjo que soy un robot que todavía está descargando sus conocimientos.",
        textHy: "Ձևացնում եմ, թե ռոբոտ եմ, որը դեռ ներբեռնում է իր գիտելիքները։"
      }
    ],
    correct: 'A',
    moneyReward: PRIZE_LADDER[28]
  },
  {
    id: 30,
    part: 3,
    partTitleEs: "Parte 3. Amigos, familia y situaciones divertidas",
    partTitleHy: "Մաս 3. Ընկերներ, ընտանիք և զվարճալի իրավիճակներ",
    questionEs: "Un día te despiertas y descubres que puedes hablar perfectamente diez idiomas diferentes. ¿Qué harías primero?",
    questionHy: "Մի օր արթնանում ես և պարզում, որ կարողանում ես կատարելապես խոսել տասը տարբեր լեզուներով։ Ի՞նչ կանեիր առաջինը։",
    options: [
      {
        key: 'A',
        textEs: "Discutiría con mi despertador en diez idiomas para que me dejara dormir.",
        textHy: "Տասը լեզվով կվիճեի զարթուցիչիս հետ, որպեսզի թույլ տար քնել։"
      },
      {
        key: 'B',
        textEs: "Llamaría a mis amigos extranjeros para sorprenderlos hablando en sus idiomas.",
        textHy: "Կզանգեի օտարերկրացի ընկերներիս՝ զարմացնելու նրանց իրենց լեզուներով խոսելով։"
      },
      {
        key: 'C',
        textEs: "Intentaría enseñarle gramática española a mi perro durante todo el día.",
        textHy: "Ամբողջ օրը կփորձեի իմ շանը իսպաներենի քերականություն սովորեցնել։"
      },
      {
        key: 'D',
        textEs: "Escribiría una carta al universo para pedir otros veinte idiomas.",
        textHy: "Նամակ կգրեի տիեզերքին՝ ևս քսան լեզու խնդրելու համար։"
      }
    ],
    correct: 'B',
    moneyReward: PRIZE_LADDER[29]
  }
];
