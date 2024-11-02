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
import toast, { Toaster } from "react-hot-toast";

const initialCoords = {
  latitude: 0,
  longitude: 0,
};

const key = "39219719bc7580da2ab28aecde542d3e";
const url = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  const [coords, setCoords] = useState(initialCoords);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true); // Agregamos el estado de carga

  useEffect(() => {
    // Simulación de un tiempo de carga para el skeleton
    setTimeout(() => setLoading(false), 2000); // Cambia a false después de 2 segundos
  }, []); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setCoords({ latitude, longitude });
      // toast.success("Ubicación obtenida");
    };
    const errorNotif = () => {
      toast.error("Error obteniendo la ubicación");
    };
    navigator.geolocation.getCurrentPosition(success, errorNotif);
  }, []);

  useEffect(() => {
    if (coords.latitude !== 0 && coords.longitude !== 0) {
      setLoading(true); // Activa el loader antes de la solicitud
      fetch(
        `${url}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${key}`
      )
        .then((response) => response.json())
        .then((data) => {
          const keys = Object.keys(conditionCodes);

          const iconsName = keys.find((key) =>
            conditionCodes[key].includes(data.weather[0].id)
          );

          setWeather({
            icons: icons[iconsName],
            city: data.name,
            country: data.sys?.country,
            main: data?.weather[0]?.main,
            wind: data?.wind?.speed,
            clouds: data?.clouds?.all,
            pressure: data?.main?.pressure,
            temperature: parseInt(data?.main?.temp - 273.15),
          });
          setLoading(false); // Desactiva el loader cuando los datos están listos
        })
        .catch((error) => {
          console.log(error);
          setLoading(false); // En caso de error, desactiva el loader
        });
    }
  }, [coords]);

  const conditionCodes = {
    thinderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
    rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
    snow: [600, 601, 602, 611, 612, 615, 616, 620, 621, 622],
    atmosphere: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781, 800],
    clear: [800],
    clouds: [801, 802, 803, 804],
  };
  const icons = {
    thinderstorm: thunderstormSvg,
    drizzle: drizzleSvg,
    rain: rainSvg,
    snow: snowSvg,
    atmosphere: atmosphereSvg,
    clear: clearSvg,
    clouds: cloudSvg,
  };

  return (
    <main className="border min-h-screen background-gradient-clouds font-moderustic flex place-items-center">
      <div className="h-full w-fit mx-auto backdrop-blur-lg bg-white/30 my-4 md:my-8 p-4 md:p-32 rounded-xl shadow-2xl">
        {loading ? (
          <span className="text-center text-xl">Loading...</span>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-6xl text-center font-semibold">
              Weather App ☁️
            </h1>

            <section className="flex flex-col gap-4 md:gap-8 items-center justify-center rounded-lg p-2 md:p-4 m-0 md:m-4 w-full mx-auto">
              <h2 className="text-center text-2xl md:text-3xl font-semibold">
                {weather.city}, {weather.country}
              </h2>

              <section>
                <h3 className="text-center text-xl md:text-2xl font-semibold">
                  "{weather.main}"
                </h3>
              </section>

              <img
                src={weather.icons}
                alt="Weather conditions"
                width="200"
                height="200"
                className=""
              />
            </section>

            <div className="flex flex-col items-start w-full mx-auto">
              <div className="p-4">
                <ul className="text-2xl">
                  <li>
                    Wind speed:{" "}
                    <span className="font-semibold">{weather.wind}m/s</span>
                  </li>
                  <li>
                    Clouds:{" "}
                    <span className="font-semibold">{weather.clouds}%</span>
                  </li>
                  <li>
                    Pressure:{" "}
                    <span className="font-semibold">{weather.pressure}hPa</span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="w-full my-3 mx-auto flex items-center justify-center flex-col gap-8">
              <h4 className="text-center text-4xl font-semibold">
                {weather.temperature}°C
              </h4>
              <button className="w-full transition bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                Change to
              </button>
            </section>
          </div>
        )}
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  );
}

export default App;
