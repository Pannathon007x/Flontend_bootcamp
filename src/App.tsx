import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./routes";

export default function App() {
  const element = useRoutes(routes);

  return (
    <div className="min-h-screen flex flex-col">
      
      <Navbar />

      
      <div className="flex-1">
        {element}
      </div>

      
      <footer className="bg-gray-100 py-4 text-center text-gray-600">
        © 2025 VolunteerHub
      </footer>
    </div>
  );
}
