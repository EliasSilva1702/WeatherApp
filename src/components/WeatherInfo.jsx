// WeatherInfo.jsx
function WeatherInfo({ city, country, main, icon }) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-6xl text-center font-semibold">Weather App ☁️</h1>
        <section className="flex flex-col gap-4 md:gap-8 items-center justify-center rounded-lg p-2 md:p-4 m-0 md:m-4 w-full mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-semibold">
            {city}, {country}
          </h2>
          <section>
            <h3 className="text-center text-xl md:text-2xl font-semibold">"{main}"</h3>
          </section>
          <img src={icon} alt="Weather conditions" width="200" height="200" />
        </section>
      </div>
    );
  }
  
  export default WeatherInfo;
  