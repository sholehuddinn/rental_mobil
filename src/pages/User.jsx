import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const response = async () => {
    try {
      const res = await axios.get("https://api-rentalmobil.csnightdev.com/api/users");
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    response();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Daftar Pengguna
      </h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Cari pengguna..."
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded w-full max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg items-center"></span>
          </div>
        )}

        {filteredData.map((user, index) => (
          <div
            key={user.id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <h3 className="text-gray-500 text-sm">{index + 1}</h3>
            </div>
            <p className="text-gray-600">{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
