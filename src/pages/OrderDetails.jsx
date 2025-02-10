import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import axios from "axios";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [car, setCar] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tf, setTf] = useState([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Ambil data order berdasarkan ID
        const response = await axios.get(
          `https://api-rentalmobil.csnightdev.com/api/orders/${id}`
        );
        const orderData = response.data.data;
        setOrder(orderData);

        // Ambil detail mobil dan user
        const [carResponse, userResponse] = await Promise.all([
          axios.get(`https://api-rentalmobil.csnightdev.com/api/cars/${orderData.mobil_id}`),
          axios.get(`https://api-rentalmobil.csnightdev.com/api/users/${orderData.user_id}`)
        ]);

        setCar(carResponse.data.data);
        setUser(userResponse.data.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `https://api-rentalmobil.csnightdev.com/api/payments`
        );
        setTf(response.data.data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    };

    if (id) {
      fetchData();
      fetchTransaction();
    }
  }, [id]);

  useEffect(() => {
    if (order && tf.length > 0) {
      const isPaid = tf.some((item) => item.pemesanan_id === order.id);
      setEnabled(isPaid);
    }
  }, [order, tf]);

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <span className="loading loading-spinner loading-lg items-center"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Order Details
        </h2>

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-2">
          <p className="text-lg">
            <span className="font-semibold">Order ID:</span> {order?.id}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Mobil:</span> {car?.name} {car?.nopol}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Penyewa:</span> {user?.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Telephone:</span> {user?.phone}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Alamat:</span> {user?.address}
          </p>
          <p className="text-lg text-green-600 font-bold">
            <span className="font-semibold text-gray-800">Harga:</span> Rp{" "}
            {order?.harga?.toLocaleString()}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Tanggal Order:</span>{" "}
            {new Date(order?.created_at).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Tanggal Pinjam:</span>{" "}
            {new Date(order?.tanggal_pinjam).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Tanggal Kembali:</span>{" "}
            {new Date(order?.tanggal_kembali).toLocaleDateString()}
          </p>
          <p
            className={`text-lg font-semibold ${
              order?.status === "Selesai" ? "text-green-600" : "text-yellow-600"
            }`}
          >
            Status: {order?.status}
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
            onClick={async () => {
              try {
                await axios.delete(`https://api-rentalmobil.csnightdev.com/api/orders/${id}`);
                navigate("/order");
              } catch (error) {
                console.error("Error deleting order:", error);
              }
            }}
            disabled={enabled}
            className={`w-1/2 flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all shadow-md ${
              enabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            }`}
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
