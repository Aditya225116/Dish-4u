
import React, { useEffect, useState } from "react";
import API from "../../api";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrder, setUpdatingOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setError(null);
      const response = await API.get("/orders");
      setOrders(Array.isArray(response.data.orders) ? response.data.orders : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setError(null);
      setUpdatingOrder(orderId);
      await API.patch(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
      setError("Failed to update order status");
    } finally {
      setUpdatingOrder(null);
    }
  };

  const totalOrders = orders.length;
  const totalItems = orders.reduce(
    (sum, order) =>
      sum +
      (order.items?.reduce((itemSum, item) => itemSum + (item.quantity || 0), 0) || 0),
    0
  );
  const totalAmount = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-800">Admin Dashboard</h1>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 text-red-600 text-center p-4 bg-red-100 rounded-lg border border-red-300">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-3xl font-semibold text-indigo-700">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
          <p className="text-3xl font-semibold text-indigo-700">{totalItems}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
          <p className="text-3xl font-semibold text-indigo-700">₹{totalAmount}</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No orders found</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-indigo-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-800">
                  Order ID
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-800">
                  First Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-800">
                  Items
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-800">
                  Total
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-800">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.orderId}
                  className={`transition duration-100 ease-in-out hover:bg-indigo-50 ${
                    index % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    #{order.orderId}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{order.firstName || "N/A"}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0}
                  </td>
                  <td className="py-3 px-4 text-gray-700">₹{order.total || 0}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`capitalize px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                        order.status === "preparing"
                          ? "bg-yellow-200 text-yellow-800"
                          : order.status === "on-the-way"
                          ? "bg-blue-200 text-blue-800"
                          : order.status === "delivered"
                          ? "bg-green-200 text-green-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {order.status?.replace("-", " ") || "pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
