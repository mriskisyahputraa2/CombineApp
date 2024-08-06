import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Toast from "../ToastMessage/Toast";
import axios from "axios";
import { toast } from "react-toastify";

const FromEditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPassword(response.password);
        setConfPassword(response.data.setConfPassword);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message); // Menyimpan pesan error di state msg
          toast.error(error.response.data.message); // Menampilkan pesan error menggunakan react-toastify
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUsers = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8080/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div className="p-6">
        <Toast />
        <h1 className="text-3xl font-bold mb-4 text-gray-800 ">Users</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Update User
        </h2>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <Link
                  to="/users"
                  className="inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
                >
                  Cancel
                </Link>
                <form onSubmit={updateUsers} className="space-y-6">
                  <p className="text-red-500 text-sm italic mt-4">{msg}</p>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-black"
                    >
                      Name
                    </label>
                    <input
                      placeholder="Name"
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-black"
                    >
                      Email
                    </label>
                    <input
                      placeholder="Email"
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-bold text-black"
                    >
                      Password
                    </label>
                    <input
                      placeholder="Password"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-bold text-black"
                    >
                      Confirm Password
                    </label>
                    <input
                      placeholder="Confirm Password"
                      id="confirm-password"
                      type="password"
                      value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium text-sm leading-5 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
                    >
                      Update Users
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FromEditUser;
