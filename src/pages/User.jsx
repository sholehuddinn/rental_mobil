import React from 'react';

const User = () => {
  const data = [
    {
      id: 1,
      name: "John Doe",
      username: "john.doe@example.com",
      phone: "08123456789",
      address: "123 Main St, Anytown, USA",
    },
    {
      id: 2,
      name: "Jane Doe",
      username: "jane.doe@example.com",
      phone: "08987654321",
      address: "456 Elm St, Anytown, USA",
    },
    {
      id: 3,
      name: "Alice Smith",
      username: "alice.smith@example.com",
      phone: "09876543210",
      address: "789 Oak St, Anytown, USA",
    },
    {
      id: 4,
      name: "Bob Johnson",
      username: "bob.johnson@example.com",
      phone: "12345678901",
      address: "101 Maple St, Anytown, USA",
    },
    {
      id: 5,
      name: "Emily Davis",
      username: "emily.davis@example.com",
      phone: "07890123456",
      address: "234 Willow St, Anytown, USA",
    }
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((user, index) => (
          <div key={user.id} className="p-4 border rounded-lg shadow-md bg-white">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <h3 className='text-gray-500 text-sm'>{index + 1}</h3>
            </div>
            <p className="text-gray-600">{user.username}</p>
            <p className="text-gray-600">{user.phone}</p>
            <p className="text-gray-600">{user.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
