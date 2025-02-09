import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";

const PembayaranDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Detail Pembayaran
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg">
            <span className="font-semibold">ID Pembayaran:</span> {id}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Pesanan ID:</span> 123
          </p>
          <p className="text-lg">
            <span className="font-semibold">Tanggal:</span> 2022-01-01
          </p>
          <p className="text-lg">
            <span className="font-semibold">Metode:</span> Cash
          </p>
          <p className="text-lg text-green-600 font-bold">
            <span className="font-semibold text-gray-800">Total:</span> Rp 100.000
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => navigate("/pembayaran")}
            className="w-1/2 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all shadow-md"
          >
            <FaArrowLeft />
            Back
          </button>
          <button
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

export default PembayaranDetail;
