import store from 'store';

export const loadState = () => {
  try {
    const serializedState = store.get('state') || {};

    return serializedState;
  } catch (err) {
    return {};
  }
};

export const saveState = (state: {}) => {
  try {
    store.set('state', state);
  } catch {
    // ignore write errors
  }
};
