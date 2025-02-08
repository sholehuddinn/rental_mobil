import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(location.state?.order);

  if (!order) {
    return <div className="text-center text-red-500 font-bold text-xl">No order details available!</div>;
  }

  const handleDelete = () => {
    setOrder(null); // Hapus data secara lokal (simulasi)
    setTimeout(() => navigate("/order"), 1000); // Redirect setelah 1 detik
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4 mx-4 mt-3">
      <h2 className="text-2xl font-bold mb-4 text-center">Order Details</h2>
      <p><strong>Order ID:</strong> {order.id}</p>
      <p><strong>Mobil ID:</strong> {order.mobil_id}</p>
      <p><strong>User ID:</strong> {order.user_id}</p>
      <p><strong>Harga:</strong> Rp {order.harga.toLocaleString()}</p>
      <p><strong>Tanggal Pinjam:</strong> {new Date(order.tanggal_pinjam).toLocaleDateString()}</p>
      <p><strong>Tanggal Kembali:</strong> {new Date(order.tanggal_kembali).toLocaleDateString()}</p>
      <p><strong>Status:</strong> {order.status}</p>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button 
          onClick={() => navigate("/order")} 
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/3"
        >
          Back
        </button>
        <button 
          onClick={handleDelete} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
