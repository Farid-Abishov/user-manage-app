import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function MainNavigation() {

  const location = useLocation(); // Hal-hazırda olan route-u əldə edirik
  const [active, setActive] = useState(location.pathname); // Aktiv olan path-i saxlayırıq

  return (
    <aside className="min-h-screen float-start w-aside-w p-2 border-2 border-r-gray-200 max-[765px]:hidden">
      <div className="flex flex-row  align-center items-center my-4 p-3">
        <h1 className="text-xl m-0 font-semibold font-title text-header-black mr-2">
          User Manage App
        </h1>
      </div>
      <ul className="flex flex-col gap-3 p-3">
        <li> 
          <Link to="/"  className={`font-semibold px-4 py-2 rounded block ${
            active === "/" ? "bg-custom-red text-white" : "bg-white"
          } hover:bg-custom-red hover:text-white`}  onClick={() => setActive("/")}>Users</Link>
        </li>
       
      </ul>
    </aside>
  );
}
