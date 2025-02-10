import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaCar, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="navbar bg-gradient-to-r from-green-500 to-green-700 text-white shadow-xl px-6 py-3">
        <div className="flex-1 flex items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <FaCar className="text-3xl" /> Admin Rental
          </Link>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <button
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaUserCircle className="text-2xl" />
            </button>
            {isOpen && (
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-black rounded-box w-48">
                <li>
                  <Link to="/login" className="flex items-center text-red-600">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

export default navbar;
