import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCount = () => {
    const axiosPublic = useAxiosPublic();

    // Fetch users data with loading state
    const {
        data: users = [],
        isLoading: isUsersLoading
    } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    // Fetch providers data with loading state
    const {
        data: providers = [],
        isLoading: isProvidersLoading
    } = useQuery({
        queryKey: ['providers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/providers');
            return res.data;
        }
    });

    // Fetch orders data with loading state
    const {
        data: orders = [],
        isLoading: isOrdersLoading
    } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosPublic.get('/catering/orders');
            return res.data;
        }
    });

    // Fetch blogs data with loading state
    const {
        data: blogs = [],
        isLoading: isBlogsLoading
    } = useQuery({
        queryKey: ['blogs'],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs');
            return res.data;
        }
    });

    // Check if any data is still loading
    const isLoading = isUsersLoading || isProvidersLoading || isOrdersLoading || isBlogsLoading;

    // Calculate monthly user signups (returns empty array during loading)
    const monthlyUserSignups = isLoading ? [] : users.reduce((acc, user) => {
        if (user?.createdAt) {
            const date = new Date(user.createdAt);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            const monthYear = `${month} ${year}`;

            if (!acc[monthYear]) {
                acc[monthYear] = 0;
            }
            acc[monthYear]++;
        }
        return acc;
    }, {});

    // Convert to array sorted by date (returns empty array during loading)
    const monthlyUserSignupsArray = isLoading ? [] : Object.entries(monthlyUserSignups)
        .map(([monthYear, count]) => {
            const [month, year] = monthYear.split(' ');
            const date = new Date(`${month} 1, ${year}`);
            return {
                month: monthYear,
                count,
                sortDate: date
            };
        })
        .sort((a, b) => a.sortDate - b.sortDate)
        .map(({ month, count }) => ({ month, count }));

    // Get current month and year for comparison
    const currentMonthYear = new Date().toLocaleString('default', { month: 'short' }) + ' ' + new Date().getFullYear();

    // Calculate all statistics (return 0 or empty values during loading)
    const totalUsers = isLoading ? 0 : users.length;
    const totalProviders = isLoading ? 0 : providers.filter(
        provider => provider?.status === "approved"
    ).length;
    const totalBlogs = isLoading ? 0 : blogs.length;
    const revenue = isLoading ? 0 : orders.reduce((total, order) => {
        if (order?.paidStatus && order?.status === 'completed' && order?.package) {
            return total + (order.package.pricePerPerson * (order.package.minimumPeople || 1));
        }
        return total;
    }, 0);
    const pendingDelivery = isLoading ? 0 : orders.filter(order =>
        order?.paidStatus && order?.status === 'pending'
    ).length;
    const currentMonthSignups = isLoading ? 0 : monthlyUserSignupsArray.find(
        item => item.month === currentMonthYear
    )?.count || 0;
    const totalOrders = isLoading ? 0 : orders.length;
    const completedOrders = isLoading ? 0 : orders.filter(order =>
        order?.status === 'completed'
    ).length;

    // Calculate growth percentages (return 0 during loading)
    const userGrowthPercentage = isLoading ? '0.00' : calculateGrowthPercentage(monthlyUserSignupsArray);
    const revenueGrowthPercentage = isLoading ? '0.00' : calculateRevenueGrowth(orders);

    return {
        // Data states
        isLoading,
        isUsersLoading,
        isProvidersLoading,
        isOrdersLoading,
        isBlogsLoading,

        // Core metrics
        totalUsers,
        totalProviders,
        totalBlogs,
        revenue,
        pendingDelivery,

        // Monthly data
        monthlyUserSignups: monthlyUserSignupsArray,
        currentMonthSignups,

        // Additional metrics
        totalOrders,
        completedOrders,

        // Growth metrics
        userGrowthPercentage,
        revenueGrowthPercentage,

        // Raw data (useful for some components)
        usersData: users,
        providersData: providers,
        ordersData: orders,
        blogsData: blogs
    };
};

// Helper functions remain the same as previous example
const calculateGrowthPercentage = (monthlyData) => {
    if (monthlyData.length < 2) return '0.00';
    const current = monthlyData[monthlyData.length - 1].count;
    const previous = monthlyData[monthlyData.length - 2].count;
    return ((current - previous) / previous * 100).toFixed(2);
};

const calculateRevenueGrowth = (orders) => {
    const monthlyRevenue = orders.reduce((acc, order) => {
        if (order?.createdAt && order?.paidStatus && order?.package) {
            const date = new Date(order.createdAt);
            const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
            if (!acc[monthYear]) acc[monthYear] = 0;
            acc[monthYear] += order.package.pricePerPerson * (order.package.minimumPeople || 1);
        }
        return acc;
    }, {});

    const monthlyArray = Object.entries(monthlyRevenue)
        .map(([monthYear, revenue]) => ({ monthYear, revenue }))
        .sort((a, b) => new Date(a.monthYear) - new Date(b.monthYear));

    if (monthlyArray.length < 2) return '0.00';
    const current = monthlyArray[monthlyArray.length - 1].revenue;
    const previous = monthlyArray[monthlyArray.length - 2].revenue;
    return ((current - previous) / previous * 100).toFixed(2);
};

export default useCount;