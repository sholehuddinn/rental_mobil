import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [cars, setCars] = useState({});
  const [loading, setLoading] = useState(true);

  // Ambil daftar order dulu
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://api-rentalmobil.csnightdev.com/api/orders"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const orderData = data.data;

      setOrders(orderData);
      fetchCars(orderData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const fetchCars = async (orderData) => {
    try {
      const carData = {};
      for (const order of orderData) {
        const response = await fetch(
          `https://api-rentalmobil.csnightdev.com/api/cars/${order.mobil_id}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        carData[order.mobil_id] = data.data;
      }

      setCars(carData);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDetails = (order) => {
    navigate(`/order/${order.id}`);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Daftar Order</h1>

      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg items-center"></span>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-500">
          Tidak ada order tersedia.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const car = cars[order.mobil_id];

            return (
              <div
                key={order.id}
                className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {car ? car.name : "Loading..."}{" "}
                    <span className="font-semibold">#{order.id}</span>
                  </h2>
                  <p className="text-gray-600">
                    {car ? car.nopol : "Loading..."}
                  </p>
                </div>
                <button
                  onClick={() => handleDetails(order)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Lihat Detail
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
