import { Helmet } from "react-helmet-async";
import { FiUser, FiTruck, FiDollarSign, FiPackage, FiBook } from "react-icons/fi";
import { TbCurrencyTaka } from "react-icons/tb";
import useCount from "../hook/useCount";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const DashboardOverview = () => {
    const { user } = useContext(AuthContext);
    const {
        isLoading,
        totalUsers,
        totalProviders,
        totalBlogs,
        revenue,
        pendingDelivery,
        monthlyUserSignups,
        currentMonthSignups,
        userGrowthPercentage,
        revenueGrowthPercentage
    } = useCount();

    // Format revenue for display
    // const formattedRevenue = revenue.toLocaleString('en-US', {
    //     style: 'currency',
    //     currency: 'BDT',
    //     maximumFractionDigits: 0
    // });
    const formattedRevenue = typeof revenue === 'number'
        ? revenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'BDT',
            maximumFractionDigits: 0
        })
        : '৳0';


    return (
        <div className="px-4 py-8">
            <Helmet>
                <title>Dashboard Overview | Quick Foods</title>
            </Helmet>

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
                </div>
                {isLoading ? (
                    <Skeleton circle width={48} height={48} />
                ) : (
                    <div>
                        <img
                            src={user?.photoURL || ""}
                            alt={user?.displayName}
                            className="w-12 h-12 rounded-full"
                        />
                    </div>
                )}
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {/* Total Users */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    {isLoading ? (
                        <>
                            <Skeleton width={100} height={20} />
                            <Skeleton width={80} height={32} className="mt-1" />
                            <div className="mt-4">
                                <Skeleton height={8} />
                                <Skeleton width={100} height={16} className="mt-1" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                                    <p className="text-3xl font-bold mt-1">{totalUsers}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                                    <FiUser className="text-2xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-blue-600 rounded-full"
                                        style={{ width: `${Math.min(100, (totalUsers / 500) * 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {Math.min(100, Math.round((totalUsers / 500) * 100))}% of target
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Total Providers */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    {isLoading ? (
                        <>
                            <Skeleton width={120} height={20} />
                            <Skeleton width={80} height={32} className="mt-1" />
                            <div className="mt-4">
                                <Skeleton height={8} />
                                <Skeleton width={100} height={16} className="mt-1" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Service Providers</p>
                                    <p className="text-3xl font-bold mt-1">{totalProviders}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                                    <FiTruck className="text-2xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-green-600 rounded-full"
                                        style={{ width: `${Math.min(100, (totalProviders / 100) * 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {Math.min(100, Math.round((totalProviders / 100) * 100))}% of target
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Total Blogs */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    {isLoading ? (
                        <>
                            <Skeleton width={100} height={20} />
                            <Skeleton width={80} height={32} className="mt-1" />
                            <div className="mt-4">
                                <Skeleton height={8} />
                                <Skeleton width={100} height={16} className="mt-1" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Blogs</p>
                                    <p className="text-3xl font-bold mt-1">{totalBlogs}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
                                    <FiBook className="text-2xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-indigo-600 rounded-full"
                                        style={{ width: `${Math.min(100, (totalBlogs / 50) * 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {Math.min(100, Math.round((totalBlogs / 50) * 100))}% of target
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Pending Delivery */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    {isLoading ? (
                        <>
                            <Skeleton width={120} height={20} />
                            <Skeleton width={80} height={32} className="mt-1" />
                            <div className="mt-4">
                                <Skeleton height={8} />
                                <Skeleton width={100} height={16} className="mt-1" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total Pending Delivery</p>
                                    <p className="text-3xl font-bold mt-1">{pendingDelivery}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
                                    <FiPackage className="text-2xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-yellow-600 rounded-full"
                                        style={{ width: `${Math.min(100, (pendingDelivery / 20) * 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {Math.min(100, Math.round((pendingDelivery / 20) * 100))}% of capacity
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Revenue */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                    {isLoading ? (
                        <>
                            <Skeleton width={100} height={20} />
                            <Skeleton width={120} height={32} className="mt-1" />
                            <div className="mt-4">
                                <Skeleton height={8} />
                                <Skeleton width={100} height={16} className="mt-1" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Revenue</p>
                                    <p className="text-3xl font-bold mt-1">{formattedRevenue}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                                    <TbCurrencyTaka className="text-2xl" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-purple-600 rounded-full"
                                        style={{ width: `${Math.min(100, (revenue / 50000) * 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {Math.min(100, Math.round((revenue / 50000) * 100))}% of target
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 mb-8">
                {/* Monthly User Signups Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Monthly User Signups</h2>
                    {isLoading ? (
                        <Skeleton height={300} />
                    ) : monthlyUserSignups.length > 0 ? (
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={monthlyUserSignups}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="count"
                                        name="User Signups"
                                        fill="#3B82F6"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-80 flex items-center justify-center text-gray-500">
                            No user signup data available
                        </div>
                    )}
                </div>
            </div>

            {/* Growth Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* User Growth */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    {isLoading ? (
                        <>
                            <Skeleton width={150} height={24} className="mb-4" />
                            <Skeleton height={100} />
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">User Growth</h3>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold">
                                    {userGrowthPercentage}%
                                </span>
                                <span className={`text-sm ${parseFloat(userGrowthPercentage) >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                    }`}>
                                    {parseFloat(userGrowthPercentage) >= 0 ? '↑ Increase' : '↓ Decrease'} from last month
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                {currentMonthSignups} new users this month
                            </p>
                        </>
                    )}
                </div>

                {/* Revenue Growth */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    {isLoading ? (
                        <>
                            <Skeleton width={150} height={24} className="mb-4" />
                            <Skeleton height={100} />
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Revenue Growth</h3>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold">
                                    {revenueGrowthPercentage}%
                                </span>
                                <span className={`text-sm ${parseFloat(revenueGrowthPercentage) >= 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                    }`}>
                                    {parseFloat(revenueGrowthPercentage) >= 0 ? '↑ Increase' : '↓ Decrease'} from last month
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                Total revenue: {formattedRevenue}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;