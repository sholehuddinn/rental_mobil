import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const Checkout = () => {
  const { id, userId } = useParams();
  const [car, setCar] = useState({});
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "1234",
    address: "",
    phone: "",
  });

  const [order, setOrder] = useState({
    mobil_id: id,
    user_id: userId,
    harga: 0,
    tanggal_pinjam: "",
    tanggal_kembali: "",
    status: "belum",
  });

  const [errors, setErrors] = useState({});

  // Fetch user data
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `https://api-rentalmobil.csnightdev.com/api/users/${userId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Fetch car data
  const fetchCar = async () => {
    try {
      const response = await fetch(
        `https://api-rentalmobil.csnightdev.com/api/cars/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCar(data.data);
      setOrder((prev) => ({ ...prev, harga: data.data.harga ?? 0 }));
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  };

  useEffect(() => {
    fetchCar();
    fetchUsers();
  }, [id]);

  // Hitung total harga
  const calculateTotal = () => {
    if (order.tanggal_pinjam && order.tanggal_kembali) {
      const start = dayjs(order.tanggal_pinjam);
      const end = dayjs(order.tanggal_kembali);
      const days = end.diff(start, "day");

      return days > 0 ? days * (car.harga ?? 0) : 0;
    }
    return 0;
  };

  // Validasi input
  const validate = () => {
    let newErrors = {};
    if (!user.address.trim()) newErrors.address = "Alamat harus diisi!";
    if (!user.phone.trim()) newErrors.phone = "Nomor telepon harus diisi!";
    if (!order.tanggal_pinjam)
      newErrors.tanggal_pinjam = "Tanggal pinjam harus diisi!";
    if (!order.tanggal_kembali)
      newErrors.tanggal_kembali = "Tanggal kembali harus diisi!";
    if (
      order.tanggal_pinjam &&
      order.tanggal_kembali &&
      order.tanggal_pinjam > order.tanggal_kembali
    ) {
      newErrors.tanggal_kembali =
        "Tanggal kembali tidak boleh sebelum tanggal pinjam!";
    }
    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Update user
      const updateUserResponse = await fetch(
        `https://api-rentalmobil.csnightdev.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!updateUserResponse.ok) {
        throw new Error(
          `Gagal update user! Status: ${updateUserResponse.status}`
        );
      }

      // Buat pesanan baru
      const createOrderResponse = await fetch(
        "https://api-rentalmobil.csnightdev.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...order, harga: calculateTotal() }),
        }
      );

      if (!createOrderResponse.ok) {
        throw new Error(
          `Gagal membuat pesanan! Status: ${createOrderResponse.status}`
        );
      }

      alert("Pesanan berhasil dibuat!");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Informasi Mobil */}
        <div>
          <label className="label">Mobil</label>
          <input
            type="text"
            value={`${car.name || ""} (${car.nopol || ""})`}
            className="input input-bordered w-full"
            readOnly
          />
        </div>
        <div>
          <label className="label">Nama</label>
          <input
            type="text"
            value={`${user.name || ""}`}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        <div>
          <label className="label">Harga per Hari</label>
          <input
            type="text"
            value={new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(car.harga ?? 0)}
            className="input input-bordered w-full"
            readOnly
          />
        </div>

        {/* Form Alamat */}
        <div>
          <label className="label">Alamat</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        {/* Form Nomor Telepon */}
        <div>
          <label className="label">Nomor Telepon</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Form Tanggal Pinjam */}
        <div>
          <label className="label">Tanggal Pinjam</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={order.tanggal_pinjam}
            onChange={(e) =>
              setOrder({ ...order, tanggal_pinjam: e.target.value })
            }
          />
          {errors.tanggal_pinjam && (
            <p className="text-red-500 text-sm">{errors.tanggal_pinjam}</p>
          )}
        </div>

        {/* Form Tanggal Kembali */}
        <div>
          <label className="label">Tanggal Kembali</label>
          <input
            type="date"
            className="input input-bordered w-full"
            value={order.tanggal_kembali}
            onChange={(e) =>
              setOrder({ ...order, tanggal_kembali: e.target.value })
            }
          />
          {errors.tanggal_kembali && (
            <p className="text-red-500 text-sm">{errors.tanggal_kembali}</p>
          )}
        </div>

        {/* Total Harga */}
        <div className="font-bold text-lg">
          Total Harga:{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(calculateTotal())}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Buat Pesanan
        </button>
      </form>
    </div>
  );
};

export default Checkout;
