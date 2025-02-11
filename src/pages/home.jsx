import { Link } from "react-router-dom";
import { FaShoppingCart, FaTruck, FaUsers, FaBook } from "react-icons/fa";
import ThemeTogle from "../components/ThemeToggle";
import { FaMoneyBillTransfer, FaCarTunnel } from "react-icons/fa6";

const Dashboard = () => {
  const cards = [
    {
      title: "CREATE ORDER",
      icon: <FaCarTunnel />,
      link: "/order/create",
      color: "bg-fuchsia-500",
    },
    {
      title: "DATA ORDER",
      icon: <FaShoppingCart />,
      link: "/order",
      color: "bg-blue-500",
    },
    {
      title: "MOBIL",
      icon: <FaTruck />,
      link: "/cars",
      color: "bg-red-500",
    },
    {
      title: "PEMBAYARAN",
      icon: <FaMoneyBillTransfer />,
      link: "/pembayaran",
      color: "bg-yellow-500",
    },
    {
      title: "CUSTOMERS",
      icon: <FaUsers />,
      link: "/user",
      color: "bg-green-500",
    },
    {
      title: "LAPORAN",
      icon: <FaBook />,
      link: "/laporan",
      color: "bg-amber-950",
    },
  ];

  return (
    <>
      <div
      className="flex justify-between items-center py-4 px-10 border-b border-gray-200"
      >
        <ThemeTogle />
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">
        {cards.map((card, index) => (
          <Link
            to={card.link}
            key={index}
            className="shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-4 flex items-center bg-white border border-gray-300">
              <div
                className={`w-16 h-16 flex items-center justify-center ${card.color} text-white text-3xl rounded-md mr-4`}
              >
                {card.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
