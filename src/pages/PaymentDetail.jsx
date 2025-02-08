import React from "react";
import { useParams } from "react-router-dom";

const PembayaranDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Detail Pembayaran ID: {id}</h2>
        <p><strong>Pesanan ID:</strong> 123</p>
        <p><strong>Tanggal Pembayaran:</strong> 2022-01-01</p>
        <p><strong>Metode Bayar:</strong> Cash</p>
        <p><strong>Total:</strong> Rp 100.000</p>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PembayaranDetail;
