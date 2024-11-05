// TemperatureToggle.jsx
function TemperatureToggle({ temperature, toggle, onToggle }) {
    const temp = toggle ? parseInt(temperature * 9 / 5) + 32 : temperature;
  
    return (
      <section className="w-full my-3 mx-auto flex items-center justify-center flex-col gap-8">
        <h4 className="text-center text-4xl font-semibold">
          {temp} {toggle ? "°F" : "°C"}
        </h4>
        <button
          onClick={onToggle}
          className="w-full transition bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Change to {!toggle ? "°F" : "°C"}
        </button>
      </section>
    );
  }
  
  export default TemperatureToggle;
  