import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginAdminPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.username.trim() || !formData.password.trim()) {
      alert("Username dan password harus diisi!");
      return;
    }
    try {
      const response = await fetch(
        "https://api-rentalmobil.csnightdev.com/api/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify(formData), 
        }
      );
      const data = await response.json();
      if (data.data != null) {
        localStorage.setItem("token", data.data);
        navigate("/");
      } else {
        navigate("/login");
        alert("Login gagal! Periksa username atau password.");
      }
    } catch (error) {
      alert("Terjadi kesalahan. Coba lagi!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-green-700 p-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="grow"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2">
              <FaLock className="text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="grow"
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-success w-full text-white hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span className="text-green-700 font-bold cursor-pointer hover:underline">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginAdminPage;
