import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoPencil, IoTrash } from "react-icons/io5";
import Swal from "sweetalert2";
import EmptyUser from "../EmptyUsers/EmptyUser";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8080/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/users/${userId}`);
          Swal.fire("Deleted!", "Your user has been deleted.", "success");
          getUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <>
      <div className="p-6">
        {/* <Toast /> */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Users</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          List of User
        </h2>
        <div className="flex justify-between items-center mb-6">
          <Link
            to={"/users/add"}
            className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
          >
            Add User
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm text-black font-bold uppercase"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm text-black font-bold uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm text-black font-bold uppercase"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-sm text-black font-bold uppercase"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-sm text-black font-bold uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.uuid}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-80">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-80">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-80">
                            {user.email}
                          </td>
                          <td
                            className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                              user.role === "admin"
                                ? "text-indigo-700"
                                : "text-black"
                            }`}
                          >
                            {user.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                            <Link
                              to={`/users/edit/${user.uuid}`}
                              className="inline-flex items-center mb-2 p-2 bg-transparent shadow-md text-blue-600 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 rounded-md"
                              aria-label="Edit"
                            >
                              <IoPencil className="w-[15px] h-[15px]" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => deleteUser(user.uuid)}
                              className="inline-flex items-center mb-2 p-2 bg-transparent shadow-md text-red-600 hover:text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 rounded-md"
                              aria-label="Delete"
                            >
                              <IoTrash className="w-[15px] h-[15px]" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-6">
                          <EmptyUser />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
