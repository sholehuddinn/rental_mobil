import React, { useState } from "react";
import dayjs from "dayjs"; // Install dengan: npm install dayjs

const LaporanAdminPage = () => {
  const [filter, setFilter] = useState("all");
  const [customDate, setCustomDate] = useState("");
  const [selectedMerk, setSelectedMerk] = useState("all");

  // Data dari backend (format YYYY-MM-DD)
  const data = [
    { id: 1, tanggal: "2025-02-02", pendapatan: 1000000, merkMobil: "Toyota", jumlahSewa: 1 },
    { id: 2, tanggal: "2025-02-03", pendapatan: 1500000, merkMobil: "Honda", jumlahSewa: 2 },
    { id: 3, tanggal: "2025-02-03", pendapatan: 2000000, merkMobil: "Nissan", jumlahSewa: 3 },
    { id: 4, tanggal: "2025-02-04", pendapatan: 1800000, merkMobil: "Ford", jumlahSewa: 2 },
    { id: 5, tanggal: "2025-02-05", pendapatan: 2500000, merkMobil: "BMW", jumlahSewa: 4 },
    { id: 6, tanggal: "2025-02-06", pendapatan: 3000000, merkMobil: "Mercedes", jumlahSewa: 5 },
    { id: 7, tanggal: "2025-02-07", pendapatan: 2200000, merkMobil: "Suzuki", jumlahSewa: 3 },
    { id: 8, tanggal: "2025-02-08", pendapatan: 2750000, merkMobil: "Mazda", jumlahSewa: 4 },
    { id: 9, tanggal: "2025-02-09", pendapatan: 3200000, merkMobil: "Chevrolet", jumlahSewa: 5 },
  ];

  // Konversi tanggal saat ditampilkan
  const formatTanggal = (tanggal) => dayjs(tanggal, "YYYY-MM-DD").format("DD-MM-YYYY");

  // Tanggal referensi
  const today = dayjs();
  const yesterday = today.subtract(1, "day");
  const lastWeek = today.subtract(7, "day");
  const lastMonth = today.subtract(1, "month");

  // Ambil daftar merk mobil unik
  const merkMobilList = [...new Set(data.map((item) => item.merkMobil))];

  // Filtering data berdasarkan tanggal dan merk
  const filteredData = data.filter((item) => {
    const itemDate = dayjs(item.tanggal, "YYYY-MM-DD");
    const dateFilter =
      filter === "yesterday" ? itemDate.isSame(yesterday, "day") :
      filter === "lastWeek" ? itemDate.isAfter(lastWeek) :
      filter === "lastMonth" ? itemDate.isAfter(lastMonth) :
      filter === "custom" ? customDate && itemDate.isSame(dayjs(customDate), "day") :
      true;

    const merkFilter = selectedMerk === "all" || item.merkMobil === selectedMerk;
    return dateFilter && merkFilter;
  });

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-lg font-bold mb-4 text-center">Laporan</h1>

      {/* Dropdown Filter */}
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <select onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">Semua</option>
          <option value="yesterday">Kemarin</option>
          <option value="lastWeek">1 Minggu Terakhir</option>
          <option value="lastMonth">1 Bulan Terakhir</option>
          <option value="custom">Custom</option>
        </select>

        {filter === "custom" && (
          <input
            type="date"
            onChange={(e) => setCustomDate(e.target.value)}
            className="border p-2 rounded"
          />
        )}

        {/* Filter Merk Mobil */}
        <select onChange={(e) => setSelectedMerk(e.target.value)} className="border p-2 rounded">
          <option value="all">Semua Merk</option>
          {merkMobilList.map((merk) => (
            <option key={merk} value={merk}>{merk}</option>
          ))}
        </select>
      </div>

      {/* Tabel Laporan */}
      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-1">Tanggal</th>
              <th className="border border-gray-300 px-2 py-1">Pendapatan</th>
              <th className="border border-gray-300 px-2 py-1">Merk Mobil</th>
              <th className="border border-gray-300 px-2 py-1">Jumlah Sewa</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-2 py-1">{formatTanggal(item.tanggal)}</td>
                  <td className="border border-gray-300 px-2 py-1">Rp {item.pendapatan.toLocaleString()}</td>
                  <td className="border border-gray-300 px-2 py-1">{item.merkMobil}</td>
                  <td className="border border-gray-300 px-2 py-1">{item.jumlahSewa}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-2 border border-gray-300">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaporanAdminPage;
