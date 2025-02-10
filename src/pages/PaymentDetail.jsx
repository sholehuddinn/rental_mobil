import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import axios from "axios";

const PembayaranDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null); 

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://api-rentalmobil.csnightdev.com/api/payments/${id}`
      );
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://api-rentalmobil.csnightdev.com/api/payments/${id}`
      );
      navigate('/pembayaran'); 
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]); 

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Detail Pembayaran
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg">
            <span className="font-semibold">ID Pembayaran:</span> {data.id}
          </p>
          <p className="text-lg">
            <span className="font-semibold">ID Pesanan:</span>{" "}
            {data.pemesanan_id}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Tanggal:</span>{" "}
            {data.tanggal_pembayaran}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Metode:</span> {data.metode_bayar}
          </p>
          <p className="text-lg text-green-600 font-bold">
            <span className="font-semibold text-gray-800">Total:</span> Rp{" "}
            {parseInt(data.total).toLocaleString()}
          </p>
          <p className="text-lg ">
            <span className="font-semibold">Extend:</span> {data.extend}
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
            onClick={handleDelete}
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
