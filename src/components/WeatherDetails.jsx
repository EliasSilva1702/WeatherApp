// WeatherDetails.jsx
function WeatherDetails({ wind, clouds, pressure }) {
    return (
      <div className="flex flex-col items-start w-full mx-auto">
        <div className="p-4">
          <ul className="text-2xl">
            <li>Wind speed: <span className="font-semibold">{wind} m/s</span></li>
            <li>Clouds: <span className="font-semibold">{clouds}%</span></li>
            <li>Pressure: <span className="font-semibold">{pressure} hPa</span></li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default WeatherDetails;
  