export const STORAGE = {
  AUTH: {
    name: '__SELF_AUTH__',
    initialValue: { token: '' }
  },
  USER: {
    name: '__SELF_USER__',
    initialValue: {
      name: '',
      avatar: ''
    }
  }
};

export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  USER: '/user',
  ABOUT: '/about'
};
