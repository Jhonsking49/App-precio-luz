const baseUrl = import.meta.env.VITE_BASE_URL;

export const API_ROUTES = {
  
    DAILY_PRICES: (startDate, endDate) => `${baseUrl}/days/start_date=${startDate}/end_date=${endDate}`,
    HOUR_PRICES: (startDate, endDate, range) => `${baseUrl}/hours/start_date=${startDate}/end_date=${endDate}/rangeHours=${range}`,
    PRICES:(day, hours) => `${baseUrl}/hours/start_date=${day}/end_date=${day}/rangeHours=${hours}`,
    USERS: `${baseUrl}/users`,
    LOGIN: `${baseUrl}/users/login`,
    REGISTER: `${baseUrl}/users/register`,
    WEATHER: (city) => `${baseUrl}/weather?city=${city}`,
};