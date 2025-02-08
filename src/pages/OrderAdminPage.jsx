import React from "react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    mobil_id: 1,
    user_id: 1,
    harga: 1000000,
    tanggal_pinjam: Date.now(),
    tanggal_kembali: Date.now(),
    status: "belum",
    create_at: Date.now(),
    update_at: Date.now(),
  },
  {
    id: 2,
    mobil_id: 2,
    user_id: 2,
    harga: 1500000,
    tanggal_pinjam: Date.now(),
    tanggal_kembali: Date.now(),
    status: "belum",
    create_at: Date.now(),
    update_at: Date.now(),
  },
  {
    id: 3,
    mobil_id: 3,
    user_id: 3,
    harga: 2000000,
    tanggal_pinjam: Date.now(),
    tanggal_kembali: Date.now(),
    status: "belum",
    create_at: Date.now(),
    update_at: Date.now(),
  }
];

const OrderPage = () => {
  const navigate = useNavigate();

  const handleDetails = (order) => {
    navigate(`/order/${order.id}`, { state: { order } });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Mobil</th>
              <th className="px-4 py-2">Penyewa</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Tanggal Pinjam</th>
              <th className="px-4 py-2">Tanggal Kembali</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-100">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.mobil_id}</td>
                <td className="px-4 py-2">{order.user_id}</td>
                <td className="px-4 py-2">Rp {order.harga.toLocaleString()}</td>
                <td className="px-4 py-2">{new Date(order.tanggal_pinjam).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(order.tanggal_kembali).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDetails(order)}
                    className="bg-blue-500 hover:bg-blue-700 text-white text-xs md:text-sm font-bold py-1 px-2 md:py-2 md:px-4 rounded"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
