// Массив доменов, с которых разрешены кросс-доменные запросы
import app from "bcrypt/promises";

const allowedCors = [
  'https://mestoatmalive.nomoredomains.icu',
  'http://mestoatmalive.nomoredomains.icu',
  'localhost:3000'
];

const CORS = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
}