import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaCar, FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";

const navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="navbar bg-gradient-to-r from-green-500 to-green-700 text-white shadow-xl px-6 py-3">
        <div className="flex-1 flex items-center">
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="text-xl" />
          </button>
          <Link
            to="/admin"
            className="text-2xl font-bold flex items-center gap-2"
          >
            <FaCar className="text-3xl" /> Admin Rental
          </Link>
        </div>
        <div className="hidden lg:flex gap-6">
          <Link
            to="/order"
            className="btn btn-sm btn-outline text-white hover:bg-white hover:text-green-700"
          >
            Order
          </Link>
          <Link
            to="/cars"
            className="btn btn-sm btn-outline text-white hover:bg-white hover:text-green-700"
          >
            Cars
          </Link>
          <Link
            to="/pembayaran"
            className="btn btn-sm btn-outline text-white hover:bg-white hover:text-green-700"
          >
            Pembayaran
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
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/laporan">Laporan</Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center text-red-600">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-green-600 p-4 flex flex-col gap-4 lg:hidden">
            <Link
              to="/order"
              className="text-white hover:text-gray-300"
            >
              Order
            </Link>
            <Link to="/cars" className="text-white hover:text-gray-300">
              Cars
            </Link>
            <Link
              to="/pembayaran"
              className="text-white hover:text-gray-300"
            >
              Pembayaran
            </Link>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default navbar;
