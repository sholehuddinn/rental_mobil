import React from "react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    mobil: "Toyota Avanza",
    nopol: "L 1234 LK",
    harga: 1000000,
    status: "Belum Kembali",
  },
  {
    id: 2,
    mobil: "Honda Jazz",
    nopol: "B 5678 CD",
    harga: 1200000,
    status: "Belum Kembali",
  },
  {
    id: 3,
    mobil: "Mitsubishi Xpander",
    nopol: "C 9012 EF",
    harga: 1500000,
    status: "Belum Kembali",
  },
];

const OrderPage = () => {
  const navigate = useNavigate();

  const handleDetails = (order) => {
    navigate(`/order/${order.id}`, { state: { order } });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Daftar Order</h1>
      <div className="space-y-4">
        {data.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg"
          >
            <div>
              <h2 className="text-lg font-semibold">{order.mobil}</h2>
              <p className="text-gray-600">{order.nopol}</p>
            </div>
            <button
              onClick={() => handleDetails(order)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Lihat Detail
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
