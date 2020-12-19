const baseURL = 'http://localhost:5005';
const registerInitialState = { email: '', password: '', name: '' };
const registerInitialErrorState = {
  email: { error: false, message: '' },
  password: { error: false, message: '' },
  name: { error: false, message: '' },
};
const loginInitialState = { email: '', password: '' };
const loginInitialErrorState = {
  email: { error: false, message: '' },
  password: { error: false, message: '' },
};

export {
  baseURL,
  registerInitialState,
  registerInitialErrorState,
  loginInitialState,
  loginInitialErrorState,
};
