export type Procedure = {
  title: string;
  description: string;
};

export type Technology = {
  title: string;
  description: string;
  duration: string;
  protocol: string;
  benefits: string[];
  scope: string;
};

export const featuredTreatments = [
  { number: "01", title: "Lifting sem cirurgia", description: "Tecnologias de ultrassom e radiofrequência para estimular colágeno e devolver firmeza com naturalidade.", image: "/assets/procedure-uthera.png", tag: "Ultraformer · Uthera" },
  { number: "02", title: "Pele luminosa", description: "Protocolos para textura, manchas e viço, combinando laser, skincare e acompanhamento próximo.", image: "/assets/procedure-facial-cleaning.png", tag: "Lavieen · Limpeza de Pele" },
  { number: "03", title: "Contorno e definição", description: "Estratégias faciais e corporais para valorizar contornos, respeitando proporções e individualidade.", image: "/assets/procedure-bioestimulador.png", tag: "Bioestimuladores · Preenchedores" },
];

export const facialProcedures: Procedure[] = [
  { title: "Flacidez Facial", description: "Recupere a firmeza e o contorno do rosto com tecnologias de última geração, aplicadas por especialistas." },
  { title: "Linha Mandibular", description: "Defina o contorno do rosto e desenhe uma linha mandibular marcada com tecnologias avançadas. Resultado natural, sem cirurgia, com lifting e firmeza." },
  { title: "Tratamento para Acne", description: "Controle a acne ativa e elimine marcas e cicatrizes com protocolos personalizados. Pele renovada, lisa e saudável." },
  { title: "Preenchimento Facial", description: "Recupere volume, sustentação e harmonia do rosto com preenchedores de última geração e resultados naturais." },
  { title: "Manchas", description: "Trate melasma, manchas solares e marcas de acne com laser de alta precisão e protocolos personalizados." },
  { title: "Papada", description: "Defina o contorno do queixo e reduza a papada sem cirurgia, com indicação personalizada." },
  { title: "Bigode Chinês", description: "Suavize os sulcos nasogenianos e devolva a harmonia ao rosto com resultados naturais e sem cirurgia." },
  { title: "Rugas e Linhas de Expressão", description: "Suavize rugas e marcas do tempo com tecnologias de última geração para uma pele firme e renovada." },
];

export const bodyProcedures: Procedure[] = [
  { title: "Secagem de Vasinhos", description: "Elimine vasinhos das pernas com escleroterapia aplicada por especialistas para pernas mais uniformes." },
  { title: "Massagens", description: "Relaxe corpo e mente com drenagem, modeladora, relaxante e técnicas orientais em um ambiente acolhedor." },
  { title: "Glúteos", description: "Modele, levante e dê firmeza aos glúteos sem cirurgia, combinando hipertrofia, firmeza e contorno." },
  { title: "Celulite", description: "Reduza furinhos e ondulações da pele com protocolos avançados que combinam subcisão, ondas de choque e bioestimuladores." },
  { title: "Estrias", description: "Atenue estrias vermelhas e brancas com tecnologias de renovação celular e recuperação da textura da pele." },
  { title: "Gordura Localizada", description: "Tratamentos não invasivos para abdômen, flancos, coxas, braços, costas e glúteos." },
  { title: "Flacidez", description: "Tratamentos não invasivos para a flacidez do corpo com ultrassom, Uthera e bioestimuladores de colágeno." },
];

