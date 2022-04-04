const diferent = (currence) => {
  if (currence === 'USDT') {
    return false;
  }
  return true;
};

const fetchCurrence = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const list = Object.keys(data);
  const corrects = list.filter(diferent);
  return corrects;
};

const fetchCotation = async () => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  return data;
};

export { fetchCotation, fetchCurrence };
