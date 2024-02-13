export const BASE_URL = 'http://localhost:3002';

export const BaseSettings = {
  baseUrl: BASE_URL,
  api: BASE_URL,
  // endpoints: {
  //   login: BASE_URL + '/login',
  //   getItemList: BASE_URL + '/items',
  //   getItemDetails: id => `${BASE_URL}/items/${id}`,
  //   createItem: BASE_URL + '/items',
  //   updateItem: id => `${BASE_URL}/items/${id}`,
  //   deleteItem: id => `${BASE_URL}/items/${id}`,
  // },
  endpoints: {
    login: 'login',
    adminLogin: 'admin/login',
    getItemList: '/items',
    getItemDetails: id => `/items/${id}`,
    createItem: '/items',
    updateItem: id => `/items/${id}`,
    deleteItem: id => `/items/${id}`,
  },
};

export const DefaultImage =
  'https://media.istockphoto.com/id/1392794266/photo/dark-and-moody-blue-ocean-wave-crashing-into-sea.jpg?s=1024x1024&w=is&k=20&c=so5o6eK2MdUIFi8ZaovFH0lvmNQoAWQgqf4blERKZZk=';
