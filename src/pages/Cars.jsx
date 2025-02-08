import React, { useState } from "react";

const CarList = () => {
  const [cars, setCars] = useState([
    { id: 1, name: "Toyota Avanza", nopol: "L 1234 AB", create_at: new Date(), update_at: new Date() },
    { id: 2, name: "Honda Jazz", nopol: "B 5678 CD", create_at: new Date(), update_at: new Date() },
  ]);

  const [newCar, setNewCar] = useState({ name: "", nopol: "" });
  const [editCar, setEditCar] = useState(null);

  const handleChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const addCar = () => {
    if (!newCar.name || !newCar.nopol) return;
    const newEntry = {
      id: cars.length + 1,
      name: newCar.name,
      nopol: newCar.nopol,
      create_at: new Date(),
      update_at: new Date(),
    };
    setCars([...cars, newEntry]);
    setNewCar({ name: "", nopol: "" });
  };

  const deleteCar = (id) => {
    setCars(cars.filter((car) => car.id !== id));
  };

  const startEditCar = (car) => {
    setEditCar(car);
  };

  const saveEditCar = () => {
    setCars(
      cars.map((car) =>
        car.id === editCar.id ? { ...editCar, update_at: new Date() } : car
      )
    );
    setEditCar(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-5">Car List</h1>

      <div className="bg-white shadow-lg rounded-lg p-4 mb-4 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={newCar.name}
          onChange={handleChange}
          className="input input-bordered w-full md:w-1/3"
        />
        <input
          type="text"
          name="nopol"
          placeholder="No. Polisi"
          value={newCar.nopol}
          onChange={handleChange}
          className="input input-bordered w-full md:w-1/3"
        />
        <button onClick={addCar} className="btn btn-primary w-full md:w-auto">
          Add
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Nopol</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.nopol}</td>
                <td>{car.create_at.toLocaleString()}</td>
                <td className="flex flex-wrap gap-2">
                  <button onClick={() => startEditCar(car)} className="btn btn-warning btn-sm">
                    Edit
                  </button>
                  <button onClick={() => deleteCar(car.id)} className="btn btn-error btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Car</h2>
            <input
              type="text"
              value={editCar.name}
              placeholder="nama mobil"
              onChange={(e) => setEditCar({ ...editCar, name: e.target.value })}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              value={editCar.nopol}
              placeholder="nopol"
              onChange={(e) => setEditCar({ ...editCar, nopol: e.target.value })}
              className="input input-bordered w-full mb-2"
            />
            <div className="flex justify-end gap-2">
              <button onClick={saveEditCar} className="btn btn-success">
                Save
              </button>
              <button onClick={() => setEditCar(null)} className="btn btn-secondary">
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
