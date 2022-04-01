const diferent = (currence) => {
  if (currence === 'USDT') {
    return false;
  }
  return true;
};

const fetchCurrence = async () => {
  const reponse = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await reponse.json();
  const list = Object.keys(data);
  const corrects = list.filter(diferent);
  return corrects;
};

export default fetchCurrence;
