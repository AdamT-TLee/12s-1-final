import { Outlet } from "react-router-dom";
import { Navbar } from "./Utils.js";

export default function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
