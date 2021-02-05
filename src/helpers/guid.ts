export const guid: () => string = () => {
  return Math.floor((Math.random() * Date.now())/1000).toString();
};
