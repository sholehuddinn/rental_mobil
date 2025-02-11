import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const RegisterUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    name: "",
    password: "guest123",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!user.username.trim()) newErrors.username = "Username harus diisi!";
    if (!user.name.trim()) newErrors.name = "Nama harus diisi!";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post(
        "https://api-rentalmobil.csnightdev.com/api/users",
        user
      );
      const newUserId = res.data.data.id;

      // Redirect ke halaman checkout dengan userId dan mobilId
      navigate(`/checkout/${id}/${newUserId}`);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Username</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>

        <div>
          <label className="label">Nama</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Lanjut ke Checkout</button>
      </form>
    </div>
  );
};

export default RegisterUser;
