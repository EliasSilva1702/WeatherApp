// AppContainer.jsx
import { Toaster } from "react-hot-toast";

function AppContainer({ children }) {
  return (
    <main className="border min-h-screen background-gradient-clouds font-moderustic flex place-items-center">
      <div className="h-full w-fit mx-auto backdrop-blur-lg bg-white/30 my-4 md:my-8 p-4 md:p-32 rounded-xl shadow-2xl">
        {children}
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </main>
  );
}

export default AppContainer;
