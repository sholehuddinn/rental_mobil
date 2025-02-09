import React from "react";
import { Link } from "react-router-dom";

const PembayaranAdminPage = () => {
  const data = [
    {
      id: 1,
      pesanan_id: 123,
      tanggal_pembayaran: "2022-01-01",
      extend: 0,
      metode_bayar: "Cash",
      total: 100000,
    },
    {
      id: 2,
      pesanan_id: 456,
      tanggal_pembayaran: "2022-02-01",
      extend: 1,
      metode_bayar: "Transfer",
      total: 200000,
    },
    {
      id: 3,
      pesanan_id: 789,
      tanggal_pembayaran: "2022-03-01",
      extend: 0,
      metode_bayar: "Transfer",
      total: 300000,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Pembayaran</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="border rounded-xl shadow-md p-4 bg-white flex flex-col">
            <h2 className="text-lg font-semibold">Pesanan #{item.pesanan_id}</h2>
            <p className="text-gray-600">Metode: <span className="font-medium">{item.metode_bayar}</span></p>
            <p className="text-lg font-bold text-green-600">Rp {item.total.toLocaleString()}</p>
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
