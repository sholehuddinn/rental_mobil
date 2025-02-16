import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaCar, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      fetchUser(storedToken);
    } else {
      navigate("/login");
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch(
        "https://api-rentalmobil.csnightdev.com/api/users"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Ambil response JSON

      if (Array.isArray(data.data)) {
        const userData = data.data.find((user) => user.token === token);

        if (userData) {
          setName(userData.name);
        } else {
          console.error("User dengan token ini tidak ditemukan.");
        }
      } else {
        console.error("Format data tidak valid.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        "https://api-rentalmobil.csnightdev.com/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ token: token }),
        }
      );

      if (!response.ok) {
        throw new Error(`Logout failed! Status: ${response.status}`);
      }

      localStorage.removeItem("token"); // Hapus token dari localStorage
      setName("");
      setToken("");
      navigate("/login"); // Arahkan ke halaman login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="navbar bg-gradient-to-r from-green-500 to-green-700 text-white shadow-xl px-6 py-3">
        <div className="flex-1 flex items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <FaCar className="text-3xl" /> Admin Rental
          </Link>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end relative">
            <button
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaUserCircle className="text-2xl" />
            </button>
            {isOpen && (
              <ul className="absolute right-0 mt-3 z-10 p-2 shadow bg-white text-black rounded-box w-48">
                <li className="p-2 flex items-center">
                  <FaUserCircle className="mr-2" /> {name || "Guest"}
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="w-full text-left flex items-center p-2 text-red-600 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
