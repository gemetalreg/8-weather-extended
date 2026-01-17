import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed(" ERROR ") + " " + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(" SUCCESS ") + " " + message);
};

const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(" HELP ")}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
  );
};

const printWeather = (res, icon) => {
  console.log(
    dedent`${chalk.bgYellow(" WEATHER ")} Погода в городе ${res.name}
		${icon}  ${res.weather[0].description}
		Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}
		`
  );
};

const printHelpEng = () => {
  console.log(
    dedent`${chalk.bgCyan(" HELP ")}
		No parameters - display weather
		-s [CITY] to set the city
		-h for help
		-t [API_KEY] to save the token
		`
  );
};

const printWeatherEng = (res, icon) => {
  console.log(
    dedent`${chalk.bgYellow(" WEATHER ")} Weather in ${res.name}
		${icon}  ${res.weather[0].description}
		Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
		Humidity: ${res.main.humidity}%
		Wind speed: ${res.wind.speed}
		`
  );
};

export {
  printError,
  printSuccess,
  printHelp,
  printWeather,
  printHelpEng,
  printWeatherEng,
};
