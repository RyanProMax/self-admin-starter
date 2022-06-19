export const useLogout = () => {
  window.localStorage.clear();
  location.reload();
};
