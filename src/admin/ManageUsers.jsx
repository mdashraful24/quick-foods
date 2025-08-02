import { useQuery } from "@tanstack/react-query";
import { FaUserShield, FaUserEdit, FaUserTimes, FaTrash } from "react-icons/fa";
import { FiLoader, FiUsers } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "../hook/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch users data
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Change this user's role to ${newRole}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#E23744",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "Cancel",
        background: "#ffffff",
        backdrop: `
        rgba(29, 78, 216, 0.1)
        left top
        no-repeat
      `,
        customClass: {
          title: 'text-xl font-bold text-gray-800',
          confirmButton: 'px-4 py-2 rounded-lg',
          cancelButton: 'px-4 py-2 rounded-lg'
        }
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/users/${userId}`, { role: newRole });
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Role Updated!",
          text: `User role changed to ${newRole}`,
          showConfirmButton: false,
          timer: 1500,
          background: "#ffffff",
          customClass: {
            title: 'text-xl font-bold text-gray-800'
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Failed to update user role. Please try again.",
        background: "#ffffff",
        customClass: {
          title: 'text-xl font-bold text-gray-800'
        }
      });
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId) => {
    try {
      const result = await Swal.fire({
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
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/users/${userId}`);
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User deleted!",
          showConfirmButton: false,
          timer: 1500,
          background: "#ffffff",
          customClass: {
            title: 'text-xl font-bold text-gray-800'
          }
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error.message || "Failed to delete the user. Please try again.",
      });
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <FiLoader className="animate-spin text-4xl text-indigo-600" />
    </div>
  );

  return (
    <div className="px-4 py-8">
      <Helmet>
        <title>Manage Users | Quick Foods</title>
      </Helmet>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
          <FiUsers className="text-3xl" />
          Manage Users
        </h2>
        <p className="text-gray-600">
          Total Users: <span className="font-bold">{users.length}</span>
        </p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Update Role
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className=" text-center">
                  <td className="whitespace-nowrap">
                    <div className="flex justify-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                          alt="User avatar"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-medium">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.email}
                  </td>
                  <td>
                    <div className="text-sm">
                      {user.phone || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full ${user.role === "admin"
                        ? "bg-green-100 text-green-800"
                        : user.role === "manager"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleRoleChange(user._id, "admin")}
                        disabled={user.role === "admin"}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${user.role === "admin"
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        title="Make Admin"
                      >
                        <FaUserShield />
                        Admin
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, "manager")}
                        disabled={user.role === "manager"}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${user.role === "manager"
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          }`}
                        title="Make Manager"
                      >
                        <FaUserEdit />
                        Manager
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, "customer")}
                        disabled={user.role === "customer"}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${user.role === "customer"
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        title="Make Customer"
                      >
                        <FaUserTimes />
                        Customer
                      </button>
                    </div>
                  </td>
                  <td className="flex justify-center px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="flex items-center gap-1 px-3 py-1 rounded-md text-sm bg-red-100 text-red-700 hover:bg-red-200"
                      title="Delete User"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;