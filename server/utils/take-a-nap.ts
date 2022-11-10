export const takeANap = async () => {
  return new Promise((res) => setTimeout(res, Math.ceil(Math.random() * 5000)));
};
