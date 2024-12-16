import { API_ROUTES } from "../config/routes.js";

import { validateDate } from "./scripts.js";
const iconWeatherBase = import.meta.env.VITE_ICON_WEATHER;

//' ** FETCH PARA OBTENER LOS PRECIOS POR DIAS **

export const fetchDailyPrices2 = async (day, hours) => {
  try {
    const url = API_ROUTES.PRICES(day, hours);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener precios diarios");

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export const fetchTiempo = async (city) => {
  try {
      const url = API_ROUTES.WEATHER(city); 
      const response = await fetch(url); 
      if(!response.ok) throw new Error("Error al recibir data");
      const data = await response.json();
      data.iconUrl = getWeatherIcon(data.weather[0].icon); 
      return data;
  } catch (error) {
      console.error("error", error);
  }
}


//. FUNCIÓN PARA GENERAR LA URL DEL ICONO 
export const getWeatherIcon = (iconCode) => {
  if (!iconCode) {
    console.error("Código de icono no proporcionado");
    return "";
  }
  return `${iconWeatherBase}/${iconCode}@2x.png`;
};



//` ** FETCH PARA VER SI EL USUARIO ESTA EN LA BD **
export const loginUser = async (username, password) => {
  try {
      const url = `${API_ROUTES.LOGIN}`; 
      const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Usuario o contraseña incorrectos");

      const data = await response.json();
      return data; // Usuario autenticado
  } catch (error) {
      console.error("Error en loginUser:", error.message);
      throw error;
  }
};

//` ** FETCH PARA REGISTRAR UN USUARRIO **
export const registerUser = async (username, mail, password) => {
  try {
    const response = await fetch(API_ROUTES.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, mail, password }),
    });

    if (!response.ok) throw new Error("Error al registrar el usuario");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en registerUser:", error);
    throw error;
  }
};