import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { id, userId } = useParams();
  const [car, setCar] = useState({});
  const [user, setUser] = useState({
    name: "",
    username: "",
    password : "guest123",
    address: "", 
    phone: "" 
  });
  const [order, setOrder] = useState({
    mobil_id: parseInt(id),
    user_id: parseInt(userId),
    harga: 0,
    tanggal_pinjam: "",
    tanggal_kembali: "",
    status: "belum",
  });

  const [errors, setErrors] = useState({});

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `https://api-rentalmobil.csnightdev.com/api/users/${userId}`
      );
      setUser(res.data.data);
      
      
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(
          `https://api-rentalmobil.csnightdev.com/api/cars/${id}`
        );
        setCar(res.data.data);
        setOrder((prev) => ({ ...prev, harga: res.data.data.harga ?? 0 }));
      } catch (error) {
        console.error("Error fetching car:", error);
      }
    };

    fetchCar();
    fetchUsers();
  }, [id]);

  const validate = () => {
    let newErrors = {};
    if (!user.address.trim()) newErrors.address = "Alamat harus diisi!";
    if (!user.phone.trim()) newErrors.phone = "Nomor telepon harus diisi!";
    if (!order.tanggal_pinjam) newErrors.tanggal_pinjam = "Tanggal pinjam harus diisi!";
    if (!order.tanggal_kembali) newErrors.tanggal_kembali = "Tanggal kembali harus diisi!";
    if (order.tanggal_pinjam && order.tanggal_kembali && order.tanggal_pinjam > order.tanggal_kembali) {
      newErrors.tanggal_kembali = "Tanggal kembali tidak boleh sebelum tanggal pinjam!";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      // Pastikan gunakan PUT untuk update user, bukan POST
      await axios.put(`https://api-rentalmobil.csnightdev.com/api/users/${userId}`, user);
      
      // Buat pesanan baru
      await axios.post("https://api-rentalmobil.csnightdev.com/api/orders", order);
      
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
          <input type="text" value={`${car.name || ""} (${car.nopol || ""})`} className="input input-bordered w-full" readOnly />
        </div>

        <div>
          <label className="label">Harga</label>
          <input type="text" value={new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(car.harga ?? 0)} className="input input-bordered w-full" readOnly />
        </div>

        {/* Form Alamat */}
        <div>
          <label className="label">Alamat</label>
          <input type="text" className="input input-bordered w-full" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {/* Form Nomor Telepon */}
        <div>
          <label className="label">Nomor Telepon</label>
          <input type="text" className="input input-bordered w-full" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Form Tanggal Pinjam */}
        <div>
          <label className="label">Tanggal Pinjam</label>
          <input type="date" className="input input-bordered w-full" value={order.tanggal_pinjam} onChange={(e) => setOrder({ ...order, tanggal_pinjam: e.target.value })} />
          {errors.tanggal_pinjam && <p className="text-red-500 text-sm">{errors.tanggal_pinjam}</p>}
        </div>

        {/* Form Tanggal Kembali */}
        <div>
          <label className="label">Tanggal Kembali</label>
          <input type="date" className="input input-bordered w-full" value={order.tanggal_kembali} onChange={(e) => setOrder({ ...order, tanggal_kembali: e.target.value })} />
          {errors.tanggal_kembali && <p className="text-red-500 text-sm">{errors.tanggal_kembali}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">Buat Pesanan</button>
      </form>
    </div>
  );
};

export default Checkout;
