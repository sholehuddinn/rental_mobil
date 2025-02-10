import React, { useState, useEffect } from "react";
import axios from "axios";

const CarList = () => {
  const [cars, setCars] = useState([]); 
  const [newCar, setNewCar] = useState({ name: "", nopol: "" });
  const [editCarData, setEditCarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);

  const getCar = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api-rentalmobil.csnightdev.com/api/cars");
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

  const addCar = async () => {
    setLoadingAction(true);
    try {
      await axios.post("https://api-rentalmobil.csnightdev.com/api/cars", newCar);
      setNewCar({ name: "", nopol: "" });
      getCar();
    } catch (error) {
      console.error("Error adding car:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  const deleteCar = async (id) => {
    setLoadingAction(true);
    try {
      await axios.delete(`https://api-rentalmobil.csnightdev.com/api/cars/${id}`);
      getCar();
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  const saveEditCar = async () => {
    setLoadingAction(true);
    try {
      await axios.put(`https://api-rentalmobil.csnightdev.com/api/cars/${editCarData.id}`, {
        name: editCarData.name,
        nopol: editCarData.nopol,
      });
      setEditCarData(null);
      getCar();
    } catch (error) {
      console.error("Error updating car:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-5">Daftar Mobil</h1>

      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
          className="input input-bordered w-full md:w-1/3"
        />
        <input
          type="text"
          name="nopol"
          placeholder="No. Polisi"
          value={newCar.nopol}
          onChange={(e) => setNewCar({ ...newCar, nopol: e.target.value })}
          className="input input-bordered w-full md:w-1/3"
        />
        <button onClick={addCar} className="btn btn-primary w-full md:w-auto" disabled={loadingAction}>
          {loadingAction ? "Adding..." : "Add"}
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg items-center"></span>
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID mobil</th>
                <th>Merk</th>
                <th>Nopol</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr key={car.id}>
                  <td>{car.id}</td>
                  <td>{car.name}</td>
                  <td>{car.nopol}</td>
                  <td>{new Date(car.created_at).toLocaleString()}</td>
                  <td className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setEditCarData(car)}
                      className="btn btn-warning btn-sm"
                      disabled={loadingAction}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCar(car.id)}
                      className="btn btn-error btn-sm"
                      disabled={loadingAction}
                    >
                      {loadingAction ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editCarData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Car</h2>
            <input
              type="text"
              value={editCarData.name}
              placeholder="Nama Mobil"
              onChange={(e) => setEditCarData({ ...editCarData, name: e.target.value })}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              value={editCarData.nopol}
              placeholder="Nopol"
              onChange={(e) => setEditCarData({ ...editCarData, nopol: e.target.value })}
              className="input input-bordered w-full mb-2"
            />
            <div className="flex justify-end gap-2">
              <button onClick={saveEditCar} className="btn btn-success" disabled={loadingAction}>
                {loadingAction ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setEditCarData(null)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;
