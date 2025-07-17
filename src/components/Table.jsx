import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { LuArrowUpDown } from "react-icons/lu";
import { CgSortAz } from "react-icons/cg";
import ReactPaginate from "react-paginate";
import { useUIState } from "./Context";
import { motion } from "framer-motion";

/**
 * OrdersTablePage - Paginated table of orders with search and status
 */
const OrdersTablePage = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const { darkModeEnabled } = useUIState();

  // Table data
  const ordersData = [
    { orderId: "#CM9801", user: "Natali Craig", project: "Landing Page", address: "Meadow Lane Oakland", date: "Just now", status: "In Progress" },
    { orderId: "#CM9802", user: "Kate Morrison", project: "CRM Admin pages", address: "Larry San Francisco", date: "A minute ago", status: "Complete" },
    { orderId: "#CM9803", user: "Drew Cano", project: "Client Project", address: "Bagwell Avenue Ocala", date: "1 hour ago", status: "Pending" },
    { orderId: "#CM9804", user: "Orlando Diggs", project: "Admin Dashboard", address: "Washburn Baton Rouge", date: "Yesterday", status: "Rejected" },
    { orderId: "#CM9805", user: "Andi Lane", project: "App Landing Page", address: "Nest Lane Olivette", date: "Feb 2, 2023", status: "Rejected" },
    { orderId: "#CM9806", user: "Morgan Lane", project: "Web Application", address: "Washburn Baton Rouge", date: "Feb 1, 2023", status: "Approved" },
    { orderId: "#CM9807", user: "Parker Lane", project: "Web Application", address: "Washburn Baton Rouge", date: "Jan 31, 2023", status: "Approved" },
    { orderId: "#CM9808", user: "Parker Lane", project: "Web Application", address: "Washburn Baton Rouge", date: "Jan 31, 2023", status: "Approved" },
    { orderId: "#CM9809", user: "Parker Lane", project: "Web Application", address: "Washburn Baton Rouge", date: "Jan 31, 2023", status: "Approved" },
  ];
  const ORDERS_PER_PAGE = 5;
  const offset = currentPage * ORDERS_PER_PAGE;
  const paginatedOrders = ordersData.slice(offset, offset + ORDERS_PER_PAGE);
  const pageCount = Math.ceil(ordersData.length / ORDERS_PER_PAGE);

  // Status color utility
  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress":
        return "text-blue-500";
      case "Complete":
        return "text-green-500";
      case "Pending":
        return "text-[#b1e3fe]";
      case "Approved":
        return "text-[#ffe898]";
      case "Rejected":
        return "text-zinc-500";
      default:
        return "";
    }
  };
  const actionIcons = [
    { icon: <FaPlus />, key: "Plus" },
    { icon: <CgSortAz />, key: "SortAz" },
    { icon: <LuArrowUpDown />, key: "ArrowUpDown" },
  ];

  // Accessibility: ARIA roles for table and controls
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-4 font-inter sm:p-6 w-full min-h-screen ${darkModeEnabled ? "bg-zinc-900 text-white fade-in" : "bg-white text-zinc-900 fade-out"}`}
      aria-label="Order list section"
    >
      <h2 className="text-lg sm:text-xl font-bold mb-4">Order List</h2>
      <div className={`flex flex-wrap items-center justify-between mb-4 rounded-md p-2 ${darkModeEnabled ? "bg-zinc-900 text-white fade-in" : " bg-[#f8f9fb] text-zinc-900 fade-out"}`}>
        <div className="flex items-center gap-2">
          {actionIcons.map((item, index) => (
            <div
              key={item.key}
              className={`p-2 rounded-md cursor-pointer ${darkModeEnabled ? "hover:bg-zinc-800 hover:text-gray-400 duration-300" : "hover:bg-zinc-100 hover:text-gray-400 duration-300"}`}
              tabIndex={0}
              aria-label={item.key}
            >
              {item.icon}
            </div>
          ))}
        </div>
        <div className="relative mt-2 sm:mt-0">
          <FaSearch className={`absolute top-3 left-2 hover:text-gray-900 ${darkModeEnabled ? "text-zinc-300 fade-in" : "text-zinc-400 fade-out"}`} aria-label="Search icon" />
          <input
            type="text"
            placeholder="Search"
            className={`pl-8 py-2 border rounded-lg w-full sm:w-40 lg:w-52 ${darkModeEnabled ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-600 fade-in" : "bg-[#f8f9fb] hover:bg-zinc-200 text-black border-zinc-300 fade-out"}`}
            aria-label="Search orders"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left" aria-label="Orders table">
          <thead>
            <tr className={`border-b ${darkModeEnabled ? "text-white" : "text-black"}`}>
              <th className="p-2">Order ID</th>
              <th className="p-2">User</th>
              <th className="p-2">Project</th>
              <th className="p-2">Address</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr
                key={order.orderId}
                className={`border-b ${darkModeEnabled ? "hover:bg-zinc-800 text-white border-zinc-600" : "hover:bg-[#f8f9fb] text-black border-zinc-300"}`}
              >
                <td className="p-2 whitespace-nowrap">
                  <input type="checkbox" className="mx-2 text-lg" aria-label={`Select order ${order.orderId}`} />
                  {order.orderId}
                </td>
                <td className="p-2 flex items-center gap-2 whitespace-nowrap">
                  <img
                    src={`https://i.pravatar.cc/30?img=${index + 1}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  {order.user}
                </td>
                <td className="p-2 whitespace-nowrap">{order.project}</td>
                <td className="p-2 whitespace-normal break-words">{order.address}</td>
                <td className="p-2 flex items-center whitespace-nowrap">
                  <MdOutlineDateRange className="mr-2" />
                  {order.date}
                </td>
                <td className={`p-2 ${getStatusClass(order.status)} whitespace-nowrap`}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center sm:justify-end mt-4">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={"pagination flex items-center gap-2"}
          pageClassName={`p-2 font-bold mx-1 sm:mx-2 rounded cursor-pointer ${darkModeEnabled ? "hover:bg-zinc-800 text-zinc-100 duration-100" : "hover:bg-zinc-200 text-zinc-900 duration-100"}`}
          previousClassName={`p-2 font-bold rounded cursor-pointer ${darkModeEnabled ? "hover:text-yellow-600 text-zinc-100 duration-300" : "hover:text-gray-400 text-zinc-900 duration-300"}`}
          nextClassName={`p-2 font-bold rounded cursor-pointer ${darkModeEnabled ? "hover:text-yellow-600 text-zinc-100 duration-300" : "hover:text-gray-400 text-zinc-900 duration-300"}`}
          activeClassName={"bg-blue-500 text-white"}
          ariaLabelBuilder={page => `Go to page ${page}`}
        />
      </div>
    </motion.div>
  );
};

export default OrdersTablePage;
