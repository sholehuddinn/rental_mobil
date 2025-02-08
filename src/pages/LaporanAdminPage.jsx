import React, { useState } from 'react';

const LaporanAdminPage = () => {
  const initialData = [
    { id: 1, tanggal: '2022-01-01', pendapatan: 1000000, merkMobil: 'Toyota', jumlahSewa: 1 },
    { id: 2, tanggal: '2022-01-02', pendapatan: 1500000, merkMobil: 'Honda', jumlahSewa: 2 },
    { id: 3, tanggal: '2022-01-03', pendapatan: 2000000, merkMobil: 'Nissan', jumlahSewa: 3 },
    { id: 4, tanggal: '2022-01-04', pendapatan: 1800000, merkMobil: 'Ford', jumlahSewa: 2 },
    { id: 5, tanggal: '2022-01-05', pendapatan: 2500000, merkMobil: 'BMW', jumlahSewa: 4 },
    { id: 6, tanggal: '2022-01-06', pendapatan: 3000000, merkMobil: 'Mercedes', jumlahSewa: 5 },
    { id: 7, tanggal: '2022-01-07', pendapatan: 2200000, merkMobil: 'Suzuki', jumlahSewa: 3 },
    { id: 8, tanggal: '2022-01-08', pendapatan: 2750000, merkMobil: 'Mazda', jumlahSewa: 4 },
    { id: 9, tanggal: '2022-01-09', pendapatan: 3200000, merkMobil: 'Chevrolet', jumlahSewa: 5 },
    { id: 10, tanggal: '2022-01-10', pendapatan: 2800000, merkMobil: 'Hyundai', jumlahSewa: 4 },
  ];

  const [data, setData] = useState(initialData);
  const [isAscending, setIsAscending] = useState(true);

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      return isAscending
        ? new Date(a.tanggal) - new Date(b.tanggal)
        : new Date(b.tanggal) - new Date(a.tanggal);
    });
    setData(sortedData);
    setIsAscending(!isAscending);
  };

  return (
    <div className='overflow-x-auto p-4'>
      <h1 className='text-lg font-bold mb-4'>Laporan</h1>
      <button onClick={handleSort} className='btn btn-primary mb-2'>
        Urutkan Berdasarkan Tanggal ({isAscending ? 'Ascending' : 'Descending'})
      </button>
      <table className='table table-xs w-full border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border border-gray-300 px-2 py-1'>Tanggal</th>
            <th className='border border-gray-300 px-2 py-1'>Pendapatan</th>
            <th className='border border-gray-300 px-2 py-1'>Merk Mobil</th>
            <th className='border border-gray-300 px-2 py-1'>Jumlah Sewa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className='hover:bg-gray-100'>
              <td className='border border-gray-300 px-2 py-1'>{item.tanggal}</td>
              <td className='border border-gray-300 px-2 py-1'>Rp {item.pendapatan.toLocaleString()}</td>
              <td className='border border-gray-300 px-2 py-1'>{item.merkMobil}</td>
              <td className='border border-gray-300 px-2 py-1'>{item.jumlahSewa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanAdminPage;
