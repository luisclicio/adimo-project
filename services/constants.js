const cnpj = '09.483.532/0001-00';

const phone = '(89) 99973-6894';
const rawPhone = phone.replace(/\D/g, '');

export const constants = {
  cnpj,
  contact: {
    email: 'grupoculturaladimo@gmail.com',
    phone,
    rawPhone,
    whatsapp: `https://wa.me/55${rawPhone}`,
  },
  address: {
    cep: '64600-048',
    street: 'Rua Três de Maio',
    number: 822,
    neighborhood: 'Centro',
    coordinates: [-7.083236, -41.46949],
    googleMaps: 'https://goo.gl/maps/cfiJCi7o7sb6rLMq9',
  },
  bank: {
    name: 'Banco Adimó',
    owner: 'Grupo Cultural Adimó',
    agency: '0000-0',
    account: '00000-0',
    pixKey: '00.000.000/0000-00',
    pixCode: 'Pix copia e cola',
  },
  social: {
    youtube: {
      url: 'https://www.youtube.com/channel/UCSSvmNPfHYZXhhsMqMiurjg',
    },
    facebook: {
      username: 'grupoculturaladimo',
      url: 'https://www.facebook.com/grupoculturaladimo',
      page: {
        url: 'https://www.facebook.com/people/Grupo-Cultural-Adim%C3%B3/100069570692363/',
      },
    },
    instagram: {
      username: 'grupoculturaladimo',
      url: 'https://www.instagram.com/grupoculturaladimo',
    },
  },
};
