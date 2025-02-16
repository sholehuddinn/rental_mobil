import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PembayaranAdminPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api-rentalmobil.csnightdev.com/api/payments"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-9">
        <span className="loading loading-spinner loading-lg items-center"></span>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Pembayaran</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl shadow-md p-4 bg-white flex flex-col"
          >
            <h2 className="text-lg font-semibold">Pembayaran #{item.id}</h2>
            <p className="text-gray-600">
              Metode: <span className="font-medium">{item.metode_bayar}</span>
            </p>
            <p className="text-lg font-bold text-green-600">
              Rp {item.total.toLocaleString()}
            </p>
            <Link
              to={`/pembayaran/${item.id}`}
              className="mt-auto bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg text-center"
            >
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PembayaranAdminPage;
