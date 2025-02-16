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
  const [isTaken, setIsTaken] = useState(false); // Untuk disable tombol "Diambil"

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api-rentalmobil.csnightdev.com/api/orders/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const orderData = await response.json();
      setOrder(orderData.data);
      setIsTaken(orderData.data.status === "Diambil"); // Cek apakah sudah diambil

      const [carResponse, userResponse] = await Promise.all([
        fetch(
          `https://api-rentalmobil.csnightdev.com/api/cars/${orderData.data.mobil_id}`
        ),
        fetch(
          `https://api-rentalmobil.csnightdev.com/api/users/${orderData.data.user_id}`
        ),
      ]);

      if (!carResponse.ok || !userResponse.ok) {
        throw new Error("Failed to fetch car or user data");
      }

      const carData = await carResponse.json();
      const userData = await userResponse.json();

      setCar(carData.data);
      setUser(userData.data);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransaction = async () => {
    try {
      const response = await fetch(
        "https://api-rentalmobil.csnightdev.com/api/payments"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTf(data.data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  useEffect(() => {
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

  const sendToPay = async () => {
    if (!order) return;

    try {
      // Cek apakah pembayaran sebelumnya sudah ada
      const existingPayment = tf.find((item) => item.pemesanan_id === order.id);

      // Hitung durasi sewa dalam hari
      const tanggalPinjam = new Date(order.tanggal_pinjam);
      const tanggalKembali = new Date(order.tanggal_kembali);
      const durasiSewa = Math.ceil(
        (tanggalKembali - tanggalPinjam) / (1000 * 60 * 60 * 24)
      );

      // Cek apakah ini perpanjangan atau pembayaran pertama
      const isExtend = existingPayment ? existingPayment.extend + 1 : 0;

      // Hitung total harga
      const totalHarga = durasiSewa * order.harga;

      // Kirim data pembayaran
      await fetch("https://api-rentalmobil.csnightdev.com/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pemesanan_id: order.id,
          tanggal_pembayaran: new Intl.DateTimeFormat("en-CA").format(
            new Date()
          ),
          extend: isExtend,
          metode_bayar: "cash",
          total: totalHarga,
        }),
      });

      alert("Pembayaran berhasil dikirim!");

      await fetch("https://api-rentalmobil.csnightdev.com/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tanggal: new Intl.DateTimeFormat("en-CA").format(new Date()),
          merk_mobil: car.name,
          jumlah_sewa: 1,
          pendapatan: totalHarga,
        }),
      });
    } catch (error) {
      console.error("Error saat mengirim pembayaran:", error);
    }
  };

  const updateStatus = async () => {
    if (!order) return;

    try {
      const response = await fetch(
        `https://api-rentalmobil.csnightdev.com/api/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...order,
            status: "Diambil",
            _status: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setOrder((prev) => ({ ...prev, status: "Diambil" }));
      setIsTaken(true);
      alert("Status berhasil diperbarui menjadi 'Diambil'!");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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
            <span className="font-semibold">Mobil:</span> {car?.name}{" "}
            {car?.nopol}
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

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            onClick={() => navigate("/order")}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all shadow-md"
          >
            <FaArrowLeft />
            Back
          </button>

          <button
            onClick={async () => {
              try {
                const response = await fetch(
                  `https://api-rentalmobil.csnightdev.com/api/orders/${id}`,
                  {
                    method: "DELETE",
                  }
                );

                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }

                navigate("/order");
              } catch (error) {
                console.error("Error deleting order:", error);
              }
            }}
            disabled={enabled}
            className={`flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all shadow-md ${
              enabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            }`}
          >
            <FaTrash />
            Delete
          </button>

          <button
            onClick={updateStatus}
            disabled={isTaken}
            className={`flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all shadow-md ${
              isTaken
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            }`}
          >
            Diambil
          </button>

          <button
            onClick={sendToPay}
            disabled={enabled}
            className={`flex items-center justify-center gap-2 font-bold py-3 rounded-lg transition-all shadow-md ${
              enabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-700 text-white"
            }`}
          >
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
