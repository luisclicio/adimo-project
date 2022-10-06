const fakeData = {
  carrouselImages: [
    { caption: '', url: '/images/articles/image-01.webp' },
    { caption: '', url: 'https://picsum.photos/id/243/1000/700' },
    { caption: '', url: 'https://picsum.photos/id/238/1000/700' },
    { caption: '', url: 'https://picsum.photos/id/239/1000/700' },
    { caption: '', url: 'https://picsum.photos/id/240/1000/700' },
  ],

  activities: [
    {
      title: 'Oficina de dança',
      schedule: 'Quartas-feiras, das 16h as 18h',
      image: 'https://picsum.photos/id/1004/1000/700',
    },
    {
      title: 'Esportes',
      schedule: 'Quartas-feiras, das 16h as 18h',
      image: 'https://picsum.photos/id/1011/1000/700',
    },
    {
      title: 'Teatro',
      schedule: 'Quartas-feiras, das 16h as 18h',
      image: 'https://picsum.photos/id/104/1000/700',
    },
    {
      title: 'Oficina de música',
      schedule: 'Quartas-feiras, das 16h as 18h',
      image: 'https://picsum.photos/id/1082/1000/700',
    },
  ],

  testimonials: [
    {
      author: {
        name: 'João Pedro',
        role: 'Ex-aluno e Voluntário',
        image: 'https://picsum.photos/id/1012/3973/2639',
      },
      content:
        'Desde criança acompanhei todos os eventos do Grupo Adimó, mas só quando completei 13 anos comecei a participar ativamente das gincanas e das atividades, entre elas: dança e teatro. A partir dessas dinâmicas consegui-me tornar uma pessoa mais criativa e comunicativa. Atualmente, sou estudante de contabilidade e voluntário do grupo, já ajudei no teatro e em outras oficinas. Hoje ainda faço parte do projeto, porém auxiliando com as redes sociais sociais (Instagram e Facebook).',
    },
    {
      author: {
        name: 'Amanda Costa',
        role: 'Ex-aluna',
        image: 'https://picsum.photos/id/1014/3973/2639',
      },
      content:
        'O Grupo Adimó foi um projeto mais do que essencial para o meu crescimento pessoal e profissional, trouxe oportunidades para a minha vida e abriu portas que eu nem sequer imaginava. Fazer parte desse projeto tão lindo e empático faz com que as pessoas tenham esperança em um futuro melhor, ainda mais nos dias atuais, onde vemos a desigualdade social atingindo a população, principalmente a de bairros mais carentes.',
    },
    {
      author: {
        name: 'Leonardo Gonçalves',
        role: 'Ex-aluno',
        image: 'https://picsum.photos/id/1/3973/2639',
      },
      content:
        'Adentrei no projeto na minha adolescência e fui apresentado a um mundo novo, através das pessoas que conheci e as oficinas. Fiz parte de quase todas as atividades que disponibilizavam. Além disso, foi lá onde tive meu primeiro contato com violão e hoje faço parte da banda da igreja que frequento. Estou concluindo o curso de direto na Universidade Estadual do Piauí. Sou muito grato ao que o projeto Adimó fez por mim.',
    },
  ],

  events: [
    {
      slug: 'oficinas-de-teatro',
      title: 'Oficinas de teatro',
      local: 'UFPI - Picos',
      image: '/images/events/image-01.webp',
      date: '2022-06-28T10:00:00',
    },
    {
      slug: '1-festival-de-danca-de-picos',
      title: '1º Festival de dança de Picos',
      local: 'Picos Plaza Shopping',
      image: '/images/events/image-02.webp',
      date: '2018-07-21T19:00:00',
    },
  ],

  articles: [
    {
      title:
        'Oficina de Palhaçaria, ministrada pelo artista Francisco Cavalcante',
      description:
        'O Grupo Cultural Adimó realizou mais uma de suas atividades para a comunidade picoense. Nesta, foi ofertada uma oficina de Palhaçaria, ministrada pelo artista Francisco Cavalcante.',
      slug: 'oficina-de-palhacaria',
      image: '/images/articles/image-03.webp',
      publishedAt: '2022-04-03T19:00:00',
    },
    {
      title: 'Reinício das atividades do Grupo Adimó',
      description:
        'Retomada das atividades, oficinas e eventos do Grupo Cultural Adimó após a pandemia.',
      slug: 'reinicio-das-atividades-do-grupo-adimo',
      image: '/images/articles/image-01.webp',
      publishedAt: '2022-02-09T09:30:00',
    },
    {
      title: 'Doação da artista plástica Mundica Fontes',
      description:
        'O Grupo Cultural Adimó recebe da artista plástica Mundica Fontes a tela: Giro Noturno - Descobrindo outras belezas. A tela será rifada para comprar os espelhos para a sala de dança do Centro Cultural Chico Rei no Picos Plaza Shopping.',
      slug: 'doacao-da-artista-plastica-mundica-fontes',
      image: '/images/articles/image-02.webp',
      publishedAt: '2019-03-29T10:00:00',
    },
  ],

  collaborators: [
    {
      name: 'João Pedro',
      role: 'Voluntário',
      avatar: 'https://picsum.photos/id/1012/3973/2639',
      followLink: 'https://picsum.photos/id/1012/3973/2639',
    },
    {
      name: 'Denise Garcia',
      role: 'Apoiadora',
      avatar: 'https://picsum.photos/id/1014/3973/2639',
    },
    {
      name: 'Leonardo Gonçalves',
      role: 'Padrinho',
      avatar: 'https://picsum.photos/id/1/3973/2639',
      followLink: 'https://picsum.photos/id/1/3973/2639',
    },
    {
      name: 'Amanda Costa',
      role: 'Apoiadora',
      avatar: 'https://picsum.photos/id/177/3973/2639',
      followLink: 'https://picsum.photos/id/177/3973/2639',
    },
  ],

  photos: [
    {
      caption: 'Ballet Baby Class',
      image: '/images/articles/image-01.webp',
    },
    {
      caption: 'Palhaçaria com o artista Francisco Cavalcante',
      image: '/images/articles/image-03.webp',
    },
    {
      caption: 'Semana teatral',
      image: '/images/image-02.webp',
    },
    {
      caption: 'Apresentação de dança',
      image: '/images/image-01.webp',
    },
    {
      caption: 'Visita da artista plástica Mundica Fontes',
      image: '/images/image-03.webp',
    },
  ],

  students: [
    {
      id: 'cl6ecc2bd6usl0an0kh1qcuai',
      fullName: 'Maria Norman Moss',
      avatar: {
        url: '/images/people1.png',
      },
      cpf: '939.393.929-92',
      sex: 'Feminino',
      birthdate: '2008-08-05',
      motherName: null,
      fatherName: null,
      email: 'maria@mail.com',
      phones: ['(99)9999-9999'],
      address: null,
      neighborhood: null,
      schooling: 'Escolaridade não informada',
      observations: null,
      activities: [
        {
          id: 'cl6fa7p8fp4o40dlpq9xrds25',
          title: 'Dança',
          schedule: 'Quarta, 10 horas',
        },
      ],
    },
    {
      id: 'cl6ecc2bd6usl0an0kh1qcuaa',
      fullName: 'Marcos Norman Moss',
      avatar: {
        url: '/images/people2.png',
      },
      cpf: '939.393.929-92',
      sex: 'Masculino',
      birthdate: '2008-08-05',
      motherName: null,
      fatherName: null,
      email: 'marcos@mail.com',
      phones: ['(99)9999-9999'],
      address: null,
      neighborhood: null,
      schooling: 'Escolaridade não informada',
      observations: null,
      activities: [
        {
          id: 'cl6fa7p8fp4o40dlpq9xrds25',
          title: 'Grafite',
          schedule: 'Quarta, 10 horas',
        },
        {
          id: 'cl6fa7p8fp4o40dlpq9xrds25',
          title: 'Capoeira',
          schedule: 'Quarta, 10 horas',
        },
      ],
    },
    {
      id: 'cl6ecc2bd6usl0an0kh1qcu8i',
      fullName: 'Joana Pereira Sousa',
      avatar: {
        url: '/images/people1.png',
      },
      cpf: '939.393.929-92',
      sex: 'Feminino',
      birthdate: '2008-08-05',
      motherName: 'Maria McBride',
      fatherName: 'Bill Reyes Foster',
      email: 'joana@mail.com',
      phones: ['(99)9999-9999'],
      address: '851 Wewbiz Center',
      neighborhood: 'Centro',
      schooling: 'Escolaridade não informada',
      observations:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt architecto ea, ut quas numquam nihil dolorem laudantium facere possimus corrupti modi optio.',
      activities: [
        {
          id: 'cl6fa7p8fp4o40dlpq9xrds25',
          title: 'Dança',
          schedule: 'Quarta, 10 horas',
        },
        {
          id: 'cl6fa7p8fpao40dlpq9xrds25',
          title: 'Pintura',
          schedule: 'Segunda, 10 horas',
        },
      ],
    },
  ],
};

export default fakeData;
