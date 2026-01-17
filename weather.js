#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
  printHelpEng,
  printWeatherEng,
} from "./services/log.service.js";
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан token");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранён");
  } catch (e) {
    printError(e.message);
  }
};

const saveCitys = async (cities) => {
  if (!cities.length) {
    printError("Не передан город или города");
    return;
  }
  try {
    cities = cities.trim().split(" ");
    if (cities.isArray()) {
      await saveKeyValue(TOKEN_DICTIONARY.city, cities);
      printSuccess("Города сохранёны");
    } else {
      await saveKeyValue(TOKEN_DICTIONARY.city, [cities]);
      printSuccess("Город сохранён");
    }
  } catch (e) {
    printError(e.message);
  }
};

const getForcast = async () => {
  try {
    const cities = process.env.CITY
      ? [process.env.CITY]
      : await getKeyValue(TOKEN_DICTIONARY.city);
    cities.forEach(async (city) => {
      const weather = await getWeather(city);
      printWeather(weather, getIcon(weather.weather[0].icon));
    });
  } catch (e) {
    if (e?.response?.status == 404) {
      printError("Неверно указан город");
    } else if (e?.response?.status == 401) {
      printError("Неверно указан токен");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCitys(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  if (args.l) {
    TOKEN_DICTIONARY.lang = args.l;
  }

  return getForcast();
};

initCLI();
