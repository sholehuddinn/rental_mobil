import React from "react";
import { Link } from "react-router-dom";

const PembayaranAdminPage = () => {
  const data = [
    {
      id: 1,
      pesanan_id: 123,
      tanggal_pembayaran: "2022-01-01",
      extend: 0,
      metode_bayar: "cash",
      total: 100000,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      id: 2,
      pesanan_id: 456,
      tanggal_pembayaran: "2022-02-01",
      extend: 1,
      metode_bayar: "transfer",
      total: 200000,
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      id: 3,
      pesanan_id: 789,
      tanggal_pembayaran: "2022-03-01",
      extend: 0,
      metode_bayar: "transfer",
      total: 300000,
      created_at: Date.now(),
      updated_at: Date.now(),
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Pesanan ID</th>
              <th className="px-4 py-2">Tanggal</th>
              <th className="px-4 py-2">Metode Bayar</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.pesanan_id}</td>
                <td className="px-4 py-2">{item.tanggal_pembayaran}</td>
                <td className="px-4 py-2">{item.metode_bayar}</td>
                <td className="px-4 py-2">Rp {item.total.toLocaleString()}</td>
                <td className="px-4 py-2">
                  <Link
                    to={`/pembayaran/${item.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white text-xs md:text-sm font-bold py-1 px-2 md:py-2 md:px-4 rounded"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PembayaranAdminPage;