export const technologyCatalog: Technology[] = [
  { title: "Ultraformer MPT", description: "Efeito lifting para rosto e corpo, sem cirurgia e sem longos períodos de recuperação.", duration: "45 a 60 minutos no rosto", protocol: "2 a 4 sessões, conforme a avaliação", benefits: ["Versatilidade para rosto e corpo", "Até 500x mais colágeno", "Efeito lifting sem cirurgia"], scope: "Facial e corporal" },
  { title: "Endolaser", description: "Reduz flacidez, estimula colágeno e remodela contornos com precisão.", duration: "30 a 60 minutos", protocol: "1 sessão por área, com reavaliação em 90 dias", benefits: ["Redução da flacidez", "Estímulo de colágeno", "Definição de contorno", "Minimamente invasivo"], scope: "Facial e corporal" },
  { title: "Uthera", description: "Ultrassom focado que realiza lifting facial e corporal, estimulando o colágeno e melhorando a flacidez.", duration: "30 a 45 minutos", protocol: "1 a 2 sessões por ano", benefits: ["Lifting por ultrassom", "Estímulo de colágeno", "Aplicação confortável"], scope: "Facial e corporal" },
  { title: "Fotona 4D", description: "Laser europeu de rejuvenescimento profundo, sem cirurgia e sem tempo de recuperação.", duration: "45 a 60 minutos", protocol: "1 a 3 sessões, conforme a avaliação", benefits: ["Lifting natural sem cortes", "Estímulo intenso de colágeno", "Pele mais firme e luminosa", "Resultados progressivos"], scope: "Facial e corporal" },
  { title: "Hipro", description: "Reduz a flacidez e define o contorno facial de forma não invasiva.", duration: "45 a 60 minutos no full face", protocol: "1 sessão, com reforço anual", benefits: ["Sustentação da pele", "Redução da flacidez", "Definição do contorno", "Não invasivo"], scope: "Facial e corporal" },
  { title: "Harmonização Facial", description: "Preenchimento com ácido hialurônico que devolve volume, sustentação e harmonia ao rosto.", duration: "30 a 60 minutos", protocol: "1 sessão, com retoque opcional", benefits: ["Resultado imediato", "Totalmente reversível", "Resultado natural"], scope: "Facial" },
  { title: "Laser Lavieen", description: "Renovação da pele com mais viço, luminosidade e rejuvenescimento natural.", duration: "20 a 30 minutos", protocol: "3 a 5 sessões, conforme a avaliação", benefits: ["Renovação da pele", "Mais viço e luminosidade", "Rejuvenescimento natural"], scope: "Facial e corporal" },
  { title: "Bioestimulador Radiesse", description: "Devolve firmeza e melhora o contorno facial naturalmente por meio do estímulo de colágeno.", duration: "30 a 45 minutos", protocol: "1 a 2 aplicações, conforme a avaliação", benefits: ["Estímulo de colágeno", "Mais firmeza", "Contorno facial natural"], scope: "Facial e corporal" },
  { title: "Laser CO2", description: "Renova a pele, suaviza manchas e melhora a textura.", duration: "30 a 45 minutos", protocol: "3 a 5 sessões, conforme a avaliação", benefits: ["Renovação da pele", "Suavização de manchas", "Melhora da textura"], scope: "Facial e corporal" },
  { title: "Drenagem Linfática", description: "Massagem suave que estimula o sistema linfático, reduzindo inchaços e melhorando a circulação.", duration: "50 a 60 minutos", protocol: "Pacote de 10 sessões", benefits: ["Redução do inchaço", "Sensação de leveza", "Melhora da circulação"], scope: "Corporal" },
  { title: "Massagem Modeladora", description: "Manobras firmes que mobilizam a gordura localizada e tonificam a pele.", duration: "50 a 60 minutos", protocol: "Pacote de 10 sessões", benefits: ["Contorno mais definido", "Pele mais tonificada", "Complementa as tecnologias"], scope: "Corporal" },
  { title: "Massagem Relaxante", description: "Manobras leves e ritmadas que relaxam a musculatura e reduzem o estresse.", duration: "50 a 60 minutos", protocol: "Pacote de 10 sessões", benefits: ["Alívio da tensão muscular", "Redução do estresse", "Bem-estar"], scope: "Corporal" },
  { title: "Harmonização Glútea", description: "Protocolo com bioestimulador de colágeno e ácido hialurônico para volume, firmeza e contorno dos glúteos.", duration: "60 a 90 minutos", protocol: "55 ml, 110 ml ou 165 ml, definidos na avaliação", benefits: ["Volume e projeção", "Firmeza e sustentação", "Contorno mais definido", "Sem cirurgia"], scope: "Corporal" },
  { title: "CM Slim", description: "Estímulo eletromagnético que elimina gordura e define a musculatura: mais de 20 mil contrações em 30 minutos.", duration: "30 minutos por área", protocol: "10 sessões, 2 por semana", benefits: ["Queima de gordura", "Definição muscular", "Aumento de força", "Trata a flacidez"], scope: "Corporal" },
  { title: "Power Shape", description: "Combina radiofrequência, ultrassom e vacuoterapia para reduzir medidas e estimular colágeno.", duration: "30 a 60 minutos", protocol: "10 sessões, 1 a 2 por semana", benefits: ["Redução de medidas", "Melhora da circulação", "Estímulo de colágeno"], scope: "Corporal" },
  { title: "Scizer", description: "Ultrassom macrofocado MFSU que destrói gordura localizada em diferentes áreas, sem cortes.", duration: "20 a 40 minutos", protocol: "1 a 3 sessões por área, conforme a avaliação", benefits: ["Reduz gorduras localizadas", "Resultados desde a primeira sessão", "Modelamento natural", "Sem recuperação"], scope: "Corporal" },
  { title: "Ultraformer III", description: "Ultrassom micro e macrofocado para flacidez, rugas e gordura localizada no rosto, pescoço e corpo.", duration: "Cerca de 60 minutos", protocol: "2 a 4 sessões, conforme a avaliação", benefits: ["Não invasivo", "Rosto, pescoço e corpo", "Atua em flacidez, rugas e gordura"], scope: "Facial e corporal" },
  { title: "Enzimas", description: "Injeções que quebram células de gordura e ajudam a modelar o corpo de forma não invasiva.", duration: "20 a 30 minutos", protocol: "4 a 8 sessões, a cada 7 a 15 dias", benefits: ["Quebra de células de gordura", "Modelagem não invasiva", "Suavização da pele"], scope: "Corporal" },
];
