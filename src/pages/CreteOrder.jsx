import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreteOrder = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCar = async () => {
    try {
      const res = await axios.get(
        "https://api-rentalmobil.csnightdev.com/api/cars"
      );
      setCars(res.data.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCar();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <span className="loading loading-spinner loading-lg items-center"></span>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-5">
      {cars.map((car) => {

        return (
          <div
            key={car.id}
            className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg"
          >
            <div>
              <h2 className="text-lg font-semibold">
                {car ? car.name : "Loading..."}
              </h2>
              <p className="text-gray-600">{car ? car.nopol : "Loading..."}</p>
            </div>
            <Link
            to={`/order/create/${car.id}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Lihat Detail
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default CreteOrder;
