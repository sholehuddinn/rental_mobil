import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(location.state?.order);
  const [deleted, setDeleted] = useState(false);

  if (!order) {
    return <div className="text-center text-red-500 font-bold text-xl">No order details available!</div>;
  }

  const handleDelete = () => {
    setDeleted(true);
    setTimeout(() => {
      setOrder(null);
      navigate("/order");
    }, 1200);
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br  p-6">
      <div className={`bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg transition-all duration-500 ${deleted ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Order Details</h2>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-2">
          <p className="text-lg"><span className="font-semibold">Order ID:</span> {order.id}</p>
          <p className="text-lg"><span className="font-semibold">Mobil :</span> {order.mobil}</p>
          <p className="text-lg"><span className="font-semibold">Penyewa :</span> {order.user_id}</p>
          <p className="text-lg text-green-600 font-bold"><span className="font-semibold text-gray-800">Harga:</span> Rp {order.harga.toLocaleString()}</p>
          <p className="text-lg"><span className="font-semibold">Tanggal Pinjam:</span> {new Date(order.tanggal_pinjam).toLocaleDateString()}</p>
          <p className="text-lg"><span className="font-semibold">Tanggal Kembali:</span> {new Date(order.tanggal_kembali).toLocaleDateString()}</p>
          <p className={`text-lg font-semibold ${order.status === "Selesai" ? "text-green-600" : "text-yellow-600"}`}>
            Status: {order.status}
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button 
            onClick={() => navigate("/order")}
            className="w-1/2 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all shadow-md"
          >
            <FaArrowLeft />
            Back
          </button>
          <button 
            onClick={handleDelete}
            className="w-1/2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all shadow-md"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
