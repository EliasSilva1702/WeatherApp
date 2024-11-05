// App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import {
  thunderstormSvg,
  drizzleSvg,
  rainSvg,
  snowSvg,
  atmosphereSvg,
  clearSvg,
  cloudSvg,
} from "../public/images/index.js";
import toast from "react-hot-toast";
import AppContainer from "./components/AppContainer.jsx";
import LoadingSpinner from "./components/LoadingSpinner";
import WeatherInfo from "./components/WeatherInfo";
import WeatherDetails from "./components/WeatherDetails";
import TemperatureToggle from "./components/TemperatureToggle";

const initialCoords = { latitude: 0, longitude: 0 };
const key = "39219719bc7580da2ab28aecde542d3e";
const url = "https://api.openweathermap.org/data/2.5/weather";

const conditionCodes = {
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  snow: [600, 601, 602, 611, 612, 615, 616, 620, 621, 622],
  atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781, 800],
  clear: [800],
  clouds: [801, 802, 803, 804],
};
const icons = {
  thunderstorm: thunderstormSvg,
  drizzle: drizzleSvg,
  rain: rainSvg,
  snow: snowSvg,
  atmosphere: atmosphereSvg,
  clear: clearSvg,
  clouds: cloudSvg,
};

function App() {
  const [coords, setCoords] = useState(initialCoords);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setCoords({ latitude, longitude });
      toast.success("Ubicación obtenida"); // Notificación de éxito
    };
  
    const errorNotif = () => {
      toast.error("Error obteniendo la ubicación");
    };
  
    navigator.geolocation.getCurrentPosition(success, errorNotif);
  }, []);

  useEffect(() => {
    if (coords.latitude && coords.longitude) {
      setLoading(true);
      fetch(`${url}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`)
        .then((res) => res.json())
        .then((data) => {
          const iconsName = Object.keys(conditionCodes).find((key) =>
            conditionCodes[key].includes(data.weather[0].id)
          );
          setWeather({
            icons: icons[iconsName],
            city: data.name,
            country: data.sys?.country,
            main: data.weather[0].main,
            wind: data.wind.speed,
            clouds: data.clouds.all,
            pressure: data.main.pressure,
            temperature: Math.round(data.main.temp - 273.15),
          });
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [coords]);

  return (
    <AppContainer>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <WeatherInfo
            city={weather.city}
            country={weather.country}
            main={weather.main}
            icon={weather.icons}
          />
          <WeatherDetails
            wind={weather.wind}
            clouds={weather.clouds}
            pressure={weather.pressure}
          />
          <TemperatureToggle
            temperature={weather.temperature}
            toggle={toggle}
            onToggle={() => setToggle(!toggle)}
          />
        </>
      )}
    </AppContainer>
  );
}

export default App;
