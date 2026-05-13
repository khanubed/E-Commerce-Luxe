// utils/localStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('artisan_store_state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('artisan_store_state', serializedState);
  } catch (err) {
    // Ignore write errors
  }
};