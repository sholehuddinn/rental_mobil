import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

const LaporanAdminPage = () => {
  const [filter, setFilter] = useState("all");
  const [customDate, setCustomDate] = useState("");
  const [selectedMerk, setSelectedMerk] = useState("all");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api-rentalmobil.csnightdev.com/api/reports");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error("Gagal mengambil data laporan:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const formatTanggal = (tanggal) =>
    tanggal ? dayjs(tanggal, "YYYY-MM-DD").format("DD-MM-YYYY") : "-";

  const today = dayjs();
  const yesterday = today.subtract(1, "day");
  const lastWeek = today.subtract(7, "day");
  const lastMonth = today.subtract(1, "month");

  const merkMobilList = [
    ...new Set(data.map((item) => item.merk_mobil).filter(Boolean)),
  ];

  const filteredData = data.filter((item) => {
    const itemDate = dayjs(item.tanggal, "YYYY-MM-DD");

    const dateFilter =
      filter === "yesterday"
        ? itemDate.isSame(yesterday, "day")
        : filter === "lastWeek"
        ? itemDate.isAfter(lastWeek.subtract(1, "day")) &&
          itemDate.isBefore(today.add(1, "day"))
        : filter === "lastMonth"
        ? itemDate.isAfter(lastMonth.subtract(1, "day")) &&
          itemDate.isBefore(today.add(1, "day"))
        : filter === "custom"
        ? customDate && itemDate.isSame(dayjs(customDate), "day")
        : true;

    const merkFilter =
      selectedMerk === "all" || item.merk_mobil === selectedMerk;
    return dateFilter && merkFilter;
  });

  const totalPendapatan = filteredData.reduce(
    (sum, item) => sum + (item.pendapatan || 0),
    0
  );

  const merkMobilFrequency = filteredData.reduce((acc, item) => {
    if (!acc[item.merk_mobil]) {
      acc[item.merk_mobil] = 0;
    }
    acc[item.merk_mobil] += item.jumlah_sewa;
    return acc;
  }, {});

  const totalSewa = filteredData.reduce(
    (sum, item) => sum + (item.jumlah_sewa || 0),
    0
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Laporan Penyewaan</h1>

      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
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

        <select
          onChange={(e) => setSelectedMerk(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">Semua Merk</option>
          {merkMobilList.map((merk) => (
            <option key={merk} value={merk}>
              {merk}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-green-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Pendapatan</h2>
          <p className="text-2xl font-bold text-green-700">
            {" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(totalPendapatan)}
          </p>
        </div>

        <div className="bg-blue-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Penyewaan</h2>
          <p className="text-2xl font-bold text-blue-700">{totalSewa} kali</p>
        </div>

        <div className="bg-yellow-200 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Frekuensi Merk Mobil</h2>
          <ul className="text-yellow-700">
            {Object.entries(merkMobilFrequency).map(([merk, jumlah]) => (
              <li key={merk} className="font-semibold">
                {merk}: {jumlah} kali
              </li>
            ))}
          </ul>
        </div>
      </div>

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
                  <td className="border border-gray-300 px-2 py-1">
                    {formatTanggal(item.tanggal)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(item.pendapatan)}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.merk_mobil || "-"}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.jumlah_sewa || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-2 border border-gray-300"
                >
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
