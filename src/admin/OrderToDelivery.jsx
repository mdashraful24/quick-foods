import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hook/useAxiosSecure";
import { FaBoxOpen, FaMoneyBillWave, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaTruck, FaChartLine, FaShoppingCart } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import { MdOutlineBorderColor } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const OrderToDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get("/catering/orders");
        const ordersWithStatus = response.data.map(order => ({
          ...order,
          status: order.status || 'pending',
          minimumPeople: order.minimumPeople || (order.package?.minimumPeople || 1)
        }));
        setOrders(ordersWithStatus);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [axiosSecure]);

  // Statistics
  const totalPaid = orders.filter(order => order.paidStatus).length;
  // const totalPending = orders.length - totalPaid;
  const totalAccepted = orders.filter(order => order.status === 'accepted').length;
  const totalCompleted = orders.filter(order => order.status === 'completed').length;
  const totalPendingStatus = orders.filter(order => order.status === 'pending').length;
  const totalUnpaid = orders.filter(order => !order.paidStatus).length;
  const totalCancelled = orders.filter(order => order.status === 'cancelled').length;

  // // Calculate total revenue from accepted OR completed paid orders
  // const totalRevenue = orders
  //   .filter(order =>
  //     (order.status === 'accepted' || order.status === 'completed') &&
  //     order.paidStatus &&
  //     order.package?.pricePerPerson
  //   )
  //   .reduce((sum, order) => {
  //     return sum + (order.package.pricePerPerson * order.minimumPeople);
  //   }, 0);

  // // More detailed revenue calculation
  // const totalRevenue = orders
  //   .filter(order =>
  //     (order.status === 'accepted' || order.status === 'completed') &&
  //     order.paidStatus &&
  //     order.package?.pricePerPerson
  //   )
  //   .reduce((sum, order) => {
  //     const orderTotal = order.package.pricePerPerson * order.minimumPeople;
  //     console.log(`Order ${order._id}: $${order.package.pricePerPerson} x ${order.minimumPeople} = $${orderTotal.toFixed(2)}`);
  //     return sum + orderTotal;
  //   }, 0);

  // Calculate total revenue from accepted OR completed paid orders, minus cancelled orders
  const totalRevenue = orders
    .filter(order =>
      (order.status === 'accepted' || order.status === 'completed') &&
      order.paidStatus &&
      order.package?.pricePerPerson &&
      order.status !== 'cancelled'
    )
    .reduce((sum, order) => {
      const orderTotal = order.package.pricePerPerson * order.minimumPeople;
      console.log(`Order ${order._id}: $${order.package.pricePerPerson} x ${order.minimumPeople} = $${orderTotal.toFixed(2)}`);
      return sum + orderTotal;
    }, 0);

  // // DEBUG: Add this right here to log revenue-generating orders
  // console.log("All revenue-generating orders:",
  //   orders.filter(order =>
  //     (order.status === 'accepted' || order.status === 'completed') &&
  //     order.paidStatus &&
  //     order.package?.pricePerPerson
  //   ).map(order => ({
  //     id: order._id,
  //     package: order.package?.name,
  //     pricePerPerson: order.package?.pricePerPerson,
  //     people: order.minimumPeople,
  //     total: (order.package.pricePerPerson * order.minimumPeople).toFixed(2)
  //   }))
  // );
  // console.log("Total Revenue Calculated:", totalRevenue.toFixed(2));

  // Filter orders based on selected status
  const filteredOrders = orders.filter(order => {
    if (filterStatus === "all") return true;
    if (filterStatus === "paid") return order.paidStatus;
    if (filterStatus === "pending") return !order.paidStatus;
    if (filterStatus === "accepted") return order.status === 'accepted';
    if (filterStatus === "cancelled") return order.status === 'cancelled';
    if (filterStatus === "completed") return order.status === 'completed';
    return true;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Handle order status update
  const updateOrderStatus = async (id, newStatus) => {
    try {
      const response = await axiosSecure.patch(`/catering/orders/${id}`, {
        status: newStatus
      });

      setOrders(orders.map(order =>
        order._id === id ? { ...order, status: newStatus } : order
      ));

      Swal.fire({
        title: "Success!",
        text: `Order status updated to ${newStatus}`,
        icon: "success"
      });
    } catch (err) {
      setError(err.message);
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error"
      });
    }
  };

  // Handle cancel order
  const handleCancelOrder = async (id) => {
    Swal.fire({
      title: "Cancel this order?",
      text: "The order will be marked as cancelled but kept in records",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E23744",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      background: "#ffffff",
      backdrop: `
                rgba(226, 55, 68, 0.1)
                left top
                no-repeat
            `,
      customClass: {
        title: 'text-xl font-bold text-gray-800',
        confirmButton: 'px-4 py-2 rounded-lg',
        cancelButton: 'px-4 py-2 rounded-lg'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(`/catering/orders/${id}`, {
            status: 'cancelled'
          });

          setOrders(orders.map(order =>
            order._id === id ? { ...order, status: 'cancelled' } : order
          ));

          Swal.fire(
            'Cancelled!',
            'The order has been marked as cancelled.',
            'success'
          );
          // Swal.fire({
          //   position: "center",
          //   icon: "success",
          //   title: "The order has been marked as cancelled.",
          //   showConfirmButton: false,
          //   timer: 1000
          // });
        } catch (err) {
          Swal.fire(
            'Error!',
            err.message,
            'error'
          );
        }
      }
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E23744",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      backdrop: `
                rgba(226, 55, 68, 0.1)
                left top
                no-repeat
            `,
      customClass: {
        title: 'text-xl font-bold text-gray-800',
        confirmButton: 'px-4 py-2 rounded-lg',
        cancelButton: 'px-4 py-2 rounded-lg'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/catering/orders/${id}`);
          setOrders(orders.filter(order => order._id !== id));
          // Swal.fire("Deleted!", "The order has been deleted.", "success");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "The order has been deleted.",
            showConfirmButton: false,
            timer: 1000
          });
        } catch (err) {
          Swal.fire("Error!", err.message, "error");
        }
      }
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <FiLoader className="animate-spin text-4xl text-indigo-600" />
    </div>
  );

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error loading orders: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <Helmet>
        <title>Order Delivery | Catering Service</title>
      </Helmet>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
          <MdOutlineBorderColor className="text-3xl" />
          Order Management
        </h2>
      </div>

      {/* Summary Cards */}
      {/* Premium Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Orders Card */}
        <div className="rounded-xl shadow-lg p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold">{orders.length}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              {/* bg-black/20 */}
              <FaShoppingCart className="text-2xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${Math.min(100, (orders.length / 100) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {Math.min(100, Math.round((orders.length / 100) * 100))}% of monthly target
            </p>
          </div>
        </div>

        {/* Paid Orders Card */}
        <div className="rounded-xl shadow-lg p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Paid Orders</p>
              <p className="text-3xl font-bold">{totalPaid}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <FaMoneyBillWave className="text-2xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${Math.min(100, (totalPaid / orders.length) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {orders.length > 0 ? Math.round((totalPaid / orders.length) * 100) : 0}% of total orders
            </p>
          </div>
        </div>

        {/* Accepted Orders Card */}
        <div className="rounded-xl shadow-lg p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Accepted Orders</p>
              <p className="text-3xl font-bold">{totalAccepted}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
              <FaCheckCircle className="text-2xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${Math.min(100, (totalAccepted / orders.length) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {orders.length > 0 ? Math.round((totalAccepted / orders.length) * 100) : 0}% acceptance rate
            </p>
          </div>
        </div>

        {/* Completed Orders Card */}
        <div className="rounded-xl shadow-lg p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Completed Orders</p>
              <p className="text-3xl font-bold">{totalCompleted}</p>
            </div>
            <div className="p-3 rounded-full bg-teal-50 text-teal-600">
              <FaTruck className="text-2xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${Math.min(100, (totalCompleted / orders.length) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {orders.length > 0 ? Math.round((totalCompleted / orders.length) * 100) : 0}% completion rate
            </p>
          </div>
        </div>

        {/* Pending Status Card */}
        <div className="rounded-xl shadow-lg p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Pending (Status)</p>
              <p className="text-3xl font-bold">{totalPendingStatus}</p>
            </div>
            <div className="p-3 rounded-full bg-amber-50 text-amber-600">
              <FaHourglassHalf className="text-2xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${Math.min(100, (totalPendingStatus / orders.length) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {orders.length > 0 ? Math.round((totalPendingStatus / orders.length) * 100) : 0}% pending
            </p>
          </div>
        </div>

        {/* Unpaid Card */}
        <div className="rounded-xl shadow-lg p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Pending (Payments)</p>
              <p className="text-3xl font-bold">{totalUnpaid}</p>
            </div>
            <div className="p-3 rounded-full bg-gray-50 text-gray-600">
              <FaBoxOpen className="text-2xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${Math.min(100, (totalUnpaid / orders.length) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {orders.length > 0 ? Math.round((totalUnpaid / orders.length) * 100) : 0}% unpaid
            </p>
          </div>
        </div>

        {/* Cancelled Orders Card */}
        <div className="rounded-xl shadow-lg p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Cancelled Orders</p>
              <p className="text-3xl font-bold">{totalCancelled}</p>
            </div>
            <div className="p-3 rounded-full bg-red-50 text-red-600">
              <FaTimesCircle className="text-2xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${Math.min(100, (totalCancelled / orders.length) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {orders.length > 0 ? Math.round((totalCancelled / orders.length) * 100) : 0}% cancellation rate
            </p>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="rounded-xl shadow-lg p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold flex items-center"><TbCurrencyTaka />{totalRevenue.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-full bg-indigo-50 text-indigo-600">
              <FaChartLine className="text-2xl" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-300 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{ width: `${Math.min(100, (totalRevenue / 50000) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs mt-1 opacity-80">
              {Math.min(100, Math.round((totalRevenue / 50000) * 100))}% of monthly target
            </p>
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-6 relative w-48">
        <select
          className="appearance-none w-full px-3 py-2.5 rounded-lg border-2 border-gray-500 bg-white focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer font-bold"
          value={filterStatus}
          onChange={(e) => {
            setCurrentPage(1);
            setFilterStatus(e.target.value);
          }}
        >
          <option value="all">All Orders</option>
          <option value="paid">Paid Orders</option>
          <option value="pending">Pending Payment</option>
          <option value="accepted">Accepted Orders</option>
          <option value="cancelled">Cancelled Orders</option>
          <option value="completed">Completed Orders</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">No.</th>
                <th className="py-3 px-4 text-left">Package</th>
                <th className="py-3 px-4 text-left">Price/Person</th>
                <th className="py-3 px-4 text-left">People</th>
                <th className="py-3 px-4 text-left">Payment</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((order, index) => {
                const orderTotal = order.package?.pricePerPerson
                  ? (order.package.pricePerPerson * order.minimumPeople).toFixed(2)
                  : 'N/A';

                return (
                  <tr key={order._id} className="hover:bg-gray-50 text-sm">
                    <td className="py-3 px-4">{indexOfFirstItem + index + 1}</td>
                    <td className="py-3 px-4">
                      {order.package?.name || 'Custom Order'}
                    </td>
                    <td className="py-3 px-4 flex items-center">
                      <TbCurrencyTaka />{order.package?.pricePerPerson?.toFixed(2) || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      {order.minimumPeople}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full font-medium ${order.paidStatus ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {order.paidStatus ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full font-medium ${order.status === 'accepted' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'completed' ? 'bg-teal-100 text-teal-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {order.status || 'pending'}
                      </span>
                    </td>


                    <td className="py-3 px-4 space-x-1">
                      {/* Accept button - shows for pending paid orders */}
                      {order.status === 'pending' && order.paidStatus && (
                        <button
                          onClick={() => updateOrderStatus(order._id, 'accepted')}
                          className="btn btn-xs btn-success text-white"
                        >
                          Accept
                        </button>
                      )}

                      {/* Complete button - shows for accepted orders */}
                      {order.status === 'accepted' && (
                        <button
                          onClick={() => updateOrderStatus(order._id, 'completed')}
                          className="btn btn-xs btn-info text-white"
                        >
                          Complete
                        </button>
                      )}

                      {/* Cancel button - shows for pending or accepted orders */}
                      {(order.status === 'pending' || order.status === 'accepted') && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="btn btn-xs btn-warning text-white"
                        >
                          Cancel
                        </button>
                      )}

                      {/* Delete button - only shows for payment pending or cancelled orders */}
                      {(!order.paidStatus || order.status === 'cancelled') && (
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="btn btn-xs btn-error text-white"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center p-4 border-t">
            <div className="join">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="join-item btn btn-sm"
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  if (page === 1 || page === totalPages) return true;
                  return Math.abs(page - currentPage) <= 1;
                })
                .map((page, i, array) => (
                  <React.Fragment key={page}>
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`join-item btn btn-sm ${currentPage === page ? 'bg-blue-700 text-white' : ''}`}
                    >
                      {page}
                    </button>
                    {i < array.length - 1 && array[i + 1] - page > 1 && (
                      <button className="join-item btn btn-sm btn-disabled" disabled>
                        ...
                      </button>
                    )}
                  </React.Fragment>
                ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="join-item btn btn-sm"
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>

      {/* No Orders Message */}
      {filteredOrders.length === 0 && !loading && (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-gray-500">There are currently no orders matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default OrderToDelivery;