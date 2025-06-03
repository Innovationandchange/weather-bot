const axios = require('axios');

const WEATHER_API_KEY = 'CWA-5E848EE0-CB53-4E6E-9B27-30FB48BCF8F8';
const CITY = '台中'; // 你想查詢的城市
const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1379462606678655138/EW69ddG07LcC_PO4PK-rZH7--AKoQz3ZL59Xw19Egh9CvSgRFCFNtbJDI62q96zXC8ed';

async function fetchWeather() {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${WEATHER_API_KEY}&units=metric&lang=zh_tw`);
    const weather = response.data;
    const weatherMessage = `今天 ${CITY} 的天氣是：${weather.weather[0].description}，氣溫約 ${weather.main.temp}°C。`;

    await sendToDiscord(weatherMessage);
  } catch (error) {
    console.error('錯誤：', error);
  }
}

async function sendToDiscord(message) {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, {
      content: message
    });
    console.log('天氣訊息已發送至 Discord！');
  } catch (error) {
    console.error('發送到 Discord 失敗：', error);
  }
}

fetchWeather();
